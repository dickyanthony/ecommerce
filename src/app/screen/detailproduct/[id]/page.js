"use client";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Tab,
  Tabs,
  Card,
  Grid,
  Divider,
  Container,
  Typography,
  Stack,
} from "@mui/material";

import Iconify from "../../../component/iconify";
import Markdown from "../../../component/markdown";
import CustomBreadcrumbs from "../../../component/custom-breadcrumbs";
import { SkeletonProductDetails } from "../../../component/skeleton";
// sections
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from "../../../component/details";
// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: "100% Original",
    description: "Chocolate bar candy canes ice cream toffee cookie halvah.",
    icon: "ic:round-verified",
  },
  {
    title: "10 Day Replacement",
    description: "Marshmallow biscuit donut dragée fruitcake wafer.",
    icon: "eva:clock-fill",
  },
  {
    title: "Year Warranty",
    description: "Cotton candy gingerbread cake I love sugar sweet.",
    icon: "ic:round-verified-user",
  },
];

// ----------------------------------------------------------------------

export default function detailproduct() {
  const currentRouter = usePathname();
  const routerId = currentRouter.split("/").pop();
  console.log(routerId);

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/product/productDetail?id=${routerId}`
        ); // Use the dynamic ID in the API endpoint URL
        const data = await response.json();

        console.log(data);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setIsLoading(false);
      }
    };

    if (routerId) {
      fetchProduct();
    }
  }, []);

  const [currentTab, setCurrentTab] = useState("description");

  const TABS = [
    {
      value: "description",
      label: "description",
      component: product ? <Markdown children={product?.description} /> : null,
    },
    {
      value: "reviews",
      label: `Reviews (${product ? product.reviews.length : ""})`,
      component: product ? <ProductDetailsReview product={product} /> : null,
    },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Ecommerce: ${product?.name || ""} | Minimal UI`}</title>
      </Helmet>

      <Container maxWidth={"lg"}>
        <CustomBreadcrumbs
          heading="Product Details"
          links={[
            { name: "Dashboard", href: "" },
            {
              name: "E-Commerce",
              href: "",
            },
            {
              name: "Shop",
              href: "",
            },
            { name: product?.name },
          ]}
        />

        {product && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={7}>
                <ProductDetailsCarousel product={product} />
              </Grid>

              <Grid item xs={12} md={6} lg={5}>
                <ProductDetailsSummary
                  product={product}
                  // cart={checkout.cart}
                  onAddCart={() => {
                    console.log("add");
                  }}
                  onGotoStep={() => {
                    console.log("goto");
                  }}
                />
              </Grid>
            </Grid>

            <Box
              gap={5}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              sx={{ my: 10 }}
            >
              {SUMMARY.map((item) => (
                <Box key={item.title} sx={{ textAlign: "center" }}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      width: 64,
                      height: 64,
                      mx: "auto",
                      borderRadius: "50%",
                      color: "primary.main",
                      bgcolor: (theme) =>
                        `${alpha(theme.palette.primary.main, 0.08)}`,
                    }}
                  >
                    <Iconify icon={item.icon} width={36} />
                  </Stack>

                  <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>
                    {item.title}
                  </Typography>

                  <Typography sx={{ color: "text.secondary" }}>
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Card>
              <Tabs
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
                sx={{ px: 3, bgcolor: "background.neutral" }}
              >
                {TABS.map((tab) => (
                  <Tab key={tab.value} value={tab.value} label={tab.label} />
                ))}
              </Tabs>

              <Divider />

              {TABS.map(
                (tab) =>
                  tab.value === currentTab && (
                    <Box
                      key={tab.value}
                      sx={{
                        ...(currentTab === "description" && {
                          p: 3,
                        }),
                      }}
                    >
                      {tab.component}
                    </Box>
                  )
              )}
            </Card>
          </>
        )}

        {isLoading && <SkeletonProductDetails />}
      </Container>
    </HelmetProvider>
  );
}
