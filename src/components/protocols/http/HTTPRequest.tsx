// src/components/protocols/http/HTTPRequest.tsx
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
  width: 200px;
  height: 250px;
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
      case 'REQUEST': return theme.colors.primary;
      case 'RESPONSE': return theme.colors.success;
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

const CodeBlock = styled.pre`
  background-color: ${theme.colors.darkGray};
  color: ${theme.colors.white};
  padding: ${theme.space.md};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fonts.monospace};
  font-size: ${theme.fontSizes.sm};
  overflow-x: auto;
  margin-top: ${theme.space.md};
`;

interface Step {
  id: number;
  packet: 'REQUEST' | 'RESPONSE';
  description: string;
  direction: 'client-to-server' | 'server-to-client';
  code?: string;
}

const steps: Step[] = [
  {
    id: 1,
    packet: 'REQUEST',
    description: '客户端向服务器发送HTTP请求。',
    direction: 'client-to-server',
    code: `GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Connection: keep-alive`,
  },
  {
    id: 2,
    packet: 'RESPONSE',
    description: '服务器处理请求并发回HTTP响应。',
    direction: 'server-to-client',
    code: `HTTP/1.1 200 OK
Date: Mon, 23 May 2023 22:38:34 GMT
Content-Type: text/html; charset=UTF-8
Content-Length: 138
Connection: keep-alive

<!DOCTYPE html>
<html>
<head>
  <title>Example Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>`,
  },
];

const HTTPRequest = () => {
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

  return (
    <>
      <Container>
        <DeviceContainer>
          <Device>
            <DeviceIcon>🌐</DeviceIcon>
            <DeviceLabel>网页浏览器</DeviceLabel>
          </Device>

          <Device>
            <DeviceIcon>🖥️</DeviceIcon>
            <DeviceLabel>网页服务器</DeviceLabel>
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
              transition={{ duration: 2 }}
            >
              <Packet $type={steps[currentStep - 1].packet}>
                {steps[currentStep - 1].direction === 'client-to-server' ? (
                  <>
                    HTTP {steps[currentStep - 1].packet} <Arrow>→</Arrow>
                  </>
                ) : (
                  <>
                    <Arrow>←</Arrow> HTTP {steps[currentStep - 1].packet}
                  </>
                )}
              </Packet>
            </PacketContainer>
          )}
        </AnimatePresence>

        <StepDescription>
          {currentStep === 0 ? (
            '点击播放开始HTTP请求/响应动画。'
          ) : currentStep <= steps.length ? (
            <>
              {steps[currentStep - 1].description}
              {steps[currentStep - 1].code && (
                <CodeBlock>{steps[currentStep - 1].code}</CodeBlock>
              )}
            </>
          ) : (
            'HTTP请求/响应周期已完成！点击重置再次观看。'
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
        <InfoCard title="HTTP请求/响应已完成" type="success">
          <p>
            HTTP请求/响应周期现已完成。客户端从服务器请求了资源，
            服务器用请求的数据进行了响应。
          </p>
          <p>
            HTTP消息的关键组成部分：
          </p>
          <ul>
            <li><strong>请求行/状态行</strong>：包含方法（对于请求）或状态码（对于响应）</li>
            <li><strong>头部</strong>：关于请求或响应的元数据</li>
            <li><strong>主体</strong>：随请求或响应发送的可选数据</li>
          </ul>
          <p>
            常见的HTTP方法包括GET、POST、PUT、DELETE等。状态码分为几类：
            1xx（信息性）、2xx（成功）、3xx（重定向）、4xx（客户端错误）
            和5xx（服务器错误）。
          </p>
        </InfoCard>
      )}
    </>
  );
};

export default HTTPRequest;
