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
    description: 'Client sends a FIN packet to the server, indicating it has no more data to send.',
    direction: 'client-to-server',
  },
  {
    id: 2,
    packet: 'ACK',
    description: 'Server acknowledges the client\'s FIN with an ACK. The client-to-server connection is now closed.',
    direction: 'server-to-client',
  },
  {
    id: 3,
    packet: 'FIN',
    description: 'Server sends its own FIN packet to the client, indicating it also has no more data to send.',
    direction: 'server-to-client',
  },
  {
    id: 4,
    packet: 'ACK',
    description: 'Client acknowledges the server\'s FIN with an ACK. The connection is now fully closed.',
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
            <DeviceLabel>Client</DeviceLabel>
          </Device>
          
          <Device>
            <DeviceIcon>🖥️</DeviceIcon>
            <DeviceLabel>Server</DeviceLabel>
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
            'Click Play to start the TCP four-way termination animation.'
          ) : currentStep <= steps.length ? (
            steps[currentStep - 1].description
          ) : (
            'TCP connection terminated successfully! Click Reset to watch again.'
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
        <InfoCard title="Connection Terminated" type="warning">
          <p>
            The TCP four-way termination is now complete, and the connection has been fully closed.
            This process ensures that both sides have finished sending data and have acknowledged
            each other's termination requests.
          </p>
          <p>
            Key points about TCP connection termination:
          </p>
          <ul>
            <li><strong>Half-closed state</strong>: After steps 1-2, the connection is half-closed (client to server)</li>
            <li><strong>TIME_WAIT state</strong>: After sending the final ACK, the client enters a TIME_WAIT state</li>
            <li><strong>Graceful shutdown</strong>: This process ensures all data is delivered before closing</li>
            <li><strong>Resource release</strong>: System resources used by the connection are freed</li>
          </ul>
        </InfoCard>
      )}
    </>
  );
};

export default TCPTermination;
