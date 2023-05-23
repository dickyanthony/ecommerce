"use client";
import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionImg = forwardRef(function ExoticImageWrapper(props, ref) {
  return <Image {...props} ref={ref} />;
});

export const MotionComponent = motion(MotionImg);
