// @flow
import * as React from 'react';
import type { ServerDataWithShowModal } from '../../types';

export const mainData = () => {
  const [
    managementData: ServerDataWithShowModal[],
    updateManagementData
  ] = React.useState<ServerDataWithShowModal[]>([]);
  return { managementData, updateManagementData };
};
