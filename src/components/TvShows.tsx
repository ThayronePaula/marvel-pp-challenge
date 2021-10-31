import React from "react";
import Image from "next/image";

import { makeStyles } from "@mui/styles";
import { MarvelSerie } from "../interfaces";

import { Box,Typography } from "@mui/material";

const useStyles = makeStyles({});

type TvShowsProps = {
  tvShow: MarvelSerie;
};

export const TvShows = ({ tvShow }: TvShowsProps) => {
  const imageUrl = `${tvShow.thumbnail.path}.${tvShow.thumbnail.extension}`;
  return (
    <Box sx={{ display: "flex" }}>
      <Image
        width={360}
        height={360}
        alt={tvShow.title + " image"}
        src={imageUrl}
      />
      <Box>
      <Typography>{tvShow.title}</Typography>


      </Box>
    </Box>
  );
};
