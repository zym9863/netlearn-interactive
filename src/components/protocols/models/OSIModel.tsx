// src/components/protocols/models/OSIModel.tsx
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
}

const layers: Layer[] = [
  {
    id: 7,
    name: 'Application',
    chineseName: '应用层',
    description: '为应用程序提供网络服务，如HTTP、FTP、SMTP等。',
    protocols: ['HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'DHCP', 'Telnet', 'SSH'],
    pdu: '数据 (Data)',
    color: '#ef476f'
  },
  {
    id: 6,
    name: 'Presentation',
    chineseName: '表示层',
    description: '负责数据的格式转换、加密解密、压缩解压缩等。',
    protocols: ['SSL/TLS', 'JPEG', 'MPEG', 'ASCII', 'EBCDIC'],
    pdu: '数据 (Data)',
    color: '#ffd166'
  },
  {
    id: 5,
    name: 'Session',
    chineseName: '会话层',
    description: '建立、管理和终止会话连接，如登录会话。',
    protocols: ['NetBIOS', 'RPC', 'PPTP', 'SAP', 'SDP'],
    pdu: '数据 (Data)',
    color: '#06d6a0'
  },
  {
    id: 4,
    name: 'Transport',
    chineseName: '传输层',
    description: '提供端到端的可靠数据传输服务，如TCP、UDP。',
    protocols: ['TCP', 'UDP', 'SCTP', 'DCCP'],
    pdu: '段/数据报 (Segment/Datagram)',
    color: '#118ab2'
  },
  {
    id: 3,
    name: 'Network',
    chineseName: '网络层',
    description: '负责数据包的路由和转发，如IP。',
    protocols: ['IP', 'ICMP', 'IGMP', 'ARP', 'RARP', 'OSPF', 'BGP'],
    pdu: '数据包 (Packet)',
    color: '#073b4c'
  },
  {
    id: 2,
    name: 'Data Link',
    chineseName: '数据链路层',
    description: '负责相邻节点之间的数据传输，如以太网。',
    protocols: ['Ethernet', 'PPP', 'HDLC', 'Frame Relay', 'ATM', 'IEEE 802.11 (Wi-Fi)'],
    pdu: '帧 (Frame)',
    color: '#3a86ff'
  },
  {
    id: 1,
    name: 'Physical',
    chineseName: '物理层',
    description: '负责比特流的传输，如电缆、光纤等。',
    protocols: ['Ethernet Physical Layer', 'USB', 'Bluetooth', 'IEEE 802.11 Physical Layer'],
    pdu: '比特 (Bit)',
    color: '#8338ec'
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

const OSIModel = () => {
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
                </DetailContainer>
              )}
            </AnimatePresence>
          </div>
        ))}
      </LayerContainer>

      {!selectedLayer && (
        <InfoCard title="点击任意层级查看详情" type="info">
          <p>
            OSI模型将网络通信分为7个层次，从底层的物理层到顶层的应用层。
            每个层次都有特定的功能和责任，并且只与相邻的层次进行交互。
          </p>
          <p>
            点击上面的任意层级，了解该层的详细功能、协议和数据单元。
          </p>
        </InfoCard>
      )}
    </Container>
  );
};

export default OSIModel;
