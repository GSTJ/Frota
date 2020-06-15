import React from 'react';
import { Container, Icon, Content, Title, Circle } from './styles';

interface AddressInterface {
  title: string;
}

const AddressComponent: React.FC<AddressInterface> = props => (
  <Container {...props}>
    <Circle>
      <Icon />
    </Circle>
    <Content>
      <Title>{props.title}</Title>
    </Content>
  </Container>
);

export default AddressComponent;
