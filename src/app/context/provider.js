"use client";

import { StateProvider } from "./StateProvider";
import { initialState } from "./initialState";
import reducer from "./reducer";

export function Providers({ children }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {children}
    </StateProvider>
  );
}
