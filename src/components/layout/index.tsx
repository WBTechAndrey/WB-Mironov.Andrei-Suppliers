import { Nav } from "components/Nav";
import { Header } from "components/Header";
import { FC, ReactNode } from "react";
import style from "../Table/index.module.scss";
import { BASIC_WIDTH, MOBILE_WIDTH } from "../../constants";
import { useResponsiveViewport } from "hooks/useResponsiveViewport";

export const Layout: FC<{ children: ReactNode; title: string }> = ({
  children,
  title,
}) => {
  const { viewport } = useResponsiveViewport(BASIC_WIDTH);

  return (
    <>
      <Nav />
      <Header title={title} />
      <main
        className={`${viewport <= MOBILE_WIDTH ? style.mobileTable : style.table}`}
      >
        {children}
      </main>
    </>
  );
};
