// @flow
import faker from 'faker';
import { dateInPast, convertToHumanReadable } from './serverTime';
import type { ServerData } from '../types';

export const createServerData = (length: number): ServerData[] => {
  return Array.from({ length }).map((): ServerData => {
    const months = faker.random.number({ min: 0, max: 12 });
    const days = faker.random.number({ min: 0, max: 28 });
    const futureDate = dateInPast({
      months,
      days
    });
    const pastDate = dateInPast({
      months: faker.random.number({ min: months, max: 12 }),
      days: faker.random.number({ min: days, max: 28 })
    });

    return {
      title: faker.name.title(),
      division: faker.commerce.department(),
      project_owner: faker.name.findName(),
      budget: Number(faker.commerce.price()),
      status: faker.random.arrayElement(['active', 'inactive', 'completed']),
      created: convertToHumanReadable(pastDate), // MM/DD/YYYY
      modified: convertToHumanReadable(futureDate) // MM/DD/YYYY
    };
  });
};

export const createData = () => {
  const length = Number(process.env.TOTAL_DATA) || 50;
  const serverData = createServerData(length);
  return {
    serverData
  };
};
