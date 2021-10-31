import React from "react";
import Image from "next/image";
import Link from "next/link";

import { makeStyles } from "@mui/styles";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Link as MaterialLink,
} from "@mui/material";

import { AuthContext } from "../context/data";
import api from "../services/api";
import { MarvelCharacterResponse } from "../interfaces";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles({
  accordion: {
    width: 590,
    background: "#1A103D",
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  },
  accordionHeader: {
    display: "flex",
    height: 140,
    color: "#FFF",
    padding: 0,

    "& h5": {
      fontWeight: 600,
      fontSize: 22,
      margin: "23px 0 0 30px",
    },

    // "&:hover": {
    //   boxShadow: "0px 0px 50px rgba(245, 121, 166, 0.5)",
    // },
  },

  accordionBody: {
    "& p": {
      color: "#9B95B0",
    },
  },
});

export const Character = () => {
  const { accordion, accordionHeader, accordionBody } = useStyles();
  const { characters, handleCharactersData } = React.useContext(AuthContext);

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [offset, setOffset] = React.useState(100);

  const getMoreCharacters = React.useCallback(async () => {
    setOffset((prev) => prev + 100);
    // console.log(offset);
    const response = await api.get<MarvelCharacterResponse>(
      `/characters?ts=1&apikey=862acd0466e815a90d5cec24cb5fa4bf&hash=30dc7ee6f8fe336d503cee23dfe400a4&limit=100&offset=${offset}&orderBy=-modified`
    );
    // console.log(response.data);
    handleCharactersData(response.data.data.results);
  }, []);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const charactersWithoutDuplicateID = characters.filter((obj, index, self) => {
    return index === self.findIndex((el) => el.id === obj.id);
  });
  // console.log(charactersWithoutDuplicateID);

  return (
    <>
      <InfiniteScroll
        dataLength={characters.length}
        next={getMoreCharacters}
        hasMore={offset < 1700 ? true : false}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {charactersWithoutDuplicateID.map(({ id, name, description, thumbnail }, index) => {
            const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;
            return (
              <Accordion
                key={id}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                disableGutters={true}
                className={accordion}
                sx={{
                  boxShadow:
                    expanded === `panel${index}` ? "0px 0px 50px #F579A6" : "",
                  margin: "40px",
                }}
              >
                <AccordionSummary
                  className={accordionHeader}
                  aria-controls={`panel${index}a-content`}
                  id={`panel${index}a-header`}
                  sx={{
                    ":hover": {
                      boxShadow:
                        expanded !== `panel${index}`
                          ? "0px 0px 50px rgba(245, 121, 166, 0.5)"
                          : "",
                    },
                  }}
                >
                  <Image
                    width={140}
                    height={140}
                    alt={name + " image"}
                    src={imageUrl}
                  />
                  <Typography variant="h5">{name}</Typography>
                </AccordionSummary>
                <div>
                  <AccordionDetails className={accordionBody}>
                    <Typography typography="body">{description}</Typography>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link href={`/series/${id}`}>
                        <MaterialLink
                          underline="none"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: 500,
                            width: 179,
                            height: 44,
                            background: "#F579A6",
                            color: "#0E0333",
                            cursor: "pointer",
                          }}
                        >
                          Series
                        </MaterialLink>
                      </Link>

                      <Button variant="contained" size="large">
                        Comics
                      </Button>
                    </Box>
                  </AccordionDetails>
                </div>
              </Accordion>
            );
          })}
      </InfiniteScroll>
    </>
  );
};
