"use client";
// import "https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css";

import { store } from "@/store/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function Rprovider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
      {/* <PersistGate persistor={persistor}>{children}</PersistGate> */}
    </Provider>
  );
}

export default Rprovider;
