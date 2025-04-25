// src/pages/HomePage.tsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaNetworkWired, FaGlobe, FaServer } from 'react-icons/fa';
import { motion } from 'framer-motion';
import theme from '../styles/theme';

const Hero = styled.div`
  text-align: center;
  padding: ${theme.space.xl} 0 ${theme.space.lg};
  position: relative;
  overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  margin-bottom: ${theme.space.md};
  color: ${theme.colors.primary};
  font-weight: 700;
  font-size: ${theme.fontSizes['3xl']};
`;

const Subtitle = styled(motion.p)`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.lightText};
  max-width: 800px;
  margin: 0 auto ${theme.space.lg};
  line-height: 1.6;
`;

const ProtocolGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${theme.space.xl};
  margin-top: ${theme.space.xl};
  width: 100%;

  @media (max-width: ${theme.breakpoints.lg}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProtocolCard = styled(motion(Link))`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.default};
  color: ${theme.colors.text};
  text-decoration: none;
  border: 1px solid ${theme.colors.lightGray};
  width: 320px;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.hover};
    color: ${theme.colors.text};
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    width: 100%;
    max-width: 500px;
  }
`;

const CardImage = styled.div<{ $bgColor: string }>`
  height: 160px;
  background-color: ${props => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes['4xl']};
  font-weight: 700;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  }
`;

const CardIcon = styled.div`
  font-size: ${theme.fontSizes['4xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  svg {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }
`;

const CardContent = styled.div`
  padding: ${theme.space.md} ${theme.space.lg};
  text-align: center;
`;

const CardTitle = styled.h3`
  margin-bottom: ${theme.space.sm};
  font-weight: 600;
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  text-align: center;
`;

const CardDescription = styled.p`
  color: ${theme.colors.lightText};
  margin-bottom: 0;
  line-height: 1.5;
  font-size: ${theme.fontSizes.md};
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.space.md};
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <Hero>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to NetLearn Interactive
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore and understand network protocols through interactive visualizations and simulations
        </Subtitle>
      </Hero>

      <ProtocolGrid>
        <ProtocolCard
          to="/tcp"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
        >
          <CardImage $bgColor={theme.colors.tcpColor}>
            <CardIcon>
              <FaNetworkWired />
            </CardIcon>
          </CardImage>
          <CardContent>
            <CardTitle>
              TCP Protocol
            </CardTitle>
            <CardDescription>
              Visualize TCP three-way handshake and four-way termination processes
            </CardDescription>
          </CardContent>
        </ProtocolCard>

        <ProtocolCard
          to="/http"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
        >
          <CardImage $bgColor={theme.colors.httpColor}>
            <CardIcon>
              <FaGlobe />
            </CardIcon>
          </CardImage>
          <CardContent>
            <CardTitle>
              HTTP Protocol
            </CardTitle>
            <CardDescription>
              Understand HTTP request and response flow with interactive examples
            </CardDescription>
          </CardContent>
        </ProtocolCard>

        <ProtocolCard
          to="/dns"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.03 }}
        >
          <CardImage $bgColor={theme.colors.dnsColor}>
            <CardIcon>
              <FaServer />
            </CardIcon>
          </CardImage>
          <CardContent>
            <CardTitle>
              DNS Protocol
            </CardTitle>
            <CardDescription>
              Learn how domain names are resolved through the DNS query process
            </CardDescription>
          </CardContent>
        </ProtocolCard>
      </ProtocolGrid>
    </HomeContainer>
  );
};

export default HomePage;
