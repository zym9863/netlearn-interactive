// src/components/Layout.tsx
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaNetworkWired, FaGlobe, FaServer } from 'react-icons/fa';
import theme from '../styles/theme';

interface LayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: ${theme.colors.headerBg};
  color: ${theme.colors.white};
  padding: ${theme.space.md} ${theme.space.xl};
  box-shadow: ${theme.shadows.md};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Logo = styled(Link)`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.space.sm};

  &:hover {
    color: ${theme.colors.white};
    opacity: 0.9;
  }
`;

const LogoIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes['3xl']};
`;

const Nav = styled.nav`
  display: flex;
  gap: ${theme.space.md};
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${theme.colors.white};
  padding: ${theme.space.sm} ${theme.space.md};
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transitions.default};
  font-weight: ${props => props.$active ? '600' : '400'};
  background-color: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  display: flex;
  align-items: center;
  gap: ${theme.space.sm};

  &:hover {
    color: ${theme.colors.white};
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const Main = styled.main`
  flex: 1;
  padding: ${theme.space.xl};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: ${theme.colors.footerBg};
  color: ${theme.colors.white};
  padding: ${theme.space.lg} ${theme.space.xl};
  text-align: center;
`;

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Logo to="/">
            <LogoIcon><FaNetworkWired /></LogoIcon>
            NetLearn Interactive
          </Logo>
          <Nav>
            <NavLink to="/" $active={location.pathname === '/'}>
              <FaHome /> Home
            </NavLink>
            <NavLink to="/tcp" $active={location.pathname === '/tcp'}>
              <FaNetworkWired /> TCP
            </NavLink>
            <NavLink to="/http" $active={location.pathname === '/http'}>
              <FaGlobe /> HTTP
            </NavLink>
            <NavLink to="/dns" $active={location.pathname === '/dns'}>
              <FaServer /> DNS
            </NavLink>
          </Nav>
        </HeaderContent>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>© {new Date().getFullYear()} NetLearn Interactive. All rights reserved.</p>
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;
