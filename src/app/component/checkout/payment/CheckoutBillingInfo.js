import React from "react";
import {
  Card,
  Button,
  Typography,
  CardHeader,
  CardContent,
} from "@mui/material";

import Iconify from "../../iconify";

export default function CheckoutBillingInfo({ billing, onBackStep }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Billing Address"
        action={
          <Button
            size="small"
            startIcon={<Iconify icon="eva:edit-fill" />}
            onClick={onBackStep}
          >
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {billing?.receiver}&nbsp;
          <Typography
            component="span"
            variant="body2"
            sx={{ color: "text.secondary" }}
          >
            ({billing?.addressType})
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          {billing?.fullAddress}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {billing?.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
}
