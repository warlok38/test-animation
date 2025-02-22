import { PropsWithChildren } from "react";
import { Layout } from "antd";
import { AppHeader } from "../AppHeader";
import * as S from "./AppLayout.styled";

const { Content } = Layout;

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <S.Layout>
      <AppHeader />
      <Content>{children}</Content>
    </S.Layout>
  );
};
