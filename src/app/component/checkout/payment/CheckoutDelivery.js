import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Box,
  Card,
  Radio,
  Paper,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormControlLabel,
} from "@mui/material";

import Iconify from "../../iconify";

import customShadows from "../../../theme/customShadows";
export default function CheckoutDelivery({
  deliveryOptions,
  onApplyShipping,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Card {...other}>
      <CardHeader title="Delivery options" />

      <CardContent>
        <Controller
          name="delivery"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              onChange={(event) => {
                const { value } = event.target;
                field.onChange(Number(value));
                onApplyShipping(Number(value));
              }}
            >
              <Box
                gap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                {deliveryOptions.map((option) => (
                  <DeliveryOption
                    key={option.value}
                    option={option}
                    isSelected={field.value === option.value}
                  />
                ))}
              </Box>
            </RadioGroup>
          )}
        />
      </CardContent>
    </Card>
  );
}

function DeliveryOption({ option, isSelected }) {
  const { value, title, description } = option;

  return (
    <Paper
      variant="outlined"
      key={value}
      sx={{
        display: "flex",
        alignItems: "center",
        transition: (theme) => theme.transitions.create("all"),
        ...(isSelected && {
          boxShadow: customShadows.z20,
        }),
      }}
    >
      <FormControlLabel
        value={value}
        control={
          <Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />
        }
        label={
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle2">{title}</Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          </Box>
        }
        sx={{ py: 3, px: 2.5, flexGrow: 1, mr: 0 }}
      />
    </Paper>
  );
}
