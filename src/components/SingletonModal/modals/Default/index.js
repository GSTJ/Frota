import React from 'react';
import Separator from '~components/Separator';
import Text from '~components/Text';
import { Buttons, Cancel } from '~components/SingletonModal/helpers';
import { useContext } from '~services/store';

export default function Component() {
  const { title, description } = useContext();
  return (
    <>
      <Text big bold center>
        {title}
      </Text>
      <Text medium center>
        {description}
      </Text>
      <Separator height={15} />
      <Buttons />
      <Cancel />
    </>
  );
}
