"use client";

import { Provider } from "react-redux";
import { default as store } from "@home-service/lib";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
