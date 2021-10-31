import React, { useEffect } from "react";
import { Character } from "../components/Character";
import { GetServerSideProps } from "next";
import api from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/data";
import { InferGetServerSidePropsType } from "next";
import { MarvelCharacter, MarvelCharacterResponse } from "../interfaces";

const Index = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { characters, handleCharactersData } = useContext(AuthContext);
  useEffect(() => {
    if (typeof data === "object") {
      handleCharactersData(data);
    }
  }, []);

  return (
    <>
      <Character />
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await api.get<MarvelCharacterResponse>(
    "/characters?ts=1&apikey=862acd0466e815a90d5cec24cb5fa4bf&hash=30dc7ee6f8fe336d503cee23dfe400a4&limit=100&offset=0&orderBy=-modified"
  );

  // console.log(response.data);
  const data = response.data.data.results;

  return {
    props: { data },
  };
};
