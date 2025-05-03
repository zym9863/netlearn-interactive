// src/pages/HomePage.tsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaNetworkWired, FaGlobe, FaServer, FaLayerGroup } from 'react-icons/fa';
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
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.space.xl};
  margin-top: ${theme.space.xl};
  width: 100%;
  max-width: 1000px;

  @media (max-width: ${theme.breakpoints.md}) {
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
  width: calc(50% - ${theme.space.lg});
  max-width: 450px;
  flex-shrink: 0;
  margin-bottom: ${theme.space.lg};

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.hover};
    color: ${theme.colors.text};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    max-width: 450px;
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
          欢迎使用网络学习互动平台
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          通过交互式可视化和模拟来探索和理解网络协议
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
              TCP 协议
            </CardTitle>
            <CardDescription>
              可视化TCP三次握手和四次挥手过程
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
              HTTP 协议
            </CardTitle>
            <CardDescription>
              通过交互式示例理解HTTP请求和响应流程
            </CardDescription>
          </CardContent>
        </ProtocolCard>

        <ProtocolCard
          to="/dns"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
        >
          <CardImage $bgColor={theme.colors.dnsColor}>
            <CardIcon>
              <FaServer />
            </CardIcon>
          </CardImage>
          <CardContent>
            <CardTitle>
              DNS 协议
            </CardTitle>
            <CardDescription>
              了解域名如何通过DNS查询过程解析
            </CardDescription>
          </CardContent>
        </ProtocolCard>

        <ProtocolCard
          to="/network-models"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
        >
          <CardImage $bgColor={theme.colors.networkModelsColor}>
            <CardIcon>
              <FaLayerGroup />
            </CardIcon>
          </CardImage>
          <CardContent>
            <CardTitle>
              网络分层模型
            </CardTitle>
            <CardDescription>
              交互式浏览OSI和TCP/IP模型的层级、功能和协议
            </CardDescription>
          </CardContent>
        </ProtocolCard>
      </ProtocolGrid>
    </HomeContainer>
  );
};

export default HomePage;
