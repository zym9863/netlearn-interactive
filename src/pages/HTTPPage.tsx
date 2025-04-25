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
        <Title>HTTP Protocol</Title>
        <Description>
          Hypertext Transfer Protocol (HTTP) is the foundation of data communication on the World Wide Web.
          It defines how messages are formatted and transmitted, and what actions web servers and browsers
          should take in response to various commands.
        </Description>
      </PageHeader>
      
      <InfoCard title="What is HTTP?">
        <p>
          HTTP is an application layer protocol designed within the framework of the Internet protocol suite.
          Its definition presumes an underlying and reliable transport layer protocol, such as TCP. HTTP is
          a stateless protocol, meaning that the server does not keep any data (state) between two requests.
        </p>
      </InfoCard>
      
      <InfoCard title="HTTP Request/Response Cycle" type="info">
        <p>
          The HTTP protocol works as a request-response protocol between a client and server:
        </p>
        <ol>
          <li><strong>Request</strong>: The client sends an HTTP request to the server.</li>
          <li><strong>Processing</strong>: The server processes the request.</li>
          <li><strong>Response</strong>: The server returns an HTTP response to the client.</li>
        </ol>
        <p>
          Each HTTP request contains a method (GET, POST, PUT, DELETE, etc.), headers, and sometimes a body.
          Each HTTP response contains a status code, headers, and usually a body.
        </p>
      </InfoCard>
      
      <HTTPRequest />
    </>
  );
};

export default HTTPPage;
