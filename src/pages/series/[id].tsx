import React, { useEffect, useContext } from "react";
// import { Character } from "../components/Character";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
// import api from "../services/api";
// import { AuthContext } from "../context/data";
// import { InferGetServerSidePropsType } from "next";
import api from "../../services/api";
import { MarvelSeriesResponse, MarvelSerie } from "../../interfaces";

import { useRouter } from "next/router";
import { TvShows } from "../../components/TvShows";

const Serie = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const { characters, handleCharactersData } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  console.log(data);
  return (
    <>
      {data.slice(0, 1).map((serie: MarvelSerie) => (
        <TvShows tvShow={serie} />
      ))}
    </>
  );
};
export default Serie;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get<MarvelSeriesResponse>(
    "/characters?ts=1&apikey=862acd0466e815a90d5cec24cb5fa4bf&hash=30dc7ee6f8fe336d503cee23dfe400a4&limit=100&offset=0&orderBy=-modified"
  );

  const paths = response.data.data.results.map((post) => ({
    params: { id: `${post.id}` },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const response = await api.get<MarvelSeriesResponse>(
    `/characters/${id}/series?ts=1&apikey=862acd0466e815a90d5cec24cb5fa4bf&hash=30dc7ee6f8fe336d503cee23dfe400a4&limit=100&offset=0&orderBy=-modified`
  );

  const data: MarvelSerie[] = response.data.data.results;

  return {
    props: { data },
    revalidate: 60 * 60 * 24,
  };
};
