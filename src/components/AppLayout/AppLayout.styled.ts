import styled from "styled-components";
import { Layout as AntdLayout } from "antd";

export const Layout = styled(AntdLayout)`
  &&& {
    height: 100vh;

    .ant-layout-content {
      background-color: #121418;
      color: #fff;
      height: 100%;
    }
  }
`;
