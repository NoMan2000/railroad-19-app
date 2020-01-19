// @flow

import * as React from 'react';
import styled from 'styled-components';
import { colors, hex2rgba } from '../../js/colors';
import { Dialog, EditableText } from '@blueprintjs/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faInfo, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddMainTable } from './AddMainTable';
import { MainTableState } from '../State/MainTableState';
import { SetIcons } from './SetIcons';
import { AppToaster } from '../Misc/AppToaster';
import { Csv } from './Csv';
import { Pdf } from './Pdf';
import { Filters } from './Filters/Filters';
import './MainTable.scss';
import { EditMainTable } from './EditMainTable';
import { Statistics } from './Statistics/Statistics';
import type { ServerDataWithShowModal } from '../../types';

type Props = {
  data: ServerDataWithShowModal[]
};

const Section = styled('section')``;

const BaseGrid = styled('div')`
  display: grid;
  grid-template-columns: 20% repeat(7, calc(80% / 7));
  padding: 10px 5px;
`;

const HeaderGrid = styled(BaseGrid)``;

const TableGrid = styled(BaseGrid)`
  :nth-child(even) {
    background: ${hex2rgba(colors.blue.light, 0.2)};
  }
`;

const MainWrapper = styled('div')``;

const ClickableB = styled('b')`
  &:hover {
    cursor: pointer;
  }
  position: relative;
`;

const ClickableSpan = styled('span')`
  cursor: pointer;
  position: relative;
  color: ${colors.red.red};
`;

const Flex = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
`;

const ClickableH2 = styled('h2')`
  &:hover {
    cursor: pointer;
  }
`;

export const NONE = 'NONE';
export const ASC = 'ASC';
export const DESC = 'DESC';

export const MainTable = (props: Props) => {
  const {
    clickHandler,
    directions,
    orderedData,
    orderedDataUpdate,
    changeInputInline,
    modalClick,
    originalData
  } = MainTableState(props);
  const [showAdd, updateShowAdd] = React.useState(false);
  const [showFilters, updateShowFilters] = React.useState(false);
  const toggleShowAdd = () => {
    updateShowAdd(!showAdd);
  };
  const toggleShowFilters = () => {
    updateShowFilters(!showFilters);
  };
  const confirmChange = (value: string) => {
    AppToaster.success(`changed value to ${value}`);
  };
  return (
    <>
      <Section className={'main-table'}>
        <Flex>
          <ClickableH2 onClick={toggleShowFilters}>
            Filter Data:{' '}
            <FontAwesomeIcon
              style={{
                color: colors.blue.medium,
                cursor: 'pointer'
              }}
              icon={faFilter}
            />
          </ClickableH2>
          <Csv />
          <Pdf />
          <ClickableH2
            style={{ marginRight: '10px' }}
            data-test={'add-new-record'}
            onClick={toggleShowAdd}
          >
            Add New:{' '}
            <FontAwesomeIcon style={{ color: colors.red.dark }} icon={faPlus} />
          </ClickableH2>
          <Dialog isOpen={showAdd}>
            <AddMainTable onExit={toggleShowAdd} />
          </Dialog>
        </Flex>
        <Flex>
          <Statistics data={props.data} />
        </Flex>
        <HeaderGrid>
          <ClickableB
            data-name={'title'}
            data-direction={directions.title}
            onClick={clickHandler}
          >
            Title <SetIcons name={'title'} direction={directions.title} />
          </ClickableB>
          <ClickableB
            data-name={'division'}
            data-direction={directions.division}
            onClick={clickHandler}
          >
            Division{' '}
            <SetIcons name={'division'} direction={directions.division} />
          </ClickableB>
          <ClickableB
            data-name={'project_owner'}
            data-direction={directions.project_owner}
            onClick={clickHandler}
          >
            Project Owner{' '}
            <SetIcons
              name={'project_owner'}
              direction={directions.project_owner}
            />
          </ClickableB>
          <ClickableB
            data-name={'status'}
            data-direction={directions.status}
            onClick={clickHandler}
          >
            Status <SetIcons name={'status'} direction={directions.status} />
          </ClickableB>
          <ClickableB
            data-name={'budget'}
            data-direction={directions.budget}
            onClick={clickHandler}
          >
            Budget <SetIcons name={'budget'} direction={directions.budget} />{' '}
          </ClickableB>
          <ClickableB
            data-name={'created'}
            data-direction={directions.created}
            onClick={clickHandler}
          >
            Created <SetIcons name={'created'} direction={directions.created} />
          </ClickableB>
          <ClickableB
            data-name={'modified'}
            data-direction={directions.modified}
            onClick={clickHandler}
          >
            Modified{' '}
            <SetIcons
              name={'modified'}
              direction={directions.modified}
              right={'40%'}
            />
          </ClickableB>
          <b>More info</b>
        </HeaderGrid>
        <MainWrapper>
          {orderedData.map((prop: ServerDataWithShowModal, idx: number) => {
            return (
              <React.Fragment key={prop.id}>
                <TableGrid id={prop.id}>
                  <span>{prop.title}</span>
                  <span>{prop.division}</span>
                  <span data-test={`project_owner-${idx}`}>
                    <EditableText
                      onConfirm={confirmChange}
                      value={prop.project_owner}
                      onChange={changeInputInline('project_owner', prop.id)}
                    />
                  </span>
                  <span data-test={`status-${idx}`}>
                    <EditableText
                      value={prop.status}
                      onConfirm={confirmChange}
                      onChange={changeInputInline('status', prop.id)}
                    />
                  </span>
                  <span data-test={`budget-${idx}`}>
                    <EditableText
                      onConfirm={confirmChange}
                      value={prop.budget}
                      onChange={changeInputInline('budget', prop.id)}
                      type={'number'}
                    />
                  </span>
                  <span>{prop.created}</span>
                  <span>{prop.modified}</span>
                  <ClickableSpan
                    data-test={`showModal-${idx}`}
                    data-id={prop.id}
                    onClick={modalClick}
                  >
                    <FontAwesomeIcon icon={faInfo} />
                  </ClickableSpan>
                </TableGrid>
                <Dialog isOpen={prop.showModal}>
                  <EditMainTable data={prop} onExit={modalClick} />
                </Dialog>
              </React.Fragment>
            );
          })}
        </MainWrapper>
      </Section>
      <Filters
        orderedDataUpdate={orderedDataUpdate}
        toggleFiltersOpen={toggleShowFilters}
        filtersOpen={showFilters}
        data={originalData}
      />
    </>
  );
};
