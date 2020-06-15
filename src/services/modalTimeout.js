import { Platform } from 'react-native';

const ios = Platform.OS === 'ios';

export const DELAY = 300;

const timeout = DELAY + 100;
export default cb => setTimeout(cb, timeout + ios ? 100 : 0);
