import {TouchableOpacity, Animated, Dimensions} from 'react-native';
import React, {Component} from 'react';
import CommonDialog from '~/components/common-dialog';
import CommonToast from '~/components/common-toast';
import {extraUtil} from '~/utils';
export class GlobalToast {
  toastRef: CommonDialog | null | undefined;

  showToast(message?: string, displayTime?: number) {
    if (extraUtil.isEmptyObj(message)) {
      return;
    }
    this.toastRef?.showWithContent(
      CommonDialog.popupMode.center,
      () => console.log('点击toast背景'),
      () => {
        return <CommonToast message={message} />;
      },
    );
    //自动消失
    setTimeout(() => {
      this.toastRef?.hide();
    }, displayTime ?? 1000);
  }
}

export let globalToast = new GlobalToast();
