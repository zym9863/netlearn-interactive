// src/components/protocols/tcp/TCPTermination.tsx
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
      case 'FIN': return theme.colors.warning;
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
  packet: 'FIN' | 'ACK';
  description: string;
  direction: 'client-to-server' | 'server-to-client';
}

const steps: Step[] = [
  {
    id: 1,
    packet: 'FIN',
    description: '客户端向服务器发送FIN数据包，表示它没有更多数据要发送。',
    direction: 'client-to-server',
  },
  {
    id: 2,
    packet: 'ACK',
    description: '服务器用ACK确认客户端的FIN。客户端到服务器的连接现已关闭。',
    direction: 'server-to-client',
  },
  {
    id: 3,
    packet: 'FIN',
    description: '服务器向客户端发送自己的FIN数据包，表示它也没有更多数据要发送。',
    direction: 'server-to-client',
  },
  {
    id: 4,
    packet: 'ACK',
    description: '客户端用ACK确认服务器的FIN。连接现已完全关闭。',
    direction: 'client-to-server',
  },
];

const TCPTermination = () => {
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
            '点击播放开始TCP四次挥手动画。'
          ) : currentStep <= steps.length ? (
            steps[currentStep - 1].description
          ) : (
            'TCP连接已成功终止！点击重置再次观看。'
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
        <InfoCard title="连接已终止" type="warning">
          <p>
            TCP四次挥手现已完成，连接已完全关闭。
            此过程确保双方都已完成数据发送并确认了对方的终止请求。
          </p>
          <p>
            关于TCP连接终止的要点：
          </p>
          <ul>
            <li><strong>半关闭状态</strong>：在步骤1-2之后，连接处于半关闭状态（客户端到服务器）</li>
            <li><strong>TIME_WAIT状态</strong>：发送最后的ACK后，客户端进入TIME_WAIT状态</li>
            <li><strong>优雅关闭</strong>：此过程确保在关闭前传递所有数据</li>
            <li><strong>资源释放</strong>：连接使用的系统资源被释放</li>
          </ul>
        </InfoCard>
      )}
    </>
  );
};

export default TCPTermination;
