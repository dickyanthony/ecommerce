export const fetchUser = () => {
  let userInfo = null;

  if (typeof window !== "undefined") {
    userInfo =
      localStorage.getItem("userInfo") !== null
        ? JSON.stringify(localStorage.getItem("userInfo"))
        : null;
  }

  return userInfo;
};
