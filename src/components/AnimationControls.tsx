// src/components/AnimationControls.tsx
import styled from 'styled-components';
import { FaPlay, FaPause, FaRedo, FaStepForward, FaStepBackward } from 'react-icons/fa';
import theme from '../styles/theme';

interface AnimationControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.space.md};
  margin: ${theme.space.xl} 0;
  padding: ${theme.space.md};
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
`;

const Button = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.space.sm} ${theme.space.md};
  font-size: ${theme.fontSizes.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.space.xs};
  transition: ${theme.transitions.default};
  min-width: 90px;

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.sm};
  }

  &:disabled {
    background-color: ${theme.colors.lightGray};
    color: ${theme.colors.lightText};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.md};
`;

const ButtonText = styled.span`
  font-weight: 500;
`;

const StepInfo = styled.div`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.lightText};
  margin: 0 ${theme.space.md};
  background-color: ${theme.colors.lightGray};
  padding: ${theme.space.xs} ${theme.space.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
`;

const AnimationControls = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onNext,
  onPrev,
  currentStep,
  totalSteps,
}: AnimationControlsProps) => {
  return (
    <ControlsContainer>
      {onPrev && (
        <Button onClick={onPrev} disabled={currentStep === 1 || isPlaying}>
          <ButtonIcon><FaStepBackward /></ButtonIcon>
          <ButtonText>Prev</ButtonText>
        </Button>
      )}

      {isPlaying ? (
        <Button onClick={onPause}>
          <ButtonIcon><FaPause /></ButtonIcon>
          <ButtonText>Pause</ButtonText>
        </Button>
      ) : (
        <Button onClick={onPlay}>
          <ButtonIcon><FaPlay /></ButtonIcon>
          <ButtonText>Play</ButtonText>
        </Button>
      )}

      <Button onClick={onReset}>
        <ButtonIcon><FaRedo /></ButtonIcon>
        <ButtonText>Reset</ButtonText>
      </Button>

      {onNext && (
        <Button onClick={onNext} disabled={currentStep === totalSteps || isPlaying}>
          <ButtonIcon><FaStepForward /></ButtonIcon>
          <ButtonText>Next</ButtonText>
        </Button>
      )}

      {currentStep !== undefined && totalSteps !== undefined && (
        <StepInfo>
          Step {currentStep} of {totalSteps}
        </StepInfo>
      )}
    </ControlsContainer>
  );
};

export default AnimationControls;
