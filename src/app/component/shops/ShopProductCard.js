import React from "react";
import Link from "next/link";
import { Box, Card, Stack, Fab } from "@mui/material";

import { fCurrency } from "../../utils/formatNumber";
import Iconify from "../iconify";
import Label from "../label";
import { ColorPreview } from "../color-utils";
import Image from "../Image";

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const {
    id,
    name,
    cover,
    price,
    colors,
    status,
    available,
    sizes,
    priceSale,
  } = product;

  const handleAddCart = async () => {};

  return (
    <Card
      sx={{
        "&:hover .add-cart-btn": {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: "relative", p: 1 }}>
        {status && (
          <Label
            variant="filled"
            color={(status === "sale" && "error") || "info"}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )}

        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: "absolute",
            transition: (theme) =>
              theme.transitions.create("all", {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="ic:round-add-shopping-cart" />
        </Fab>

        <Image
          disabledEffect
          alt={name}
          src={cover}
          ratio="1/1"
          sx={{ borderRadius: 1.5 }}
        />
      </Box>
      <Stack spacing={2.5} sx={{ p: 3 }}>
        <Link
          href={`screen/detailproduct/${id}`}
          color="inherit"
          variant="subtitle2"
          noWrap
        >
          {name}
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ColorPreview colors={colors} />

          <Stack direction="row" spacing={0.5} sx={{ typography: "subtitle1" }}>
            {priceSale && (
              <Box
                component="span"
                sx={{ color: "text.disabled", textDecoration: "line-through" }}
              >
                {fCurrency(priceSale)}
              </Box>
            )}

            <Box component="span">{fCurrency(price)}</Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
