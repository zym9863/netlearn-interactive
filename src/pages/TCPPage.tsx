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
        <Title>TCP 协议</Title>
        <Description>
          传输控制协议（TCP）是互联网协议套件中的主要协议之一。
          它提供了可靠的、有序的、经过错误检查的数据传输，用于通过IP网络通信的应用程序之间。
        </Description>
      </PageHeader>

      <InfoCard title="什么是TCP？">
        <p>
          TCP是一种面向连接的协议，这意味着在应用程序完成消息交换之前，连接会被建立并保持。
          它决定如何将应用数据分解成网络可传递的数据包，向网络层发送和接收数据包，
          管理流量控制，并处理丢失或损坏的数据包的重传以及对所有到达的数据包的确认。
        </p>
      </InfoCard>

      <TabContainer>
        <TabButtons>
          <TabButton
            $active={activeTab === 'handshake'}
            onClick={() => setActiveTab('handshake')}
          >
            三次握手
          </TabButton>
          <TabButton
            $active={activeTab === 'termination'}
            onClick={() => setActiveTab('termination')}
          >
            四次挥手
          </TabButton>
        </TabButtons>

        {activeTab === 'handshake' ? (
          <>
            <InfoCard title="TCP三次握手" type="info">
              <p>
                TCP三次握手是用于在客户端和服务器之间建立连接的过程。它包含三个步骤：
              </p>
              <ol>
                <li><strong>SYN</strong>：客户端向服务器发送SYN数据包，请求连接。</li>
                <li><strong>SYN-ACK</strong>：服务器用SYN-ACK数据包响应，确认请求。</li>
                <li><strong>ACK</strong>：客户端向服务器发送ACK数据包，确认连接。</li>
              </ol>
            </InfoCard>
            <TCPHandshake />
          </>
        ) : (
          <>
            <InfoCard title="TCP四次挥手" type="info">
              <p>
                TCP四次挥手是用于关闭客户端和服务器之间连接的过程。它包含四个步骤：
              </p>
              <ol>
                <li><strong>FIN</strong>：客户端向服务器发送FIN数据包，请求关闭连接。</li>
                <li><strong>ACK</strong>：服务器发送ACK数据包确认FIN。</li>
                <li><strong>FIN</strong>：服务器向客户端发送自己的FIN数据包。</li>
                <li><strong>ACK</strong>：客户端发送ACK数据包确认服务器的FIN。</li>
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
