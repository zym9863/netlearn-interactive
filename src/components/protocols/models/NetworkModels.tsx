// src/components/protocols/models/NetworkModels.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import theme from '../../../styles/theme';
import OSIModel from './OSIModel';
import TCPIPModel from './TCPIPModel';

const Container = styled.div`
  margin-bottom: ${theme.space.xl};
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${theme.space.sm};
  margin-bottom: ${theme.space.lg};
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: ${theme.space.sm} ${theme.space.lg};
  background-color: ${props => props.$active ? theme.colors.primary : theme.colors.white};
  color: ${props => props.$active ? theme.colors.white : theme.colors.text};
  border: 1px solid ${props => props.$active ? theme.colors.primary : theme.colors.lightGray};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.md};
  font-weight: ${props => props.$active ? '600' : '400'};
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${props => props.$active ? theme.colors.primary : theme.colors.lightGray};
  }
`;

const ModelContainer = styled(motion.div)`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.space.lg};
  box-shadow: ${theme.shadows.md};
`;

const NetworkModels = () => {
  const [activeModel, setActiveModel] = useState<'osi' | 'tcpip'>('osi');

  return (
    <Container>
      <TabContainer>
        <TabButton
          $active={activeModel === 'osi'}
          onClick={() => setActiveModel('osi')}
        >
          OSI模型
        </TabButton>
        <TabButton
          $active={activeModel === 'tcpip'}
          onClick={() => setActiveModel('tcpip')}
        >
          TCP/IP模型
        </TabButton>
      </TabContainer>

      <ModelContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeModel === 'osi' ? <OSIModel /> : <TCPIPModel />}
      </ModelContainer>
    </Container>
  );
};

export default NetworkModels;
