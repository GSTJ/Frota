import PropTypes from 'prop-types';
import { SUBTITLE } from '~colors';
import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  forwardRef,
} from 'react';

import HideIcon from './assets/hide.svg';
import ShowIcon from './assets/show.svg';
import { useField } from '@unform/core';
import { InputButton, TextInput } from './styles';

const Input = forwardRef(({ type, color, ...rest }, ref) => {
  const [visible, setVisible] = useState(false);

  const Hide = useCallback(
    () => (
      <InputButton onPress={() => setVisible(!visible)}>
        <HideIcon width={23} height={23} fill={color ?? SUBTITLE} />
      </InputButton>
    ),
    [color, visible]
  );

  const Show = useCallback(
    () => (
      <InputButton onPress={() => setVisible(!visible)}>
        <ShowIcon width={23} height={23} fill={color ?? SUBTITLE} />
      </InputButton>
    ),
    [color, visible]
  );

  const passwordAccessory = visible ? Hide : Show;

  return (
    <TextInput
      color={color}
      type={type}
      secureTextEntry={!visible && type === 'password'}
      renderRightAccessory={type === 'password' ? passwordAccessory : null}
      ref={ref}
      {...rest}
    />
  );
});

export default function Component({ name = '', ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    if (name)
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'defaultValue',
        getValue: ref => ref.value(),
        setValue: (ref, text) => ref.setValue(text),
        clearValue: ref => ref.clear(),
      });
  }, [fieldName, registerField, name]);

  return (
    <Input error={error} defaultValue={defaultValue} ref={inputRef} {...rest} />
  );
}

Component.propTypes = {
  name: PropTypes.string,
};

Input.displayName = 'InputPresentational';

Input.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
};
