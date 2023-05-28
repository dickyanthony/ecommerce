"use client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import orderBy from "lodash/orderBy";

import { useForm } from "react-hook-form";

import { Typography, Stack } from "@mui/material";
import FormProvider from "./hook-form";

import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterDrawer,
  ShopProductSearch,
} from "./shops";
// ----------------------------------------------------------------------

export default function Shop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        data.forEach((product) => {
          product.colors = JSON.parse(product.colors); // Parse the colors property
        });
        setProducts(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, []);
  const defaultValues = {
    gender: [],
    category: "All",
    colors: [],
    priceRange: [0, 200],
    rating: "",
    sortBy: "featured",
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  const isDefault =
    (!dirtyFields.gender &&
      !dirtyFields.category &&
      !dirtyFields.colors &&
      !dirtyFields.priceRange &&
      !dirtyFields.rating) ||
    false;

  const values = watch();

  const dataFiltered = applyFilter(products, values);

  const handleResetFilter = () => {
    reset();
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Ecommerce: Shop | Minimal UI</title>
      </Helmet>

      <FormProvider methods={methods}>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ShopFilterDrawer
              isDefault={isDefault}
              open={openFilter}
              onOpen={handleOpenFilter}
              onClose={handleCloseFilter}
              onResetFilter={handleResetFilter}
            />

            <ShopProductSort />
          </Stack>
        </Stack>

        <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{dataFiltered.length}</strong>
                &nbsp;Products found
              </Typography>

              <ShopTagFiltered
                isFiltered={!isDefault}
                onResetFilter={handleResetFilter}
              />
            </>
          )}
        </Stack>
        <ShopProductList
          products={dataFiltered}
          loading={!products.length && isDefault}
        />
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(products, filters) {
  const { gender, category, colors, priceRange, rating, sortBy } = filters;

  const min = priceRange[0];

  const max = priceRange[1];

  // SORT BY
  if (sortBy === "featured") {
    products = orderBy(products, ["sold"], ["desc"]);
  }

  if (sortBy === "newest") {
    products = orderBy(products, ["createdAt"], ["desc"]);
  }

  if (sortBy === "priceDesc") {
    products = orderBy(products, ["price"], ["desc"]);
  }

  if (sortBy === "priceAsc") {
    products = orderBy(products, ["price"], ["asc"]);
  }

  // FILTER PRODUCTS
  if (gender.length) {
    products = products.filter((product) => gender.includes(product.gender));
  }

  if (category !== "All") {
    products = products.filter((product) => product.category === category);
  }

  if (colors.length) {
    products = products.filter((product) =>
      product.colors.some((color) => colors.includes(color))
    );
  }

  if (min !== 0 || max !== 200) {
    products = products.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  if (rating) {
    products = products.filter((product) => {
      const convertRating = (value) => {
        if (value === "up4Star") return 4;
        if (value === "up3Star") return 3;
        if (value === "up2Star") return 2;
        return 1;
      };
      return product.totalRating > convertRating(rating);
    });
  }

  return products;
}
