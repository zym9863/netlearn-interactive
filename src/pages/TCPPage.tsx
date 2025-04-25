// src/pages/TCPPage.tsx
import { useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import InfoCard from '../components/InfoCard';
import TCPHandshake from '../components/protocols/tcp/TCPHandshake';
import TCPTermination from '../components/protocols/tcp/TCPTermination';

const PageHeader = styled.div`
  margin-bottom: ${theme.space.xl};
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
`;

const Description = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.lightText};
  max-width: 800px;
`;

const TabContainer = styled.div`
  margin-bottom: ${theme.space.xl};
`;

const TabButtons = styled.div`
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

const TCPPage = () => {
  const [activeTab, setActiveTab] = useState<'handshake' | 'termination'>('handshake');
  
  return (
    <>
      <PageHeader>
        <Title>TCP Protocol</Title>
        <Description>
          Transmission Control Protocol (TCP) is one of the main protocols of the Internet protocol suite.
          It provides reliable, ordered, and error-checked delivery of data between applications running
          on hosts communicating via an IP network.
        </Description>
      </PageHeader>
      
      <InfoCard title="What is TCP?">
        <p>
          TCP is a connection-oriented protocol, which means a connection is established and maintained
          until the application programs at each end have finished exchanging messages. It determines how
          to break application data into packets that networks can deliver, sends packets to and accepts
          packets from the network layer, manages flow control, and handles retransmission of dropped or
          garbled packets as well as acknowledgment of all packets that arrive.
        </p>
      </InfoCard>
      
      <TabContainer>
        <TabButtons>
          <TabButton
            $active={activeTab === 'handshake'}
            onClick={() => setActiveTab('handshake')}
          >
            Three-Way Handshake
          </TabButton>
          <TabButton
            $active={activeTab === 'termination'}
            onClick={() => setActiveTab('termination')}
          >
            Four-Way Termination
          </TabButton>
        </TabButtons>
        
        {activeTab === 'handshake' ? (
          <>
            <InfoCard title="TCP Three-Way Handshake" type="info">
              <p>
                The TCP three-way handshake is the process used to establish a connection between a client
                and server. It consists of three steps:
              </p>
              <ol>
                <li><strong>SYN</strong>: Client sends a SYN packet to the server, requesting a connection.</li>
                <li><strong>SYN-ACK</strong>: Server responds with a SYN-ACK packet, acknowledging the request.</li>
                <li><strong>ACK</strong>: Client sends an ACK packet to the server, confirming the connection.</li>
              </ol>
            </InfoCard>
            <TCPHandshake />
          </>
        ) : (
          <>
            <InfoCard title="TCP Four-Way Termination" type="info">
              <p>
                The TCP four-way termination is the process used to close a connection between a client
                and server. It consists of four steps:
              </p>
              <ol>
                <li><strong>FIN</strong>: Client sends a FIN packet to the server, requesting to close the connection.</li>
                <li><strong>ACK</strong>: Server sends an ACK packet to acknowledge the FIN.</li>
                <li><strong>FIN</strong>: Server sends its own FIN packet to the client.</li>
                <li><strong>ACK</strong>: Client sends an ACK packet to acknowledge the server's FIN.</li>
              </ol>
            </InfoCard>
            <TCPTermination />
          </>
        )}
      </TabContainer>
    </>
  );
};

export default TCPPage;
