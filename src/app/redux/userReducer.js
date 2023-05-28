import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../utils/fetchLocalData";

const userInfo = fetchUser();
const initialState = {
  user: userInfo,
};

export const getUser = createSlice({
  name: "getUser",
  initialState,
  reducers: {
    reset: () => initialState,
    get: (state, action) => {
      console.log("action===>", action);
      state.user = action.payload;
    },
  },
});

export const { get, reset } = getUser.actions;
export default getUser.reducer;
