// @flow
import { createServerData } from '../server/db';
import shortid from 'shortid';
import faker from 'faker';
import type { ServerData, ServerDataWithShowModal } from '../types';

export const createMockData = (
  length: number = 50
): ServerDataWithShowModal[] => {
  return createServerData(length).map(
    (s: ServerData): ServerDataWithShowModal => {
      return {
        ...s,
        id: shortid.generate(),
        showModal: faker.random.boolean()
      };
    }
  );
};
