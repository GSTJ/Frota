import React from 'react';
import Row from '~components/Row';
import ModalTimeout from '~services/modalTimeout';
import { CancelSpacing, CancelTouchArea, CancelText, Button } from './styles';
import { useContext } from '~services/store';

export function Buttons() {
  const { buttons, hide } = useContext();
  if (!buttons) return <></>;
  return (
    <Row>
      {buttons.map((button, index) => (
        <Button
          {...button}
          key={button.id}
          last={index === buttons.length - 1}
          onPress={async () => {
            await hide();
            return button.onPress && ModalTimeout(button.onPress);
          }}
        >
          {button.title}
        </Button>
      ))}
    </Row>
  );
}

export function Cancel() {
  const { cancel = 'cancelar', close } = useContext();
  return (
    <>
      <CancelSpacing />
      <CancelTouchArea onPress={close}>
        <CancelText>{cancel}</CancelText>
      </CancelTouchArea>
    </>
  );
}
