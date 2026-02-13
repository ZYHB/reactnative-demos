import {TouchableOpacity, Animated, Dimensions} from 'react-native';
import React, {Component} from 'react';
import CommonDialog from '~/components/common-dialog';
export class GlobalShare {
  windowDialogRef: CommonDialog | null | undefined;
}

export let globalShare = new GlobalShare();
