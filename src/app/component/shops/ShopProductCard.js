import React from "react";
import Link from "next/link";
import { Box, Card, Stack, Fab } from "@mui/material";
import { fCurrency } from "../../utils/formatNumber";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../redux/hooks";
import { ColorPreview } from "../color-utils";
import Iconify from "../iconify";
import Label from "../label";
import MuiImage from "../MuiImage";

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
  const router = useRouter();
  const userInfo = useAppSelector((state) => state.userReducer.user);

  const handleAddCart = async () => {
    if (!userInfo) {
      router.push("/screen/login");
    } else {
      const parseSize = JSON.parse(sizes);
      const data = {
        account_id: userInfo.id,
        product_id: id,
        price: price,
        quantity: 1,
        size: parseSize[0],
      };
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          // Handle the successful response
          console.log(result.message);
        } else {
          // Handle the error response
          console.error("Error adding product to cart.");
        }
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    }
  };

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

        <MuiImage
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
