import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer, Separator } from "./styles";

export function DefaultLayout() {
  return (
    <>
      <Header />
      <Separator />

      <LayoutContainer>
        <Outlet />
      </LayoutContainer>
    </>
  );
}
