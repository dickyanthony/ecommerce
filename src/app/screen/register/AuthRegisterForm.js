"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Stack, IconButton, InputAdornment, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { get } from "../../redux/userReducer";
import { useAppDispatch } from "../../redux/hooks";

import Iconify from "../../component/iconify";
import FormProvider, { RHFTextField } from "../../component/hook-form";

export default function AuthRegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    address: "",
  });

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().required("username required"),
    password: Yup.string().required("Password is required"),
    address: Yup.string().required("Address is required"),
  });

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    values: formValue,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });
      if (response.status === 409) {
        throw new Error("Username already exist");
      }
      if (!response.ok) {
        throw new Error("Failed to create new account");
      }
      const responseData = await response.json();
      if (response.status === 200) {
        dispatch(get(JSON.stringify(responseData)));
        localStorage.setItem("userInfo", JSON.stringify(responseData));
        router.push("/screen/dashboard");
      }
    } catch (error) {
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name="username"
          label="username"
          onChange={(event) => {
            const { value } = event.target;
            setFormValue({ ...formValue, username: value });
          }}
        />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={(event) => {
            const { value } = event.target;
            setFormValue({ ...formValue, password: value });
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="address"
          label="Address"
          onChange={(event) => {
            const { value } = event.target;
            setFormValue({ ...formValue, address: value });
          }}
        />
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitSuccessful || isSubmitting}
          sx={{
            bgcolor: "#212B36",
            color: () => "#FFFFFF",
            "&:hover": {
              bgcolor: "#212B36",
              color: () => "#FFFFFF",
            },
          }}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
