// src/components/protocols/tcp/TCPHandshake.tsx
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../../../styles/theme';
import AnimationControls from '../../AnimationControls';
import InfoCard from '../../InfoCard';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;
  margin-bottom: ${theme.space.xl};
`;

const DeviceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.space.xl};
  height: 100%;
`;

const Device = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 200px;
  background-color: ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
`;

const DeviceLabel = styled.div`
  font-weight: 600;
  margin-bottom: ${theme.space.md};
`;

const DeviceIcon = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.space.sm};
`;

const PacketContainer = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const Packet = styled(motion.div)<{ $type: string }>`
  padding: ${theme.space.sm} ${theme.space.md};
  background-color: ${props => {
    switch (props.$type) {
      case 'SYN': return theme.colors.primary;
      case 'SYN-ACK': return theme.colors.secondary;
      case 'ACK': return theme.colors.success;
      default: return theme.colors.info;
    }
  }};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  box-shadow: ${theme.shadows.sm};
  display: flex;
  align-items: center;
  gap: ${theme.space.sm};
`;

const Arrow = styled.span`
  font-size: ${theme.fontSizes.lg};
`;

const StepDescription = styled.div`
  padding: ${theme.space.md} ${theme.space.xl};
  background-color: rgba(0, 0, 0, 0.05);
  border-top: 1px solid ${theme.colors.lightGray};
`;

interface Step {
  id: number;
  packet: 'SYN' | 'SYN-ACK' | 'ACK';
  description: string;
  direction: 'client-to-server' | 'server-to-client';
}

const steps: Step[] = [
  {
    id: 1,
    packet: 'SYN',
    description: '客户端向服务器发送SYN数据包，请求连接并指示其初始序列号。',
    direction: 'client-to-server',
  },
  {
    id: 2,
    packet: 'SYN-ACK',
    description: '服务器用SYN-ACK数据包响应，确认客户端的请求并指示其自己的初始序列号。',
    direction: 'server-to-client',
  },
  {
    id: 3,
    packet: 'ACK',
    description: '客户端向服务器发送ACK数据包，确认服务器的响应。连接现已建立。',
    direction: 'client-to-server',
  },
];

const TCPHandshake = () => {
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
        }, 2000);
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

  return (
    <>
      <Container>
        <DeviceContainer>
          <Device>
            <DeviceIcon>💻</DeviceIcon>
            <DeviceLabel>客户端</DeviceLabel>
          </Device>

          <Device>
            <DeviceIcon>🖥️</DeviceIcon>
            <DeviceLabel>服务器</DeviceLabel>
          </Device>
        </DeviceContainer>

        <AnimatePresence>
          {currentStep >= 1 && currentStep <= steps.length && (
            <PacketContainer
              key={steps[currentStep - 1].id}
              initial={{
                x: steps[currentStep - 1].direction === 'client-to-server' ? '20%' : '80%',
                opacity: 0
              }}
              animate={{
                x: steps[currentStep - 1].direction === 'client-to-server' ? '80%' : '20%',
                opacity: 1
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Packet $type={steps[currentStep - 1].packet}>
                {steps[currentStep - 1].direction === 'client-to-server' ? (
                  <>
                    {steps[currentStep - 1].packet} <Arrow>→</Arrow>
                  </>
                ) : (
                  <>
                    <Arrow>←</Arrow> {steps[currentStep - 1].packet}
                  </>
                )}
              </Packet>
            </PacketContainer>
          )}
        </AnimatePresence>

        <StepDescription>
          {currentStep === 0 ? (
            '点击播放开始TCP三次握手动画。'
          ) : currentStep <= steps.length ? (
            steps[currentStep - 1].description
          ) : (
            'TCP连接已成功建立！点击重置再次观看。'
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
        <InfoCard title="连接已建立" type="success">
          <p>
            TCP三次握手现已完成，客户端和服务器之间已建立连接。
            它们现在可以开始交换应用数据。
          </p>
          <p>
            此连接提供：
          </p>
          <ul>
            <li><strong>可靠性</strong>：保证数据包的传递</li>
            <li><strong>有序传递</strong>：数据按发送顺序到达</li>
            <li><strong>错误检查</strong>：损坏的数据包会重新传输</li>
            <li><strong>流量控制</strong>：防止接收方过载</li>
          </ul>
        </InfoCard>
      )}
    </>
  );
};

export default TCPHandshake;
