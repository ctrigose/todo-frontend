import { ReactNode } from "react";
import styled from "styled-components";
import { style } from "../styles/constants";
import { Typography } from "antd";
const { Title } = Typography;

type Props = { children: ReactNode };

/** Renders children in a fixed component of 500px of width
 *  below app title
 */
export const MainLayout = ({ children }: Props) => (
  <FullViewport>
    <Title>Todo</Title>
    <MainContent>{children}</MainContent>
  </FullViewport>
);

const FullViewport = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: ${style.colors.light};
  background: ${style.colors.dark};
`;
const MainContent = styled.div`
  width: ${style.spacing.mainContent.width}px;
  color: ${style.colors.dark};
  background: rgb(20, 22, 24);
`;
