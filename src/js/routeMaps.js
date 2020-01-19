import { axios } from './axios';
// eslint-disable-next-line flowtype/no-types-missing-file-annotation
import type { ServerData } from '../types';
import { AxiosPromise } from 'axios';

export const routeMaps = {
  // eslint-disable-next-line flowtype/no-types-missing-file-annotation
  getAllData: (): AxiosPromise<ServerData[], any> => {
    return axios.get('./../server/db.json');
  }
};
