// src/components/InfoCard.tsx
import { ReactNode } from 'react';
import styled from 'styled-components';
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import theme from '../styles/theme';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  type?: 'info' | 'success' | 'warning' | 'error';
}

const CardContainer = styled.div<{ $type: string }>`
  background-color: ${props => {
    switch (props.$type) {
      case 'success': return 'rgba(6, 214, 160, 0.08)';
      case 'warning': return 'rgba(255, 209, 102, 0.08)';
      case 'error': return 'rgba(239, 71, 111, 0.08)';
      default: return 'rgba(17, 138, 178, 0.08)';
    }
  }};
  border-left: 4px solid ${props => {
    switch (props.$type) {
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.info;
    }
  }};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.space.lg};
  margin-bottom: ${theme.space.lg};
  box-shadow: ${theme.shadows.sm};
  transition: ${theme.transitions.default};

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space.sm};
  margin-bottom: ${theme.space.sm};
`;

const CardIcon = styled.span<{ $type: string }>`
  color: ${props => {
    switch (props.$type) {
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.info;
    }
  }};
  font-size: ${theme.fontSizes.xl};
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h4<{ $type: string }>`
  color: ${props => {
    switch (props.$type) {
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.info;
    }
  }};
  margin: 0;
  font-weight: 600;
`;

const CardContent = styled.div`
  color: ${theme.colors.text};
  line-height: 1.6;

  p:last-child {
    margin-bottom: 0;
  }

  ul, ol {
    padding-left: ${theme.space.lg};
  }
`;

const InfoCard = ({ title, children, type = 'info' }: InfoCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'error':
        return <FaTimesCircle />;
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <CardContainer $type={type}>
      <CardHeader>
        <CardIcon $type={type}>{getIcon()}</CardIcon>
        <CardTitle $type={type}>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export default InfoCard;
