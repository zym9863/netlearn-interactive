// src/pages/HTTPPage.tsx
import styled from 'styled-components';
import theme from '../styles/theme';
import InfoCard from '../components/InfoCard';
import HTTPRequest from '../components/protocols/http/HTTPRequest';

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

const HTTPPage = () => {
  return (
    <>
      <PageHeader>
        <Title>HTTP 协议</Title>
        <Description>
          超文本传输协议（HTTP）是万维网数据通信的基础。
          它定义了消息如何格式化和传输，以及网络服务器和浏览器应该如何响应各种命令。
        </Description>
      </PageHeader>

      <InfoCard title="什么是HTTP？">
        <p>
          HTTP是在互联网协议套件框架内设计的应用层协议。
          它的定义假设有一个底层的可靠传输层协议，如TCP。HTTP是
          一个无状态协议，这意味着服务器在两个请求之间不保留任何数据（状态）。
        </p>
      </InfoCard>

      <InfoCard title="HTTP请求/响应周期" type="info">
        <p>
          HTTP协议作为客户端和服务器之间的请求-响应协议工作：
        </p>
        <ol>
          <li><strong>请求</strong>：客户端向服务器发送HTTP请求。</li>
          <li><strong>处理</strong>：服务器处理请求。</li>
          <li><strong>响应</strong>：服务器向客户端返回HTTP响应。</li>
        </ol>
        <p>
          每个HTTP请求包含一个方法（GET、POST、PUT、DELETE等）、头部和有时包含主体。
          每个HTTP响应包含一个状态码、头部和通常包含主体。
        </p>
      </InfoCard>

      <HTTPRequest />
    </>
  );
};

export default HTTPPage;
