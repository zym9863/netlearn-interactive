// src/components/protocols/models/TCPIPModel.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../../../styles/theme';
import InfoCard from '../../InfoCard';

interface Layer {
  id: number;
  name: string;
  chineseName: string;
  description: string;
  protocols: string[];
  pdu: string;
  color: string;
  osiEquivalent: string;
}

const layers: Layer[] = [
  {
    id: 4,
    name: 'Application',
    chineseName: '应用层',
    description: '包含所有高层协议，为用户提供各种网络服务。',
    protocols: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'DHCP', 'Telnet', 'SSH', 'SNMP'],
    pdu: '数据 (Data)',
    color: '#ef476f',
    osiEquivalent: '应用层、表示层、会话层'
  },
  {
    id: 3,
    name: 'Transport',
    chineseName: '传输层',
    description: '提供端到端的数据传输服务，确保数据的可靠性和完整性。',
    protocols: ['TCP', 'UDP', 'SCTP', 'DCCP'],
    pdu: '段/数据报 (Segment/Datagram)',
    color: '#118ab2',
    osiEquivalent: '传输层'
  },
  {
    id: 2,
    name: 'Internet',
    chineseName: '网际层',
    description: '负责数据包的路由和转发，使数据能够跨越不同的网络。',
    protocols: ['IP', 'ICMP', 'IGMP', 'ARP', 'RARP', 'OSPF', 'BGP'],
    pdu: '数据包 (Packet)',
    color: '#073b4c',
    osiEquivalent: '网络层'
  },
  {
    id: 1,
    name: 'Link',
    chineseName: '链路层',
    description: '负责物理设备之间的数据传输，包括硬件寻址和媒体访问控制。',
    protocols: ['Ethernet', 'Wi-Fi', 'PPP', 'HDLC', 'ATM', 'Frame Relay'],
    pdu: '帧/比特 (Frame/Bit)',
    color: '#3a86ff',
    osiEquivalent: '数据链路层、物理层'
  }
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.md};
  margin-bottom: ${theme.space.xl};
`;

const LayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.md};
`;

const LayerBox = styled.div<{ $color: string; $selected: boolean }>`
  background-color: ${props => props.$color};
  color: white;
  padding: ${theme.space.lg};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.default};
  box-shadow: ${props => props.$selected ? theme.shadows.lg : theme.shadows.sm};
  transform: ${props => props.$selected ? 'scale(1.02)' : 'scale(1)'};

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const LayerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.space.sm};
`;

const LayerTitle = styled.h3`
  margin: 0;
  font-size: ${theme.fontSizes.lg};
  font-weight: 600;
`;

const LayerNumber = styled.span`
  font-size: ${theme.fontSizes.sm};
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0.2);
  padding: ${theme.space.xs} ${theme.space.sm};
  border-radius: ${theme.borderRadius.full};
`;

const LayerChineseName = styled.div`
  font-size: ${theme.fontSizes.md};
  margin-bottom: ${theme.space.sm};
`;

const DetailContainer = styled(motion.div)`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.space.lg};
  box-shadow: ${theme.shadows.md};
  margin-top: ${theme.space.md};
`;

const DetailTitle = styled.h4`
  color: ${theme.colors.text};
  margin-top: 0;
  margin-bottom: ${theme.space.md};
  font-size: ${theme.fontSizes.lg};
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.space.md};
`;

const DetailSectionTitle = styled.h5`
  color: ${theme.colors.text};
  margin-top: 0;
  margin-bottom: ${theme.space.sm};
  font-size: ${theme.fontSizes.md};
`;

const ProtocolList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space.sm};
  margin-top: ${theme.space.sm};
`;

const ProtocolTag = styled.span`
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.text};
  padding: ${theme.space.xs} ${theme.space.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.sm};
`;

const PDUTag = styled.span<{ $color: string }>`
  background-color: ${props => props.$color};
  color: white;
  padding: ${theme.space.xs} ${theme.space.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.sm};
  display: inline-block;
`;

const OSIEquivalentTag = styled.span`
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.text};
  padding: ${theme.space.xs} ${theme.space.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSizes.sm};
  display: inline-block;
`;

const TCPIPModel = () => {
  const [selectedLayer, setSelectedLayer] = useState<Layer | null>(null);

  const handleLayerClick = (layer: Layer) => {
    if (selectedLayer && selectedLayer.id === layer.id) {
      setSelectedLayer(null);
    } else {
      setSelectedLayer(layer);
    }
  };

  return (
    <Container>
      <LayerContainer>
        {layers.map(layer => (
          <div key={layer.id}>
            <LayerBox 
              $color={layer.color} 
              $selected={selectedLayer?.id === layer.id}
              onClick={() => handleLayerClick(layer)}
            >
              <LayerHeader>
                <LayerTitle>{layer.name}</LayerTitle>
                <LayerNumber>第 {layer.id} 层</LayerNumber>
              </LayerHeader>
              <LayerChineseName>{layer.chineseName}</LayerChineseName>
            </LayerBox>
            
            <AnimatePresence>
              {selectedLayer && selectedLayer.id === layer.id && (
                <DetailContainer
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DetailTitle>{layer.chineseName} (Layer {layer.id})</DetailTitle>
                  
                  <DetailSection>
                    <DetailSectionTitle>功能描述</DetailSectionTitle>
                    <p>{layer.description}</p>
                  </DetailSection>
                  
                  <DetailSection>
                    <DetailSectionTitle>数据单元 (PDU)</DetailSectionTitle>
                    <PDUTag $color={layer.color}>{layer.pdu}</PDUTag>
                  </DetailSection>
                  
                  <DetailSection>
                    <DetailSectionTitle>相关协议</DetailSectionTitle>
                    <ProtocolList>
                      {layer.protocols.map(protocol => (
                        <ProtocolTag key={protocol}>{protocol}</ProtocolTag>
                      ))}
                    </ProtocolList>
                  </DetailSection>

                  <DetailSection>
                    <DetailSectionTitle>对应的OSI层</DetailSectionTitle>
                    <OSIEquivalentTag>{layer.osiEquivalent}</OSIEquivalentTag>
                  </DetailSection>
                </DetailContainer>
              )}
            </AnimatePresence>
          </div>
        ))}
      </LayerContainer>

      {!selectedLayer && (
        <InfoCard title="点击任意层级查看详情" type="info">
          <p>
            TCP/IP模型将网络通信分为4个层次，从底层的链路层到顶层的应用层。
            与OSI模型相比，TCP/IP模型更加简化，并且更加贴近实际应用。
          </p>
          <p>
            点击上面的任意层级，了解该层的详细功能、协议和数据单元，以及与OSI模型的对应关系。
          </p>
        </InfoCard>
      )}
    </Container>
  );
};

export default TCPIPModel;
