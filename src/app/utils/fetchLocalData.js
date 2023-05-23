"use client";
export const fetchUser = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const userInfo =
      localStorage.getItem("userInfo") !== undefined
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;
    return userInfo;
  }
  return null;
};
