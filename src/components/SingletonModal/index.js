/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import Store from '~services/store';
import { Modal, Container } from './styles';
import {
  Default,
  Price,
  PasswordRecovery,
  PasswordRecoveryResponse,
  SecurityCode,
  CityPreview,
  StoreRating,
  OrderRating,
} from './modals';
import ModalTimeout from '~services/modalTimeout';
import { Platform, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const components = {
  default: { content: Default, keyboard: false },
};

const INITIAL_STATE = { visible: false, type: 'default' };

const IOS = Platform.OS === 'ios';

class SingletonModal extends Component {
  static _ref = null;

  static setRef(ref = {}) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
  }

  static clearRef() {
    this._ref = null;
  }

  static show(options = {}) {
    this._ref.show(options);
  }

  static hide() {
    this._ref.hide();
  }

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  hide = () => {
    if (this.state.onHide) ModalTimeout(this.state.onHide);
    this.setState({ visible: false });
  };

  close = () => {
    if (this.state.onClose) ModalTimeout(this.state.onClose);
    this.setState({ visible: false });
  };

  show = async props => {
    // Resetting to the default modal if not specified
    await this.setState({ ...INITIAL_STATE, ...props });
    this.setState({ visible: true }); // Only showing modal after props swap
  };

  render = () => {
    const component =
      components[this.state.type] || components[INITIAL_STATE.type];
    const Content = component.content;
    const enabled = component.keyboard && !IOS;
    const props = {
      ...this.state,
      hide: this.hide,
      show: this.show,
      close: this.close,
    };

    return (
      <Modal
        onBackdropPress={this.close}
        onSwipeComplete={this.close}
        onBackButtonPress={this.close}
        isVisible={this.state.visible}
        onClose={this.cancel}
      >
        <Store.Provider value={props}>
          <Container enabled={enabled} key={enabled}>
            <Content />
            <View height={IOS ? 20 + getBottomSpace() : 25} />
          </Container>
        </Store.Provider>
      </Modal>
    );
  };
}

export default SingletonModal;
