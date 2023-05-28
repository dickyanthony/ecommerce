import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { Badge } from "@mui/material";

import Iconify from "../iconify";

const StyledRoot = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: "flex",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  top: 16,
  height: 5,
  paddingLeft: 2,
  paddingRight: 2,
  paddingTop: 2,
  boxShadow: `0 20px 40px -4px ${alpha("#fff", 0.16)}`,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create("opacity"),
  "&:hover": { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget({ totalItems }) {
  return (
    <StyledRoot>
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={24} />
      </Badge>
    </StyledRoot>
  );
}
