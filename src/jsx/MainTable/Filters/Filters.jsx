// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Classes, Drawer, Position } from '@blueprintjs/core';
import { colors } from '../../../js/colors';
import { DateDropdown } from '../FormElements/DateDropdown';
import { PrimaryButton } from '../FormElements/Buttons/PrimaryButton';
import { FiltersState } from '../../State/FiltersState';
import Select from 'react-select';
import type { ServerDataWithShowModal } from '../../../types';

type Props = {
  data: ServerDataWithShowModal[],
  filtersOpen: boolean,
  toggleFiltersOpen: Function,
  orderedDataUpdate: Function
};

export const FilterContainer = styled('div')`
  margin: 22px 0;
`;

export const DivWrapper = styled('div')`
  background: ${props => props.background || colors.blue.dark};
  color: ${colors.black.dark};
  text-transform: uppercase;
  a {
    color: ${colors.black.dark};
    &:hover {
      color: ${colors.black.dark};
    }
  }
  z-index: 20;
`;

export const WhiteLabel = styled('label')`
  color: ${colors.white.primary};
`;

export const SelectReformatted = styled(Select)`
  option: {
    background: ${colors.blue.dark};
    color: ${colors.black.dark};
    cursor: pointer;
  }
  max-width: 100%;
  min-width: ${props =>
    // $FlowFixMe
    props.minWidth || '19%'};
  font-size: ${props =>
    // $FlowFixMe
    props.fontSize};
  margin-right: 1%;
`;

const ButtonWithSpacing = styled(PrimaryButton)`
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const Filters = (props: Props) => {
  const {
    statuses,
    projectOwners,
    titles,
    modifiedEndDate,
    modifiedStartDate,
    updateModifiedStartDate,
    updateModifiedEndDate,
    downloadCSV,
    downloadPDF,
    updateCreatedStartDate,
    updateCreatedEndDate,
    createdEndDate,
    createdStartDate,
    showCreatedCalendar,
    showUpdatedCalendar,
    performFiltering
  } = FiltersState(props.data);

  const [selectedStatuses, updateSelectedStatuses] = React.useState();
  const [selectedProjectOwners, updateSelectedProjectOwners] = React.useState();
  const [selectedTitles, updateSelectedTitles] = React.useState();

  const { filtersOpen, toggleFiltersOpen, orderedDataUpdate } = props;

  const filter = () => {
    performFiltering({
      selectedStatuses,
      selectedProjectOwners,
      selectedTitles,
      orderedDataUpdate
    }).then(() => {
      toggleFiltersOpen();
    });
  };

  return (
    <Drawer
      autoFocus={false}
      enforceFocus={false}
      className="project-dashboard-filters"
      position={Position.RIGHT}
      canOutsideClickClose={true}
      isOpen={filtersOpen}
      onClose={toggleFiltersOpen}
      hasBackdrop={true}
      usePortal={false}
      size="400px"
    >
      <DivWrapper className={Classes.DRAWER_BODY}>
        <div className={Classes.DIALOG_BODY}>
          <FilterContainer>
            <WhiteLabel>{`Filter by Project Owner:`}</WhiteLabel>
            <SelectReformatted
              isMulti={true}
              className={`project-dashboard-dropdown`}
              isSearchable={true}
              onChange={updateSelectedProjectOwners}
              placeholder={'Enter or Select Project Owner'}
              options={projectOwners}
              defaultValue={selectedProjectOwners}
              value={selectedProjectOwners}
            />
          </FilterContainer>
          <FilterContainer>
            <WhiteLabel>{`Filter by Status:`}</WhiteLabel>
            <SelectReformatted
              isMulti={true}
              className={`project-dashboard-dropdown`}
              isSearchable={true}
              onChange={updateSelectedStatuses}
              placeholder={'Enter or Select Status'}
              options={statuses}
              defaultValue={selectedStatuses}
              value={selectedStatuses}
            />
          </FilterContainer>

          <FilterContainer>
            <WhiteLabel>{`Filter by Titles:`}</WhiteLabel>
            <SelectReformatted
              isMulti={true}
              className={`project-dashboard-dropdown`}
              isSearchable={true}
              onChange={updateSelectedTitles}
              placeholder={'Enter or Select Title'}
              options={titles}
              defaultValue={selectedTitles}
              value={selectedTitles}
            />
          </FilterContainer>
          <FilterContainer>
            <WhiteLabel>Created Start Date:</WhiteLabel>
            <DateDropdown
              sideBar
              showIcon
              Border="1px solid hsl(0,0%,80%)"
              grid={'date-class'}
              handleChange={updateCreatedStartDate}
              label={'Filter Created At Start Date:'}
              marginTop="0"
              name={'createdStartDate'}
              value={createdStartDate}
              displayValue={createdStartDate}
              hideLabel={false}
              height="auto"
              display="block"
              right="300px"
              placement="BOTTOM_RIGHT"
              showPresets={false}
              showCalendar={showCreatedCalendar === 'start'}
            />
          </FilterContainer>
          <FilterContainer>
            <WhiteLabel>Created End Date</WhiteLabel>
            <DateDropdown
              sideBar
              Border="1px solid hsl(0,0%,80%)"
              showIcon
              grid={'date-class'}
              handleChange={updateCreatedEndDate}
              label={'Filter Modified by End Date:'}
              name={'createdEndDate'}
              value={createdEndDate}
              displayValue={createdEndDate}
              marginTop="0"
              minDate={createdStartDate}
              hideLabel={false}
              height="auto"
              display="block"
              right="300px"
              placement="BOTTOM_RIGHT"
              showPresets={false}
              showCalendar={showCreatedCalendar === 'end'}
            />
          </FilterContainer>
          <FilterContainer>
            <WhiteLabel>Modified By Start Date</WhiteLabel>
            <DateDropdown
              sideBar
              showIcon
              Border="1px solid hsl(0,0%,80%)"
              grid={'date-class'}
              handleChange={updateModifiedStartDate}
              label={'Filter Modified by Start Date:'}
              marginTop="0"
              name={'modifiedStartDate'}
              value={modifiedStartDate}
              displayValue={modifiedStartDate}
              hideLabel={false}
              height="auto"
              display="block"
              right="300px"
              placement="BOTTOM_RIGHT"
              showPresets={false}
              showCalendar={showUpdatedCalendar === 'start'}
            />
          </FilterContainer>
          <FilterContainer>
            <WhiteLabel>Modified By End Date</WhiteLabel>
            <DateDropdown
              sideBar
              Border="1px solid hsl(0,0%,80%)"
              showIcon
              grid={'date-class'}
              handleChange={updateModifiedEndDate}
              label={'Filter Modified by End Date:'}
              name={'modifiedEndDate'}
              value={modifiedEndDate}
              displayValue={modifiedEndDate}
              marginTop="0"
              minDate={modifiedStartDate}
              hideLabel={false}
              height="auto"
              display="block"
              right="300px"
              placement="BOTTOM_RIGHT"
              showPresets={false}
              showCalendar={showUpdatedCalendar === 'end'}
            />
          </FilterContainer>
          <FilterContainer>
            <ButtonWithSpacing
              data-test={'filter-values'}
              onClick={filter}
              value={'FILTER VALUES'}
            />
            <ButtonWithSpacing
              data-test="download-csv"
              onClick={downloadCSV}
              value={'DOWNLOAD .CSV'}
            />
            <ButtonWithSpacing
              data-test="download-pdf"
              onClick={downloadPDF}
              value={'DOWNLOAD .PDF'}
            />
          </FilterContainer>
        </div>
      </DivWrapper>
    </Drawer>
  );
};
