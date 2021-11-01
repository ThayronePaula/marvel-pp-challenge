import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link as MaterialLink,
} from "@mui/material";

import { AuthContext } from "../context/data";

export const Character = () => {
  const { characters } = React.useContext(AuthContext);

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const charactersWithoutDuplicateID = characters.filter((obj, index, self) => {
    return index === self.findIndex((el) => el.id === obj.id);
  });

  return (
    <>
      {charactersWithoutDuplicateID.map(
        ({ id, name, description, thumbnail }, index) => {
          const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;
          return (
            <Accordion
              key={id}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              disableGutters={true}
              sx={{
                width: ["100%", 590],
                background: "#1A103D",
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                boxShadow:
                  expanded === `panel${index}` ? "0px 0px 50px #F579A6" : "",
                margin: "20px 0px",
              }}
            >
              <AccordionSummary
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
                sx={{
                  display: "flex",

                  height: 140,
                  color: "#FFF",
                  padding: 0,
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
                  layout="intrinsic"
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    fontSize: [14, 22],
                    margin: [1, "23px 0 0 30px"],
                  }}
                >
                  {name}
                </Typography>
              </AccordionSummary>
              <div>
                <AccordionDetails>
                  <Typography
                    sx={{
                      color: "#9B95B0",
                      margin: "16px 0",
                    }}
                    typography="body"
                  >
                    {description}
                  </Typography>
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

                    <Link href={`/comics/${id}`}>
                      <MaterialLink
                        underline="none"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: 500,
                          width: 179,
                          height: 44,
                          background: "#5BF1CD",
                          color: "#0E0333",
                          cursor: "pointer",
                        }}
                      >
                        Comics
                      </MaterialLink>
                    </Link>
                  </Box>
                </AccordionDetails>
              </div>
            </Accordion>
          );
        }
      )}
    </>
  );
};
