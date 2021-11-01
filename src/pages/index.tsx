import React, { useEffect } from "react";
import { Character } from "../components/Character";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import api from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/data";

import { MarvelCharacterResponse } from "../interfaces";

import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Typography } from "@mui/material";

const Index = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { characters, handleCharactersData } = useContext(AuthContext);
  const [offset, setOffset] = React.useState(200);

  useEffect(() => {
    if (typeof data === "object") {
      handleCharactersData(data);
    }
  }, []);

  const getMoreCharacters = async () => {
    console.log(offset);
    setOffset((prev) => prev + 100);
    const response = await api.get<MarvelCharacterResponse>(
      `/characters?ts=1&apikey=862acd0466e815a90d5cec24cb5fa4bf&hash=30dc7ee6f8fe336d503cee23dfe400a4&limit=100&offset=${offset}&orderBy=-modified`
    );
    console.log(response.data);
    handleCharactersData(response.data.data.results);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h1"
        sx={{ color: "white", textAlign: "center", fontSize: [48, 64] }}
      >
        Characters
      </Typography>
      <InfiniteScroll
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          placeItems: "center",
          paddingTop: 75,
        }}
        dataLength={characters.length}
        next={getMoreCharacters}
        hasMore={offset < 1700 ? true : false}
        loader={
          <Typography variant="h6" sx={{ color: "white" }}>
            Loading...
          </Typography>
        }
        endMessage={
          <Typography variant="h5" sx={{ color: "white" }}>
            Nothing more to show
          </Typography>
        }
      >
        <Character />
      </InfiniteScroll>
    </Container>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get<MarvelCharacterResponse>(
    "/characters?ts=1&apikey=862acd0466e815a90d5cec24cb5fa4bf&hash=30dc7ee6f8fe336d503cee23dfe400a4&limit=100&offset=0&orderBy=-modified"
  );

  const data = response.data.data.results.filter(
    ({ description, thumbnail }) => {
      if (description.trim()) {
        return !thumbnail.path.includes("image_not_available");
      }
    }
  );

  return {
    props: { data },
    revalidate: 60 * 60 * 24 * 1, // revalidate the data every day
  };
};
