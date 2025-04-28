// src/components/protocols/dns/DNSQuery.tsx
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../../../styles/theme';
import AnimationControls from '../../AnimationControls';
import InfoCard from '../../InfoCard';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  margin-bottom: ${theme.space.xl};
`;

const DeviceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: ${theme.space.lg};
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Device = styled.div<{ $highlighted?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$highlighted ? 'rgba(67, 97, 238, 0.1)' : theme.colors.lightGray};
  border: 2px solid ${props => props.$highlighted ? theme.colors.primary : 'transparent'};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  padding: ${theme.space.md};
  transition: all 0.3s ease;
`;

const DeviceLabel = styled.div`
  font-weight: 600;
  margin-bottom: ${theme.space.sm};
  text-align: center;
`;

const DeviceIcon = styled.div`
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.space.sm};
`;

const PacketContainer = styled(motion.div)`
  position: absolute;
  pointer-events: none;
`;

const Packet = styled(motion.div)<{ $type: string }>`
  padding: ${theme.space.xs} ${theme.space.sm};
  background-color: ${props => {
    switch (props.$type) {
      case 'QUERY': return theme.colors.primary;
      case 'RESPONSE': return theme.colors.success;
      default: return theme.colors.info;
    }
  }};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
  box-shadow: ${theme.shadows.sm};
  white-space: nowrap;
`;

const StepDescription = styled.div`
  padding: ${theme.space.md} ${theme.space.xl};
  background-color: rgba(0, 0, 0, 0.05);
  border-top: 1px solid ${theme.colors.lightGray};
`;

interface Step {
  id: number;
  packet: 'QUERY' | 'RESPONSE';
  description: string;
  from: 'client' | 'resolver' | 'root' | 'tld' | 'authoritative';
  to: 'client' | 'resolver' | 'root' | 'tld' | 'authoritative';
  label?: string;
}

const steps: Step[] = [
  {
    id: 1,
    packet: 'QUERY',
    description: '您的计算机向DNS解析器（通常由您的ISP提供）发送DNS查询，询问example.com的IP地址。',
    from: 'client',
    to: 'resolver',
    label: 'What is the IP for example.com?',
  },
  {
    id: 2,
    packet: 'QUERY',
    description: '如果解析器没有缓存答案，它会向根名称服务器询问有关.com顶级域的信息。',
    from: 'resolver',
    to: 'root',
    label: 'Who manages .com domains?',
  },
  {
    id: 3,
    packet: 'RESPONSE',
    description: '根名称服务器响应.com域的TLD名称服务器的地址。',
    from: 'root',
    to: 'resolver',
    label: 'Here are the .com nameservers',
  },
  {
    id: 4,
    packet: 'QUERY',
    description: '解析器然后向TLD名称服务器询问有关example.com的信息。',
    from: 'resolver',
    to: 'tld',
    label: 'Who manages example.com?',
  },
  {
    id: 5,
    packet: 'RESPONSE',
    description: 'TLD名称服务器响应example.com的权威名称服务器的地址。',
    from: 'tld',
    to: 'resolver',
    label: 'Here are example.com nameservers',
  },
  {
    id: 6,
    packet: 'QUERY',
    description: '解析器向权威名称服务器询问example.com的IP地址。',
    from: 'resolver',
    to: 'authoritative',
    label: 'What is the IP for example.com?',
  },
  {
    id: 7,
    packet: 'RESPONSE',
    description: '权威名称服务器响应example.com的IP地址。',
    from: 'authoritative',
    to: 'resolver',
    label: 'example.com is at 93.184.216.34',
  },
  {
    id: 8,
    packet: 'RESPONSE',
    description: '解析器将IP地址返回给您的计算机，现在可以连接到网站了。',
    from: 'resolver',
    to: 'client',
    label: 'example.com is at 93.184.216.34',
  },
];

// Helper function to get coordinates for animation
const getCoordinates = (device: string) => {
  switch (device) {
    case 'client':
      return { x: '20%', y: '25%' };
    case 'resolver':
      return { x: '80%', y: '25%' };
    case 'root':
      return { x: '20%', y: '75%' };
    case 'tld':
      return { x: '50%', y: '75%' };
    case 'authoritative':
      return { x: '80%', y: '75%' };
    default:
      return { x: '50%', y: '50%' };
  }
};

