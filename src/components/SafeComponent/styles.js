import styled from 'styled-components/native';
import { BACKGROUND } from '~colors';
import Text from '~components/Text';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { flex: 1 },
})``;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  background: ${BACKGROUND};
  padding: 20px;
  flex-grow: 1;
  flex-shrink: 0;
`;

export const Title = styled(Text).attrs({
  big: true,
  primary: true,
  bold: true,
  center: true,
})``;

export const ContainedText = styled(Text).attrs({ center: true })`
  max-width: 350px;
`;

export const RefreshButton = styled.TouchableOpacity`
  padding: 10px;
  padding-top: 25px;
  flex-shrink: 0;
`;
