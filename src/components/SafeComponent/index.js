import PropTypes from 'prop-types';
import React, { useCallback, useState, useEffect } from 'react';
import {
  Container,
  Content,
  Title,
  ContainedText,
  RefreshButton,
} from './styles';
import Loading from '~components/Loading';
import UnknownError from './assets/loadingError.svg';
import Text from '~components/Text';
import ConnectionError from './assets/connectionError.svg';
import { useNetInfo } from '@react-native-community/netinfo';
import Separator from '~components/Separator';
import ErrorBoundary from 'react-native-error-boundary';
import { ScrollView } from 'react-native';

const iconProps = {
  width: 200,
  height: 200,
};

const OfflineComponent = ({ refresh, ...rest }) => (
  <Container {...rest}>
    <Content>
      <ConnectionError {...iconProps} />
      <Title>Acho que você está sem conexão!</Title>
      <ContainedText center>
        Verifique se está tudo ok com a sua conexão de internet e tente
        novamente.
      </ContainedText>
      <RefreshButton onPress={refresh}>
        <Text primary underline bold>
          Ok, entendi!
        </Text>
      </RefreshButton>
    </Content>
  </Container>
);

const RequestErrorComponent = ({ refresh, ...rest }) => (
  <Container {...rest}>
    <Content>
      <UnknownError {...iconProps} />
      <Separator height={20} />
      <Title>Ops! Tivemos um probleminha</Title>
      <ContainedText center>
        Parece que ocorreu um erro com sua solicitação. Tente novamente ou entre
        em contato com o suporte
      </ContainedText>
      <RefreshButton onPress={refresh}>
        <Text primary underline bold>
          Quero tentar novamente!
        </Text>
      </RefreshButton>
    </Content>
  </Container>
);

const UnknownErrorComponent = props => (
  <Container {...props}>
    <Content>
      <UnknownError {...iconProps} />
      <Separator height={20} />
      <Title>Ops! Tivemos um probleminha</Title>
      <ContainedText center>
        Não se preocupe, nossa equipe já está trabalhando na solução. Enquanto
        isso, reinicie o aplicativo 😉
      </ContainedText>
    </Content>
  </Container>
);

const ErrorHandler = children => (
  <ErrorBoundary FallbackComponent={UnknownErrorComponent}>
    {children || null}
  </ErrorBoundary>
);

// NetInfo is always disconnected on first render
function useIsOffline() {
  const netInfo = useNetInfo();
  const [netInfoSafe, setNetInfoSafe] = useState(false);

  useEffect(() => {
    setNetInfoSafe(true);
  }, []);

  return netInfoSafe && !netInfo.isInternetReachable;
}

export default function Component({ request, children, ...props }) {
  const SafeChildren = useCallback(ErrorHandler(children), [children]);
  const offline = useIsOffline();

  if (request?.loading)
    return (
      <Content>
        <Loading {...props} />
      </Content>
    );
  if (request?.data) return SafeChildren;
  if (request && offline) return <OfflineComponent {...props} />;
  if (request?.error || request?.data?.error)
    return <RequestErrorComponent {...props} />;

  return SafeChildren;
}

Component.propTypes = {
  children: PropTypes.any,
  request: PropTypes.object,
  refresh: PropTypes.func,
};

OfflineComponent.propTypes = {
  refresh: PropTypes.func,
};

RequestErrorComponent.propTypes = {
  refresh: PropTypes.func,
};
