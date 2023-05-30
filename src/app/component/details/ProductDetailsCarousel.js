import React from "react";
import { useState, useRef, useEffect } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { Box, alpha } from "@mui/material";
import { bgGradient } from "../../utils/cssStyles";
import MuiImage from "../MuiImage";
import Carousel, { CarouselArrowIndex } from "../carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import palette from "../../theme/palette";

const THUMB_SIZE = 64;

const StyledThumbnailsContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "length",
})(({ length, theme }) => ({
  margin: "0 auto",
  position: "relative",

  "& .slick-slide": {
    opacity: 0.48,
    "&.slick-current": {
      opacity: 1,
    },
    "& > div": {
      padding: "0 4px",
    },
  },

  ...(length === 1 && {
    maxWidth: THUMB_SIZE * 1 + 16,
  }),
  ...(length === 2 && {
    maxWidth: THUMB_SIZE * 2 + 32,
  }),
  ...((length === 3 || length === 4) && {
    maxWidth: THUMB_SIZE * 3 + 48,
  }),
  ...(length >= 5 && {
    maxWidth: THUMB_SIZE * 6,
  }),
  ...(length > 2 && {
    "&:before, &:after": {
      ...bgGradient({
        direction: "to left",
        startColor: `${alpha(palette.background.default, 0)} 0%`,
        endColor: `${palette.background.default} 100%`,
      }),
      top: 0,
      zIndex: 9,
      content: "''",
      height: "100%",
      position: "absolute",
      width: (THUMB_SIZE * 2) / 3,
    },
    "&:after": {
      right: 0,
      transform: "scaleX(-1)",
    },
  }),
}));

// ----------------------------------------------------------------------

export default function ProductDetailsCarousel({ product }) {
  const theme = useTheme();

  const carousel1 = useRef(null);

  const carousel2 = useRef(null);

  const [nav1, setNav1] = useState();

  const [nav2, setNav2] = useState();

  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselSettings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const carouselSettings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: "0px",
    slidesToShow: product.images.length > 3 ? 3 : product.images.length,
  };

  useEffect(() => {
    if (carousel1.current) {
      setNav1(carousel1.current);
    }
    if (carousel2.current) {
      setNav2(carousel2.current);
    }
  }, []);

  useEffect(() => {
    carousel1.current?.slickGoTo(currentIndex);
  }, [currentIndex]);

  const handlePrev = () => {
    carousel2.current?.slickPrev();
  };

  const handleNext = () => {
    carousel2.current?.slickNext();
  };

  const renderLargeImg = (
    <Box
      sx={{ mb: 3, borderRadius: 2, overflow: "hidden", position: "relative" }}
    >
      <Carousel {...carouselSettings1} asNavFor={nav2} ref={carousel1}>
        {product.images.map((img) => (
          <MuiImage
            disabledEffect
            key={img}
            alt="product"
            src={img}
            ratio="1/1"
            sx={{ cursor: "zoom-in" }}
          />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={currentIndex}
        total={product.images.length}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    </Box>
  );

  const renderThumbnails = (
    <StyledThumbnailsContainer length={product.images.length}>
      <Carousel {...carouselSettings2} asNavFor={nav1} ref={carousel2}>
        {product.images.map((img, index) => (
          <MuiImage
            key={img}
            disabledEffect
            alt="thumbnail"
            src={img}
            sx={{
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: 1.5,
              cursor: "pointer",
              ...(currentIndex === index && {
                border: `solid 2px #fda92d`,
              }),
            }}
          />
        ))}
      </Carousel>
    </StyledThumbnailsContainer>
  );

  return (
    <>
      <Box
        sx={{
          "& .slick-slide": {
            float: theme.direction === "rtl" ? "right" : "left",
          },
        }}
      >
        {renderLargeImg}

        {renderThumbnails}
      </Box>
    </>
  );
}
