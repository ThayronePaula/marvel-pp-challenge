import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import api from "../../services/api";

import { MarvelComicsResponse, MarvelComics } from "../../interfaces";

import { Comics } from "../../components/Comics";
import { Typography } from "@mui/material";

const ComicsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          color: "white",
          padding: ["8px 0", "16px 0"],
          fontSize: [48, 64],
        }}
      >
        Comics
      </Typography>
      {data.map((comics: MarvelComics) => (
        <Comics key={comics.id} comics={comics} />
      ))}
    </>
  );
};
export default ComicsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get<MarvelComicsResponse>(
    "/characters?ts=1&apikey=862acd0466e815a90d5cec24cb5fa4bf&hash=30dc7ee6f8fe336d503cee23dfe400a4&limit=100&offset=0&orderBy=-modified"
  );

  const data = response.data.data.results.filter(
    ({ description, thumbnail }) => {
      if (description) {
        return !thumbnail.path.includes("image_not_available");
      }
    }
  );

  const paths = data.map((post) => ({
    params: { id: `${post.id}` },
  }));

  paths.splice(10);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const response = await api.get<MarvelComicsResponse>(
    `/characters/${id}/comics?ts=1&apikey=862acd0466e815a90d5cec24cb5fa4bf&hash=30dc7ee6f8fe336d503cee23dfe400a4&limit=100&offset=0&orderBy=-modified`
  );


  const data = response.data.data.results.filter(
    ({ description, thumbnail }) => {
      if (description) {
        return !thumbnail.path.includes("image_not_available");
      }
    }
  );

  if (!data.length) {
    return {
      notFound: true, // if don't have data return 404
    };
  }

  data.splice(10);

  return {
    props: { data },
    revalidate: 60 * 60 * 24 * 7, // revalidate the data every 7 days
  };
};
