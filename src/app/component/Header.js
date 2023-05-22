"use client";
import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import people1 from "./../assets/img/people1.png";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import Image from "next/image";
import Link from "next/link";

import { get } from "../redux/userReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const userInfo = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const login = async () => {
    if (!userInfo) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      console.log(providerData);
      dispatch(get(providerData[0]));
      localStorage.setItem("userInfo", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  useEffect(() => {
    console.log("effect====>", userInfo);
  }, [userInfo]);

  return (
    <header className=" z-50 w-screen p-6 px-16">
      <div className="hidden md:flex w-full h-full justify-between">
        <Link href={"team"} className="flex items-center gap-2">
          <p className="text-stone-900 text-xl font-bold">BajuPedia</p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li className="text-base text-stone-600 hover:text-stone-900 duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-stone-600 hover:text-stone-900 duration-100 transition-all ease-in-out cursor-pointer">
              Tim
            </li>
          </ul>
          <div className="relative flex items-center justify-center">
            <FaShoppingBag className="text-stone-600 text-2xl ml-8 cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-700 flex items-center justify-center">
              <p className="text-xs text-white font-semibold">99</p>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <div className="relative">
              {userInfo ? (
                <>
                  <motion.img
                    whileTap={{ scale: 0.6 }}
                    src={userInfo.photoURL}
                    onClick={login}
                    className="w-10 min-w-[40px] h-210 min-h-[40px] drop-shadow-xl cursor-pointer"
                  />
                  {isMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                    >
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-stone-900 text-base">
                        Tambah Barang
                      </p>
                      <p
                        onClick={() => localStorage.clear()}
                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-stone-900 text-base"
                      >
                        Keluar
                      </p>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  whileTap={{ scale: 0.6 }}
                  className="w-10 min-w-[40px] h-210 min-h-[40px] drop-shadow-xl cursor-pointer"
                >
                  <Image
                    onClick={login}
                    src={people1}
                    alt="People 1"
                    width={40}
                    height={40}
                  />
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex md:hidden w-full h-full"></div>
    </header>
  );
};

export default Header;