const DNSQuery = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      if (currentStep < steps.length) {
        timerRef.current = window.setTimeout(() => {
          setCurrentStep(currentStep + 1);
        }, 3000);
      } else {
        setIsPlaying(false);
      }
    }

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStep]);

  // Determine which devices are highlighted in the current step
  const getHighlightedDevices = () => {
    if (currentStep === 0) return {};

    const step = steps[currentStep - 1];
    return {
      [step.from]: true,
      [step.to]: true,
    };
  };

  const highlightedDevices = getHighlightedDevices();

  return (
    <>
      <Container>
        <DeviceGrid>
          <Device $highlighted={highlightedDevices.client}>
            <DeviceIcon>💻</DeviceIcon>
            <DeviceLabel>您的计算机</DeviceLabel>
          </Device>

          <Device $highlighted={highlightedDevices.resolver}>
            <DeviceIcon>🔍</DeviceIcon>
            <DeviceLabel>DNS解析器 (ISP)</DeviceLabel>
          </Device>

          <Device $highlighted={highlightedDevices.root}>
            <DeviceIcon>🌐</DeviceIcon>
            <DeviceLabel>根名称服务器</DeviceLabel>
          </Device>

          <Device $highlighted={highlightedDevices.tld}>
            <DeviceIcon>📁</DeviceIcon>
            <DeviceLabel>TLD名称服务器 (.com)</DeviceLabel>
          </Device>

          <Device $highlighted={highlightedDevices.authoritative} style={{ gridColumn: '1 / 3' }}>
            <DeviceIcon>🖥️</DeviceIcon>
            <DeviceLabel>权威名称服务器 (example.com)</DeviceLabel>
          </Device>
        </DeviceGrid>

        <AnimatePresence>
          {currentStep >= 1 && currentStep <= steps.length && (
            <PacketContainer
              key={steps[currentStep - 1].id}
              initial={{
                x: getCoordinates(steps[currentStep - 1].from).x,
                y: getCoordinates(steps[currentStep - 1].from).y,
                opacity: 0
              }}
              animate={{
                x: getCoordinates(steps[currentStep - 1].to).x,
                y: getCoordinates(steps[currentStep - 1].to).y,
                opacity: 1
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <Packet $type={steps[currentStep - 1].packet}>
                {steps[currentStep - 1].label || steps[currentStep - 1].packet}
              </Packet>
            </PacketContainer>
          )}
        </AnimatePresence>

        <StepDescription>
          {currentStep === 0 ? (
            '点击播放开始DNS查询过程动画。'
          ) : currentStep <= steps.length ? (
            steps[currentStep - 1].description
          ) : (
            'DNS查询过程已完成！浏览器现在可以连接到网站。点击重置再次观看。'
          )}
        </StepDescription>
      </Container>

      <AnimationControls
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onNext={handleNext}
        onPrev={handlePrev}
        currentStep={currentStep === 0 ? 1 : currentStep}
        totalSteps={steps.length}
      />

      {currentStep === steps.length && (
        <InfoCard title="DNS查询已完成" type="success">
          <p>
            DNS查询过程现已完成。您的计算机已收到example.com的IP地址，
            现在可以建立与网站的连接。
          </p>
          <p>
            关于DNS的要点：
          </p>
          <ul>
            <li><strong>分层系统</strong>：DNS使用树状结构的名称服务器</li>
            <li><strong>缓存</strong>：DNS解析器缓存结果以提高性能</li>
            <li><strong>分布式数据库</strong>：没有单一服务器包含所有DNS信息</li>
            <li><strong>关键基础设施</strong>：DNS对互联网的运行至关重要</li>
          </ul>
          <p>
            DNS记录有不同类型，包括A（IPv4地址）、AAAA（IPv6地址）、
            CNAME（规范名称/别名）、MX（邮件交换）等等。
          </p>
        </InfoCard>
      )}
    </>
  );
};

export default DNSQuery;
