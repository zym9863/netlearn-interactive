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
        <Title>DNS Protocol</Title>
        <Description>
          Domain Name System (DNS) is a hierarchical and decentralized naming system for computers, services,
          or other resources connected to the Internet or a private network. It translates domain names to
          the numerical IP addresses needed for locating and identifying computer services and devices.
        </Description>
      </PageHeader>
      
      <InfoCard title="What is DNS?">
        <p>
          DNS is essentially the phone book of the Internet. Humans access information online through domain
          names, like example.com. Web browsers interact through Internet Protocol (IP) addresses. DNS
          translates domain names to IP addresses so browsers can load Internet resources.
        </p>
      </InfoCard>
      
      <InfoCard title="DNS Query Process" type="info">
        <p>
          The DNS query process involves several steps:
        </p>
        <ol>
          <li><strong>DNS Resolver</strong>: Your computer first contacts a DNS resolver (usually provided by your ISP).</li>
          <li><strong>Root Nameserver</strong>: If the resolver doesn't have the answer cached, it asks a root nameserver.</li>
          <li><strong>TLD Nameserver</strong>: The root server directs the resolver to a TLD (Top-Level Domain) nameserver.</li>
          <li><strong>Authoritative Nameserver</strong>: The TLD server directs the resolver to the authoritative nameserver.</li>
          <li><strong>IP Address</strong>: The authoritative nameserver provides the IP address for the domain.</li>
          <li><strong>Response</strong>: The resolver returns the IP address to your computer.</li>
        </ol>
      </InfoCard>
      
      <DNSQuery />
    </>
  );
};

export default DNSPage;
