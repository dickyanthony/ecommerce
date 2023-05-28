import React from "react";
import { useState } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Link, Typography, Autocomplete, InputAdornment } from "@mui/material";
// utils
import Iconify from "../iconify";
import { CustomTextField } from "../custom-input";
import SearchNotFound from "../search-not-found";
import { MotionComponent } from "../MotionImg";

// ----------------------------------------------------------------------

export default function ShopProductSearch() {
  const [searchProducts, setSearchProducts] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = async (value) => {
    try {
      setSearchProducts(value);
      if (value) {
        const response = "a";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGotoProduct = (name) => {};

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleGotoProduct(searchProducts);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(product) => product.name}
      noOptionsText={<SearchNotFound query={searchProducts} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      componentsProps={{
        popper: {
          sx: {
            width: `280px !important`,
          },
        },
        paper: {
          sx: {
            "& .MuiAutocomplete-option": {
              px: `8px !important`,
            },
          },
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          width={220}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, color: "text.disabled" }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const { name, cover } = product;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        return (
          <li {...props}>
            <MotionComponent
              alt={cover}
              src={cover}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1,
                flexShrink: 0,
                mr: 1.5,
              }}
            />

            <Link underline="none" onClick={() => handleGotoProduct(name)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? "primary" : "textPrimary"}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
