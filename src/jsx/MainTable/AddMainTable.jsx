// @flow

import * as React from 'react';
import { Classes, InputGroup } from '@blueprintjs/core';
import styled from 'styled-components';
import shortid from 'shortid';
import { toBrowserTimeFormat, formatFromBrowserTime } from './../../js/time';
import './AddMainTable.scss';
import type { ServerDataWithShowModal } from '../../types';

const FlexColumn = styled('div')`
  display: flex;
  flex-direction: column;
`;

const BaseGrid = styled('div')`
  display: grid;
  grid-template-columns: 25% 72%;
  padding: 10px 5px;
`;

const Label = styled('label')``;

type Props = {
  onExit: Function
};

const upperCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const AddMainTable = (props: Props) => {
  const [
    data: ServerDataWithShowModal,
    updateData
  ] = React.useState<ServerDataWithShowModal>({
    title: '',
    division: '',
    project_owner: '',
    status: '',
    budget: 0,
    created: '',
    modified: '',
    id: '',
    showModal: false
  });
  const onChange = (e: SyntheticInputEvent<*>) => {
    const { value, name }: { name: string, value: any } = e.currentTarget;
    let newValue = value;
    if (name === 'created' || name === 'modified') {
      newValue = formatFromBrowserTime(value);
    }
    const id = data.id || shortid.generate();
    const showModal = data.showModal || false;
    const newData = { ...data, [name]: newValue, id, showModal };

    updateData(newData);
  };
  const onClickSubmit = (e: SyntheticEvent<*>) => {
    alert('In the future, this will do something!');
    props.onExit(e);
  };

  return (
    <section data-test={'add-main-table'} className={'add-main-table'}>
      <FlexColumn>
        <h4 className={Classes.DIALOG_HEADER}>Add New Record</h4>
        <div>
          {Object.keys(data).map(key => {
            const isDate = key === 'modified' || key === 'created';
            return (
              <BaseGrid key={key}>
                <Label>
                  <b>{upperCase(key)}</b>:
                </Label>
                <InputGroup
                  required={true}
                  onChange={onChange}
                  name={key}
                  type={isDate ? 'date' : 'text'}
                  value={isDate ? toBrowserTimeFormat(new Date()) : data[key]}
                />
              </BaseGrid>
            );
          })}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <span
              onClick={props.onExit}
              data-test={'add-main-table-cancel'}
              className={Classes.BUTTON}
            >
              <span className={Classes.BUTTON_TEXT}>Cancel</span>
            </span>
            <button
              data-test={'add-main-table-submit'}
              type="submit"
              onClick={onClickSubmit}
              className="bp3-button bp3-intent-primary"
            >
              Confirm
            </button>
          </div>
        </div>
      </FlexColumn>
    </section>
  );
};
