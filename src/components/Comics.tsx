import React from "react";
import Image from "next/image";

import { MarvelComics } from "../interfaces";

import { Box, Typography, Chip, Tooltip, Button } from "@mui/material";

type ComicsProps = {
  comics?: MarvelComics;
};

const colors = ["#e63946", "#e9c46a", "#2a9d8f"];

for (let i = 0; i < 3; i++) {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  colors.push(`#${randomColor}`);
}

export const Comics = ({ comics }: ComicsProps) => {
  const imageUrl = `${comics.thumbnail.path}.${comics.thumbnail.extension}`;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: ["column", "column", "row"],
        padding: ["0 12px", 0],
        "&:nth-child(n+2)": {
          marginTop: 3,
        },
      }}
    >
      <div>
        <Image
          priority={true}
          width={360}
          height={360}
          quality={100}
          sizes="50vw"
          alt={comics.title + " image"}
          src={imageUrl}
          layout="intrinsic"
        />
      </div>

      <Box
        sx={{
          display: "flex",
          maxWidth: 456,
          flexDirection: "column",
          padding: [0, 1, "16px 18px"],
        }}
      >
        <Typography
          sx={{
            color: "#EC1D24",
            fontSize: 24,
            marginBottom: 2.5,
          }}
          variant="h3"
        >
          {comics.title}
        </Typography>
        <Typography
          sx={{
            color: "#9B95B0",
            fontSize: 16,
          }}
          variant="body1"
        >
          <Tooltip title={comics.description} sx={{ width: "100%" }}>
            <Box sx={{ m: 1, width: "100%", height: ["100%"] }}>
              {" "}
              {comics.description.substring(0, 200)}...
            </Box>
          </Tooltip>
        </Typography>

        <Typography
          sx={{
            color: "#EC1D24",
            fontSize: 16,
            margin: ["8px 0", "16px 0"],
            fontWeight: 500,
          }}
          variant="h4"
        >
          Some characters
        </Typography>

        <Box
          component="footer"
          sx={{ width: "100%", display: "flex", flexWrap: "wrap" }}
        >
          {comics.characters.items.slice(0, 6).map(({ name }, index) => (
            <Chip
              key={name}
              label={name}
              sx={{
                background: `${colors[index]}`,
                marginRight: 1,
                marginBottom: 0.5,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
