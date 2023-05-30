"use client";
import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
// @mui
import { Grid, Container } from "@mui/material";

import CustomBreadcrumbs from "../../component/custom-breadcrumbs";

// sections
import {
  CheckoutCart,
  CheckoutSteps,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress,
} from "../../component/checkout";

// ----------------------------------------------------------------------

const STEPS = ["Cart", "Billing & address", "Payment"];

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPage() {
  const activeStep = 2;
  const completed = activeStep === STEPS.length;
  const billing = {
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    receiver: "Jayvion Simon",
    fullAddress: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
    phoneNumber: "365-374-4961",
    addressType: "Home",
    fullAddress: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    isDefault: true,
    phoneNumber: "365-374-4961",
    receiver: "Jayvion Simon",
  };

  const checkout = {
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    receiver: "Jayvion Simon",
    fullAddress: "19034 Verna Unions Apt. 164 - Honolulu, RI / 87535",
    phoneNumber: "365-374-4961",
    addressType: "Home",
    cart: [
      {
        available: 2,
        colors: ["#1890FF"],
        cover:
          "https://api-dev-minimal-v4.vercel.app/assets/images/products/product_6.jpg",
        id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
        name: "Zoom Freak 2",
        price: 89.09,
        quantity: 1,
        size: "6",
      },
    ],
    discount: 5,
    shipping: 0,
    subtotal: 270.47,
    total: 265.47,
    totalItems: 3,
  };
  useEffect(() => {
    if (activeStep === 1) {
    }
  }, [activeStep]);

  const handleNextStep = () => {};

  const handleBackStep = () => {};

  const handleGotoStep = (step) => {};

  const handleApplyDiscount = (value) => {};

  const handleDeleteCart = (productId) => {};

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {};

  const handleCreateBilling = (address) => {};

  const handleApplyShipping = (value) => {};

  const handleReset = () => {
    if (completed) {
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title> Ecommerce: Checkout | Minimal UI</title>
      </Helmet>

      <Container maxWidth={"lg"}>
        <CustomBreadcrumbs
          heading="Checkout"
          links={[
            { name: "Dashboard", href: "/screen/dashboard" },
            {
              name: "E-Commerce",
              href: "/screen/dashboard",
            },
            { name: "Checkout" },
          ]}
        />

        <Grid container justifyContent={completed ? "center" : "flex-start"}>
          <Grid item xs={12} md={8}>
            <CheckoutSteps activeStep={activeStep} steps={STEPS} />
          </Grid>
        </Grid>

        {completed ? (
          <CheckoutOrderComplete
            open={completed}
            onReset={handleReset}
            onDownloadPDF={() => {}}
          />
        ) : (
          <>
            {activeStep === 0 && (
              <CheckoutCart
                checkout={checkout}
                onNextStep={handleNextStep}
                onDeleteCart={handleDeleteCart}
                onApplyDiscount={handleApplyDiscount}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            )}
            {activeStep === 1 && (
              <CheckoutBillingAddress
                checkout={checkout}
                onBackStep={handleBackStep}
                onCreateBilling={handleCreateBilling}
              />
            )}
            {activeStep === 2 && billing && (
              <CheckoutPayment
                checkout={checkout}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
                onGotoStep={handleGotoStep}
                onApplyShipping={handleApplyShipping}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </Container>
    </HelmetProvider>
  );
}
