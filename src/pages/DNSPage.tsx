// src/pages/DNSPage.tsx
import styled from 'styled-components';
import theme from '../styles/theme';
import InfoCard from '../components/InfoCard';
import DNSQuery from '../components/protocols/dns/DNSQuery';

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

const DNSPage = () => {
  return (
    <>
      <PageHeader>
        <Title>DNS 协议</Title>
        <Description>
          域名系统（DNS）是一个用于计算机、服务或其他连接到互联网或私有网络的资源的分层分散式命名系统。
          它将域名转换为定位和识别计算机服务和设备所需的数字IP地址。
        </Description>
      </PageHeader>

      <InfoCard title="什么是DNS？">
        <p>
          DNS本质上是互联网的电话簿。人们通过域名（如example.com）在线访问信息。
          网络浏览器通过互联网协议（IP）地址进行交互。DNS将域名转换为IP地址，
          使浏览器能够加载互联网资源。
        </p>
      </InfoCard>

      <InfoCard title="DNS查询过程" type="info">
        <p>
          DNS查询过程包括几个步骤：
        </p>
        <ol>
          <li><strong>DNS解析器</strong>：您的计算机首先联系DNS解析器（通常由您的ISP提供）。</li>
          <li><strong>根名称服务器</strong>：如果解析器没有缓存答案，它会询问根名称服务器。</li>
          <li><strong>TLD名称服务器</strong>：根服务器将解析器引导到TLD（顶级域）名称服务器。</li>
          <li><strong>权威名称服务器</strong>：TLD服务器将解析器引导到权威名称服务器。</li>
          <li><strong>IP地址</strong>：权威名称服务器提供域名的IP地址。</li>
          <li><strong>响应</strong>：解析器将IP地址返回给您的计算机。</li>
        </ol>
      </InfoCard>

      <DNSQuery />
    </>
  );
};

export default DNSPage;
