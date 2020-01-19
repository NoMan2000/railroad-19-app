// @flow
import { Intent, Position, Toaster } from '@blueprintjs/core';
import './AppToaster.scss';

export const appToaster = Toaster.create({
  position: Position.TOP,
  maxToasts: 1
});

export const AppToaster = {
  success: (message: string) => {
    appToaster.show({
      intent: Intent.SUCCESS,
      icon: 'tick',
      message,
      timeout: 2000,
      maxToasts: 1
    });
  },
  error: (message: string) => {
    appToaster.show({
      intent: Intent.DANGER,
      icon: 'warning-sign',
      message,
      timeout: 2000,
      maxToasts: 1
    });
  },
  warning: (message: string) => {
    appToaster.show({
      intent: Intent.WARNING,
      icon: 'warning-sign',
      message,
      timeout: 2000,
      maxToasts: 1
    });
  }
};
