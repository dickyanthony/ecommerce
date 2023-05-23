"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { bajuBiru, bajuHitam, bajuMerah } from "../assets/img";
import { MotionComponent } from "./MotionImg";

const HomeContainer = () => {
  const arrayShirt = [
    {
      id: 1,
      img: bajuHitam,
      color: "#000000",
    },
    {
      id: 2,
      img: bajuMerah,
      color: "#EB455F",
    },
    {
      id: 3,
      img: bajuBiru,
      color: "#146C94",
    },
  ];
  const [whichShirt, setWhichShirt] = useState(arrayShirt[0]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Calculate rotation based on cursor position
  const maxRotation = 30;
  const calcRotation = (position) => {
    const { clientX, clientY } = position;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const percentX = deltaX / centerX;
    const percentY = deltaY / centerY;
    const rotationX = percentY * maxRotation;
    const rotationY = -percentX * maxRotation;
    return { rotationX, rotationY };
  };

  // Update rotation values based on cursor position
  const updateRotation = (e) => {
    const { rotationX, rotationY } = calcRotation({
      clientX: e.clientX,
      clientY: e.clientY,
    });
    rotateX.set(rotationX);
    rotateY.set(rotationY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateRotation);
    return () => {
      window.removeEventListener("mousemove", updateRotation);
    };
  }, []);
  const handleShirtClick = (shirt) => {
    setWhichShirt(shirt);
  };
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <AnimatePresence>
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
          <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
            <p className="text-base text-orange-500 font-semibold">
              Bike Delivery
            </p>
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl"></div>
          </div>

          <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
            The Fastest Delivery in
            <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
              Your City
            </span>
          </p>

          <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
            velit eaque fugit distinctio est nam voluptatum architecto, porro
            iusto deserunt recusandae ipsa minus eos sunt, dolores illo repellat
            facere suscipit!
          </p>

          <button
            type="button"
            className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          >
            Order Now
          </button>
        </div>

        <div className="py-2 flex-1 flex items-center relative">
          <div className="w-full h-full  top-0 left-0 flex items-center justify-center lg:px-28 py-4 gap-4 flex-wrap">
            <MotionComponent
              key={whichShirt.id}
              alt={whichShirt.img}
              src={whichShirt.img}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
              }}
            />
            {arrayShirt.map((shirt) => (
              <motion.div
                key={shirt.id}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleShirtClick(shirt)}
                style={{
                  border:
                    shirt.id === whichShirt.id
                      ? `1px solid ${whichShirt.color}`
                      : "none",
                  padding: shirt.id === whichShirt.id ? "3px" : "0",
                }}
                className="ml-1 rounded-lg"
              >
                <div
                  style={{
                    backgroundColor: shirt.color,
                  }}
                  className="w-6 h-6 rounded-lg"
                ></div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatePresence>
    </section>
  );
};

export default HomeContainer;
