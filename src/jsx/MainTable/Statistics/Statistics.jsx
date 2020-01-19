// @flow
import * as React from 'react';
import type {
  Totals,
  FirstPhase,
  ServerDataWithShowModal
} from '../../../types';
type Props = {
  data: ServerDataWithShowModal[]
};

export const Statistics = (props: Props) => {
  let counts: Totals = {};
  // $FlowFixMe
  const totals: Totals = props.data
    .map((data: ServerDataWithShowModal) => {
      Object.keys(data).forEach((c: $Keys<ServerDataWithShowModal>) => {
        counts[c] = counts[c] || {};
        counts[c][data[c]] = (counts[c][data[c]] || 0) + 1;
      });
      // $FlowFixMe
      return { ...counts };
    })
    .reduce((accumulator, current: FirstPhase) => {
      Object.keys(current).map((c: $DownCast) => {
        const max = Math.max(...(Object.values(current[c]): $DownCast));
        const name = Object.keys(current[c]).find(currentKey => {
          return current[c][currentKey] === max;
        });
        accumulator = {
          ...accumulator,
          [c]: {
            max,
            name
          }
        };
      });
      return accumulator;
    }, {});

  if (Object.values(totals).length === 0) {
    return null;
  }
  return (
    <section data-test={'statistics'} className={'statistics'}>
      <h3>Statistics</h3>
      <div>
        <div>
          The most active project owner is{' '}
          {totals.project_owner.max === 1 ? (
            <span data-test={'statistics-project-owner'}>
              no one! Everyone is assigned the same number of projects!
            </span>
          ) : (
            <span data-test={'statistics-project-owner'}>
              {totals.project_owner.name}
            </span>
          )}
        </div>
        <div>
          The most common budget is{' '}
          {totals.budget.max === 1 ? (
            <span data-test={'statistics-budget'}>
              we all have the same budget!
            </span>
          ) : (
            <span data-test={'statistics-budget'}>${totals.budget.name}</span>
          )}
        </div>
        <div>
          The most active division is{' '}
          {totals.division.max === 1 ? (
            <span data-test={'statistics-division'}>
              none of them! Everyone is working equally hard!
            </span>
          ) : (
            <span data-test={'statistics-division'}>totals.division.name</span>
          )}
        </div>
        <div>
          The most common status is{' '}
          {totals.status.max === 1 ? (
            <span data-test={'statistics-status'}>they&apos;re all equal!</span>
          ) : (
            <span data-test={'statistics-status'}>{totals.status.name}</span>
          )}
        </div>
      </div>
    </section>
  );
};
