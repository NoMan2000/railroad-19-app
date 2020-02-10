// @flow
import { axios, defaultCancelSource } from './axios';
import type { ServerData } from '../types';
import type { AxiosPromise } from 'axios';

export const routeMaps = {
  getAllData: (): AxiosPromise<ServerData[], any> => {
    return axios.get('./../server/db.json', {
      cancelToken: defaultCancelSource.token
    });
  }
};
