// src/pages/NetworkModelsPage.tsx
import { useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import InfoCard from '../components/InfoCard';
import OSIModel from '../components/protocols/models/OSIModel';
import TCPIPModel from '../components/protocols/models/TCPIPModel';

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

const NetworkModelsPage = () => {
  const [activeTab, setActiveTab] = useState<'osi' | 'tcpip'>('osi');

  return (
    <>
      <PageHeader>
        <Title>网络分层模型</Title>
        <Description>
          网络分层模型是用于理解和实现网络通信的概念框架。
          这些模型将网络通信过程分解为多个层次，每个层次负责特定的功能，
          使得复杂的网络通信变得更加可管理和标准化。
        </Description>
      </PageHeader>

      <InfoCard title="什么是网络分层模型？">
        <p>
          网络分层模型是一种将网络通信过程分解为多个层次的概念框架。
          每个层次都有特定的功能和责任，并且只与相邻的层次进行交互。
          这种分层方法使得网络设计和实现变得更加模块化和灵活，
          同时也便于标准化和互操作性。
        </p>
        <p>
          两种最常见的网络分层模型是OSI（开放系统互连）模型和TCP/IP模型。
          OSI模型有7层，而TCP/IP模型有4层。尽管OSI模型在理论上更为完整，
          但TCP/IP模型在实际应用中更为广泛。
        </p>
      </InfoCard>

      <TabContainer>
        <TabButtons>
          <TabButton
            $active={activeTab === 'osi'}
            onClick={() => setActiveTab('osi')}
          >
            OSI模型
          </TabButton>
          <TabButton
            $active={activeTab === 'tcpip'}
            onClick={() => setActiveTab('tcpip')}
          >
            TCP/IP模型
          </TabButton>
        </TabButtons>

        {activeTab === 'osi' ? (
          <>
            <InfoCard title="OSI模型" type="info">
              <p>
                OSI（开放系统互连）模型是由国际标准化组织（ISO）在1984年提出的一个概念模型，
                它将网络通信过程分为7个层次。每个层次都有特定的功能和责任，
                并且只与相邻的层次进行交互。
              </p>
              <p>
                点击下面的各个层级，了解每层的功能、协议和数据单元。
              </p>
            </InfoCard>
            <OSIModel />
          </>
        ) : (
          <>
            <InfoCard title="TCP/IP模型" type="info">
              <p>
                TCP/IP模型是互联网的基础，它将网络通信过程分为4个层次。
                与OSI模型相比，TCP/IP模型更加简化，并且更加贴近实际应用。
              </p>
              <p>
                点击下面的各个层级，了解每层的功能、协议和数据单元。
              </p>
            </InfoCard>
            <TCPIPModel />
          </>
        )}
      </TabContainer>
    </>
  );
};

export default NetworkModelsPage;
