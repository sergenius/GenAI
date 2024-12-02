import { Outlet } from "react-router-dom";
import { Flex } from "@aws-amplify/ui-react";
import { Header } from "../components/Header";

export default function Root() {
  return (
    <Flex
      direction="column"
      height="100vh"
      width="100vw"
      justifyContent="stretch"
      alignItems="stretch"
      gap="0"
    >
      <Header />
      <Outlet />
    </Flex>
  );
}
