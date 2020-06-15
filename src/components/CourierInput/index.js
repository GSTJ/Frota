import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Error, TextInput } from './styles';

export const Input = forwardRef(({ error, ...props }, ref) => (
  <>
    <TextInput ref={ref} {...props} />
    {!!error && <Error>{error}</Error>}
  </>
));

export default Input;

Input.displayName = 'CourierInputPresentational';

Input.propTypes = {
  error: PropTypes.string,
};
