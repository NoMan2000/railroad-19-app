// @flow

import * as React from 'react';
import { Classes, InputGroup } from '@blueprintjs/core';
import styled from 'styled-components';
import type { ServerDataWithShowModal } from './../../types';

const FlexColumn = styled('div')`
  display: flex;
  flex-direction: column;
`;

const BaseGrid = styled('div')`
  display: grid;
  grid-template-columns: 25% 72%;
  padding: 10px 5px;
`;

type Props = {
  onExit: (e: SyntheticEvent<*>) => {},
  data: ServerDataWithShowModal
};

export const EditMainTable = (prop: Props) => {
  return (
    <section className={'edit-main-table'}>
      <FlexColumn>
        <h4
          data-test={'edit-main-table-deeper-information'}
          className={Classes.DIALOG_HEADER}
        >
          Deeper Information
        </h4>
        <div>
          {Object.keys(prop.data).map(key => {
            return (
              <BaseGrid key={key}>
                <label>
                  <b>{key}</b>:
                </label>
                <InputGroup readOnly value={prop.data[key]} />
              </BaseGrid>
            );
          })}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <button
              type="button"
              data-id={prop.data.id}
              onClick={prop.onExit}
              className={`${Classes.BUTTON} ${Classes.INTENT_PRIMARY}`}
            >
              Exit
            </button>
          </div>
        </div>
      </FlexColumn>
    </section>
  );
};
