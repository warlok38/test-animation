import styled from "styled-components";
import { Layout } from "antd";

const { Header: AntdHeader } = Layout;

export const Header = styled(AntdHeader)`
  &&& {
    background-color: rgb(48, 61, 87);
    color: #fff;

    .ant-menu-dark {
      background-color: rgb(48, 61, 87);
    }
  }
`;
