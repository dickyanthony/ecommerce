import React, { useEffect } from "react";
import { sentenceCase } from "change-case";

import { Controller, useForm } from "react-hook-form";

import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Divider,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";

import { fShortenNumber, fCurrency } from "../../utils/formatNumber";

import { SOCIAL } from "../../constant";

import Label from "../label";
import Iconify from "../iconify";
import { IncrementerButton } from "../custom-input";
import { ColorSinglePicker } from "../color-utils";
import FormProvider, { RHFSelect } from "../hook-form";
import palette from "../../theme/palette";

// ----------------------------------------------------------------------

export default function ProductDetailsSummary({
  cart,
  product,
  onAddCart,
  onGotoStep,
  ...other
}) {
  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    colors,
    available,
    priceSale,
    totalRating,
    totalReview,
    inventoryType,
  } = product;

  // const
  //  = cart.map((item) => item.id).includes(id);

  // const isMaxQuantity =
  //   cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >=
  //   available;

  const defaultValues = {
    id,
    name,
    cover,
    available,
    price,
    colors: colors[0],
    size: sizes[4],
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = async (data) => {
    // try {
    //   if (!
    // ) {
    //     onAddCart({
    //       ...data,
    //       colors: [values.colors],
    //       subtotal: data.price * data.quantity,
    //     });
    //   }
    //   onGotoStep(0);
    //   navigate("");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleAddCart = async () => {
    console.log("val");
    // try {
    //   onAddCart({
    //     ...values,
    //     colors: [values.colors],
    //     subtotal: values.price * values.quantity,
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          padding: "40px 40px 0 16px",
        }}
        {...other}
      >
        <Stack spacing={2}>
          <Label
            variant="soft"
            color={inventoryType === "in_stock" ? "success" : "error"}
            sx={{ textTransform: "uppercase", mr: "auto" }}
          >
            {sentenceCase(inventoryType || "")}
          </Label>

          <Typography
            variant="overline"
            component="div"
            sx={{
              color: status === "sale" ? "error.main" : "info.main",
            }}
          >
            {status}
          </Typography>

          <Typography variant="h5">{name}</Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={totalRating} precision={0.1} readOnly />

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ({fShortenNumber(totalReview)}
              reviews)
            </Typography>
          </Stack>

          <Typography variant="h4">
            {priceSale && (
              <Box
                component="span"
                sx={{
                  color: "text.disabled",
                  textDecoration: "line-through",
                  mr: 0.5,
                }}
              >
                {fCurrency(priceSale)}
              </Box>
            )}

            {fCurrency(price)}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2">Color</Typography>

          <Controller
            name="colors"
            control={control}
            render={({ field }) => (
              <ColorSinglePicker
                colors={colors}
                value={field.value}
                onChange={field.onChange}
                sx={{
                  ...(colors.length > 4 && {
                    maxWidth: 144,
                    justifyContent: "flex-end",
                  }),
                }}
              />
            )}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="subtitle2"
            sx={{ height: 40, lineHeight: "40px", flexGrow: 1 }}
          >
            Size
          </Typography>

          <RHFSelect
            name="size"
            size="small"
            helperText={
              <Link underline="always" color="inherit">
                Size Chart
              </Link>
            }
            sx={{
              maxWidth: 96,
              "& .MuiFormHelperText-root": {
                mx: 0,
                mt: 1,
                textAlign: "right",
              },
            }}
          >
            {sizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography
            variant="subtitle2"
            sx={{ height: 36, lineHeight: "36px" }}
          >
            Quantity
          </Typography>

          <Stack spacing={1}>
            <IncrementerButton
              name="quantity"
              quantity={values.quantity}
              disabledDecrease={values.quantity <= 1}
              disabledIncrease={values.quantity >= available}
              onIncrease={() => setValue("quantity", values.quantity + 1)}
              onDecrease={() => setValue("quantity", values.quantity - 1)}
            />

            <Typography
              variant="caption"
              component="div"
              sx={{ textAlign: "right", color: "text.secondary" }}
            >
              Available: {available}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack direction="row" spacing={2}>
          <Button
            className="bg-[#fda92d]"
            fullWidth
            disabled={false}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon="ic:round-add-shopping-cart" />}
            onClick={handleAddCart}
            sx={{ whiteSpace: "nowrap" }}
          >
            Add to Cart
          </Button>

          <Button
            style={{ backgroundColor: `${palette.primary.main}` }}
            fullWidth
            size="large"
            type="submit"
            color="warning"
            variant="contained"
          >
            Buy Now
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center">
          {SOCIAL.map((social) => (
            <IconButton key={social.name}>
              <Iconify icon={social.icon} />
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </FormProvider>
  );
}
