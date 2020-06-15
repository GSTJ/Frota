/* eslint-disable no-template-curly-in-string */
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import * as yup from 'yup';

function inArray(array, message = '${path} not found in ${array}') {
  return this.test({
    message,
    name: 'inArray',
    exclusive: true,
    params: { array },
    test(value) {
      return !value || (this.resolve(array) || []).includes(value);
    },
  });
}

function equalTo(ref, message = '${path} must be the same as ${reference}') {
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message,
    params: {
      reference: ref.path,
    },
    test(value) {
      return value === this.resolve(ref);
    },
  });
}

yup.addMethod(yup.string, 'inArray', inArray);
yup.addMethod(yup.string, 'equalTo', equalTo);

export default yup;

const HAPTIC_CONFIG = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export const GetFieldErrors = async (yupObject, data) => {
  try {
    await yupObject.validate(data, { abortEarly: false });
    return false;
  } catch (err) {
    const validationErrors = {};

    err.inner.forEach(error => {
      validationErrors[error.path] = error.message;
    });

    ReactNativeHapticFeedback.trigger('notificationError', HAPTIC_CONFIG);
    return validationErrors;
  }
};
