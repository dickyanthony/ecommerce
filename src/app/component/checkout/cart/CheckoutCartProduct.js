import React from "react";
import {
  Box,
  Stack,
  Divider,
  TableRow,
  TableCell,
  Typography,
  IconButton,
} from "@mui/material";

import { fCurrency } from "../../../utils/formatNumber";

import MuiImage from "../../MuiImage";
import Label from "../../label";
import Iconify from "../../iconify";
import { ColorPreview } from "../../color-utils";
import { IncrementerButton } from "../../custom-input";

// ----------------------------------------------------------------------

export default function CheckoutCartProduct({
  row,
  onDelete,
  onDecrease,
  onIncrease,
}) {
  const { name, size, price, colors, cover, quantity, available } = row;

  return (
    <TableRow>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <MuiImage
          alt="product image"
          src={cover}
          sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
        />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: "body2", color: "text.secondary" }}
          >
            size: <Label sx={{ ml: 0.5 }}> {size} </Label>
            <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
            <ColorPreview colors={colors} />
          </Stack>
        </Stack>
      </TableCell>

      <TableCell>{fCurrency(price)}</TableCell>

      <TableCell>
        <Box sx={{ width: 96, textAlign: "right" }}>
          <IncrementerButton
            quantity={quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={quantity <= 1}
            disabledIncrease={quantity >= available}
          />

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            available: {available}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right">{fCurrency(price * quantity)}</TableCell>

      <TableCell align="right">
        <IconButton onClick={onDelete}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
