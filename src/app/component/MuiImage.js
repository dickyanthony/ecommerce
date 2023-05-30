"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box } from "@mui/material";
import getRatio from "./getRatio";
import { transparent, placeholder } from "../assets/img";

// ----------------------------------------------------------------------

const MuiImage = ({
  ratio,
  disabledEffect = false,
  effect = "blur",
  sx,
  ...other
}) => {
  const content = (
    <Box
      component={LazyLoadImage}
      wrapperClassName="wrapper"
      effect={disabledEffect ? undefined : effect}
      placeholderSrc={disabledEffect ? transparent : placeholder}
      sx={{ width: 1, height: 1, objectFit: "cover" }}
      {...other}
    />
  );

  if (ratio) {
    return (
      <Box
        component="span"
        sx={{
          width: 1,
          lineHeight: 1,
          display: "block",
          overflow: "hidden",
          position: "relative",
          pt: getRatio(ratio),
          "& .wrapper": {
            top: 0,
            left: 0,
            width: 1,
            height: 1,
            position: "absolute",
            backgroundSize: "cover !important",
          },
          ...sx,
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      component="span"
      sx={{
        lineHeight: 1,
        display: "block",
        overflow: "hidden",
        position: "relative",
        "& .wrapper": {
          width: 1,
          height: 1,
          backgroundSize: "cover !important",
        },
        ...sx,
      }}
    >
      {content}
    </Box>
  );
};

export default MuiImage;
