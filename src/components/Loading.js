import styled from 'styled-components/native';

import LottieView from 'lottie-react-native';
import RedLoading from '~animations/redLoadingDots.json';
import LightLoading from '~animations/lightLoadingDots.json';

export default styled(LottieView).attrs(props => ({
  resizeMode: 'cover',
  autoPlay: true,
  source: props.light ? LightLoading : RedLoading,
}))`
  width: 50px;
  margin: auto;
`;
