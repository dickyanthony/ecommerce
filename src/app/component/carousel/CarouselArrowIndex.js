import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import { Typography, Box, IconButton } from "@mui/material";

import { bgBlur } from "../../utils/cssStyles";

import { LeftIcon, RightIcon } from "./Icon";
import palette from "../../theme/palette";

// ----------------------------------------------------------------------

const StyledRoot = styled(Box)(({ theme }) => ({
  ...bgBlur({
    opacity: 0.48,
    color: palette.grey[900],
  }),
  zIndex: 9,
  display: "inline-flex",
  alignItems: "center",
  position: "absolute",
  bottom: 2,
  right: 2,
  padding: 0.25,
  color: palette.common.white,
  borderRadius: "inherit",
}));

const StyledIconButton = styled(IconButton)({
  width: 28,
  height: 28,
  padding: 0,
  opacity: 0.48,
  "&:hover": { opacity: 1 },
});

// ----------------------------------------------------------------------

export default function CarouselArrowIndex({
  index,
  total,
  onNext,
  onPrevious,
  icon,
  sx,
  ...other
}) {
  return (
    <StyledRoot sx={sx} {...other}>
      <StyledIconButton color="inherit" onClick={onPrevious}>
        <LeftIcon icon={icon} />
      </StyledIconButton>

      <Typography variant="subtitle2" component="span" sx={{ mx: 0.25 }}>
        {index + 1}/{total}
      </Typography>

      <StyledIconButton color="inherit" onClick={onNext}>
        <RightIcon icon={icon} isRTL={false} />
      </StyledIconButton>
    </StyledRoot>
  );
}
