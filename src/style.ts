import styled, { createGlobalStyle } from 'styled-components';
import { Layout } from 'antd';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const { Header, Sider, Content } = Layout;

// Add global styles
export const GlobalStyle = createGlobalStyle``;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.12);
  padding: 0px 25px;
  position: relative;
  z-index: 3;
`;

export const Logo = styled.a`
  display: block;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  color: #606060 !important;
`;

export const StyledLogo = styled.div`
  display: flex;
  height: 20px;
  width: 150px;
  justify-content: space-between;
  align-items: center;
`;

export const StyledSider = styled(Sider)`
  font-family: 'Roboto', sans-serif !important;
  background: #fff !important; // цвет нижней части сайдбара
  .ant-menu-item {
    color: #606060;
    font-family: 'Roboto', sans-serif !important;
  }
  .ant-menu-item.ant-menu-item-active {
    color: #606060;
    background-color: #f9f9f9;
  }
  .ant-menu-item-selected {
    color: #c00 !important;
    background: #f9f9f9 !important;
  }
  .ant-layout-sider-children {
    background: #fff !important; // цвет нижней части сайдбара
  }
  padding: 24px;
`;

export const StyledContent = styled(Content)`
  padding: 0 10px 0 10px;
  height: 100%;
  min-height: calc(100vh - 64px);
  background: WhiteSmoke;
  color: #606060;
`;

export const MainWrapper = styled.div`
  background: #fff;
  height: 100%;
  padding: 24px 24px 50px;
`;

export const Username = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 200px;
  height: 30px;
`;
