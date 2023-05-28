"use client";
import React from "react";
import Link from "next/link";
import { Alert, Stack, Typography } from "@mui/material";

import LoginLayout from "../../component/login";

import AuthLoginForm from "./AuthLoginForm";

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Sign in to Minimal</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link href={"screen/register"} variant="subtitle2">
            Create an account
          </Link>
        </Stack>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :
        <strong> demo1234</strong>
      </Alert>

      <AuthLoginForm />
    </LoginLayout>
  );
}
