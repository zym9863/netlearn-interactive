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
    description: 'Client sends an HTTP request to the server.',
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
    description: 'Server processes the request and sends back an HTTP response.',
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
            <DeviceLabel>Web Browser</DeviceLabel>
          </Device>
          
          <Device>
            <DeviceIcon>🖥️</DeviceIcon>
            <DeviceLabel>Web Server</DeviceLabel>
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
            'Click Play to start the HTTP request/response animation.'
          ) : currentStep <= steps.length ? (
            <>
              {steps[currentStep - 1].description}
              {steps[currentStep - 1].code && (
                <CodeBlock>{steps[currentStep - 1].code}</CodeBlock>
              )}
            </>
          ) : (
            'HTTP request/response cycle completed! Click Reset to watch again.'
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
        <InfoCard title="HTTP Request/Response Completed" type="success">
          <p>
            The HTTP request/response cycle is now complete. The client requested a resource from
            the server, and the server responded with the requested data.
          </p>
          <p>
            Key components of HTTP messages:
          </p>
          <ul>
            <li><strong>Request Line/Status Line</strong>: Contains the method (for requests) or status code (for responses)</li>
            <li><strong>Headers</strong>: Metadata about the request or response</li>
            <li><strong>Body</strong>: Optional data sent with the request or response</li>
          </ul>
          <p>
            Common HTTP methods include GET, POST, PUT, DELETE, and more. Status codes are grouped
            into categories: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error),
            and 5xx (Server Error).
          </p>
        </InfoCard>
      )}
    </>
  );
};

export default HTTPRequest;
