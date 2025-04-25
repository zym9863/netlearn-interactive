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

const DeviceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${theme.space.xl};
  height: 100%;
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
    description: 'Your computer sends a DNS query to the DNS resolver (usually provided by your ISP) asking for the IP address of example.com.',
    from: 'client',
    to: 'resolver',
    label: 'What is the IP for example.com?',
  },
  {
    id: 2,
    packet: 'QUERY',
    description: 'If the resolver doesn\'t have the answer cached, it asks a root nameserver for information about the .com TLD.',
    from: 'resolver',
    to: 'root',
    label: 'Who manages .com domains?',
  },
  {
    id: 3,
    packet: 'RESPONSE',
    description: 'The root nameserver responds with the addresses of the TLD nameservers for .com domains.',
    from: 'root',
    to: 'resolver',
    label: 'Here are the .com nameservers',
  },
  {
    id: 4,
    packet: 'QUERY',
    description: 'The resolver then asks the TLD nameserver for information about example.com.',
    from: 'resolver',
    to: 'tld',
    label: 'Who manages example.com?',
  },
  {
    id: 5,
    packet: 'RESPONSE',
    description: 'The TLD nameserver responds with the addresses of the authoritative nameservers for example.com.',
    from: 'tld',
    to: 'resolver',
    label: 'Here are example.com nameservers',
  },
  {
    id: 6,
    packet: 'QUERY',
    description: 'The resolver asks the authoritative nameserver for the IP address of example.com.',
    from: 'resolver',
    to: 'authoritative',
    label: 'What is the IP for example.com?',
  },
  {
    id: 7,
    packet: 'RESPONSE',
    description: 'The authoritative nameserver responds with the IP address for example.com.',
    from: 'authoritative',
    to: 'resolver',
    label: 'example.com is at 93.184.216.34',
  },
  {
    id: 8,
    packet: 'RESPONSE',
    description: 'The resolver returns the IP address to your computer, which can now connect to the website.',
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
            <DeviceLabel>Your Computer</DeviceLabel>
          </Device>
          
          <Device $highlighted={highlightedDevices.resolver}>
            <DeviceIcon>🔍</DeviceIcon>
            <DeviceLabel>DNS Resolver (ISP)</DeviceLabel>
          </Device>
          
          <Device $highlighted={highlightedDevices.root}>
            <DeviceIcon>🌐</DeviceIcon>
            <DeviceLabel>Root Nameserver</DeviceLabel>
          </Device>
          
          <Device $highlighted={highlightedDevices.tld}>
            <DeviceIcon>📁</DeviceIcon>
            <DeviceLabel>TLD Nameserver (.com)</DeviceLabel>
          </Device>
          
          <Device $highlighted={highlightedDevices.authoritative} style={{ gridColumn: '1 / 3' }}>
            <DeviceIcon>🖥️</DeviceIcon>
            <DeviceLabel>Authoritative Nameserver (example.com)</DeviceLabel>
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
            'Click Play to start the DNS query process animation.'
          ) : currentStep <= steps.length ? (
            steps[currentStep - 1].description
          ) : (
            'DNS query process completed! The browser can now connect to the website. Click Reset to watch again.'
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
        <InfoCard title="DNS Query Completed" type="success">
          <p>
            The DNS query process is now complete. Your computer has received the IP address for
            example.com and can now establish a connection to the website.
          </p>
          <p>
            Key points about DNS:
          </p>
          <ul>
            <li><strong>Hierarchical system</strong>: DNS uses a tree-like structure of nameservers</li>
            <li><strong>Caching</strong>: DNS resolvers cache results to improve performance</li>
            <li><strong>Distributed database</strong>: No single server contains all DNS information</li>
            <li><strong>Critical infrastructure</strong>: DNS is essential for the functioning of the internet</li>
          </ul>
          <p>
            DNS records have different types, including A (IPv4 address), AAAA (IPv6 address),
            CNAME (canonical name/alias), MX (mail exchange), and many more.
          </p>
        </InfoCard>
      )}
    </>
  );
};

export default DNSQuery;
