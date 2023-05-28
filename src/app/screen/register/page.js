"use client";
import React from "react";
import { Stack, Typography, Link } from "@mui/material";

import LoginLayout from "../../component/login";

import AuthRegisterForm from "./AuthRegisterForm";

export default function Register() {
  return (
    <LoginLayout title="Manage the job more effectively with Minimal">
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Get started absolutely free.</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Already have an account? </Typography>

          <Link href={"/screen/login"} variant="subtitle2">
            Sign in
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      <Typography
        component="div"
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"By signing up, I agree to "}
        <Link underline="always" color="text.primary">
          Terms of Service
        </Link>
        {" and "}
        <Link underline="always" color="text.primary">
          Privacy Policy
        </Link>
        .
      </Typography>
    </LoginLayout>
  );
}
