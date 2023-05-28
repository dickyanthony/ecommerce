"use client";
import React, { useState } from "react";
import Image from "./Image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShoppingBag } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { reset } from "../redux/userReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import people1 from "./../assets/img/people1.png";
const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMenu, setIsMenu] = useState(false);
  const userInfo = useAppSelector((state) => state.userReducer.user);

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch(reset());
    router.push("/screen/auth");
  };

  return (
    <header className=" z-50 w-screen p-6 px-16 bg-primary">
      <AnimatePresence mode="wait">
        <div
          key="desktop"
          className="hidden md:flex w-full h-full justify-between"
        >
          <Link href={""} className="flex items-center gap-2">
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

            <div className="relative">
              {userInfo ? (
                <>
                  <motion.img
                    whileTap={{ scale: 0.6 }}
                    src={userInfo.photoURL}
                    onClick={() => setIsMenu(!isMenu)}
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
                        onClick={logout}
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
                    onClick={() => router.push("/screen/auth")}
                    src={people1}
                    alt="People 1"
                    width={40}
                    height={40}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <div
          key="mobile"
          className="flex items-center justify-between md:hidden w-full h-full "
        >
          <div
            className="relative flex items-center justify-center"
            onClick={() => {}}
          >
            <FaShoppingBag className="text-textColor text-2xl  cursor-pointer" />

            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-700 flex items-center justify-center">
              <p className="text-xs text-white font-semibold">99</p>
            </div>
          </div>

          <p className="text-headingColor text-xl font-bold"> City</p>

          <div className="relative">
            {userInfo ? (
              <>
                <motion.img
                  whileTap={{ scale: 0.6 }}
                  src={userInfo.photoURL}
                  onClick={() => setIsMenu(!isMenu)}
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
                      onClick={logout}
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
                  onClick={() => router.push("/screen/auth")}
                  src={people1}
                  alt="People 1"
                  width={40}
                  height={40}
                />
              </motion.div>
            )}
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {userInfo &&
                  userInfo.email === "dickyanthony0812@gmail.com" && (
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item
                    </p>
                  )}

                <ul className="flex flex-col ">
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setIsMenu(false)}
                  >
                    Home
                  </li>

                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setIsMenu(false)}
                  >
                    Tim
                  </li>
                </ul>

                <p
                  className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </AnimatePresence>
    </header>
  );
};

export default Header;
