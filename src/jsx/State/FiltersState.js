// @flow
import * as React from 'react';
import type { ServerDataWithShowModal } from '../../types';
import { AppToaster } from '../Misc/AppToaster';
import { moment, DEFAULT_FORMAT } from './../../js/time';
import type { OptionsType, OptionType } from 'react-select/src/types';
import uniq from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';

export const FiltersState = (data: ServerDataWithShowModal[]) => {
  const initialStatuses: OptionsType = uniq(
    data.map((d: ServerDataWithShowModal): OptionType => {
      return { label: d.status, value: d.status };
    }),
    isEqual
  );
  const initialProjectOwners: OptionsType = uniq(
    data.map((d: ServerDataWithShowModal): OptionType => {
      return { label: d.project_owner, value: d.project_owner };
    }),
    isEqual
  );
  const initialTitles: OptionsType = uniq(
    data.map((d: ServerDataWithShowModal): OptionType => {
      return { label: d.title, value: d.title };
    }),
    isEqual
  );
  const [statuses: OptionsType, updateStatuses] = React.useState<OptionsType>(
    initialStatuses
  );
  const [
    projectOwners: OptionsType,
    updateProjectOwners
  ] = React.useState<OptionsType>(initialProjectOwners);
  const [titles: OptionsType[], updateTitles] = React.useState<OptionsType[]>(
    initialTitles
  );
  const [
    showUpdatedCalendar,
    changeShowUpdatedCalendar
  ] = React.useState<boolean>(false);
  const [
    showCreatedCalendar,
    changeShowCreatedCalendar
  ] = React.useState<boolean>(false);
  const [modifiedStartDate, changeModifiedStartDate] = React.useState<?Date>();
  const [modifiedEndDate, changeModifiedEndDate] = React.useState<Date>(
    new Date()
  );
  const [createdStartDate, changeCreatedStartDate] = React.useState<?Date>();
  const [createdEndDate, changeCreatedEndDate] = React.useState<Date>(
    new Date()
  );

  const updateShowUpdatedCalendar = (show: boolean) => {
    changeShowUpdatedCalendar(show);
  };
  const updateShowCreatedCalendar = (show: boolean) => {
    changeShowCreatedCalendar(show);
  };
  const updateCreatedStartDate = (name: string, date: Date) => {
    changeCreatedStartDate(date);
  };
  const updateCreatedEndDate = (name: string, date: Date) => {
    changeCreatedEndDate(date);
  };
  const updateModifiedStartDate = (name: string, date: Date) => {
    changeModifiedStartDate(date);
  };
  const updateModifiedEndDate = (name: string, date: Date) => {
    changeModifiedEndDate(date);
  };

  const downloadCSV = () => {
    AppToaster.success('Downloaded CSV!');
  };

  const downloadPDF = () => {
    AppToaster.success('Downloaded PDF!');
  };

  const performFiltering = async (filterData: {
    selectedStatuses?: OptionsType,
    selectedProjectOwners?: OptionsType,
    selectedTitles?: OptionsType,
    orderedDataUpdate: Function
  }) => {
    const {
      selectedStatuses,
      selectedProjectOwners,
      selectedTitles,
      orderedDataUpdate
    } = filterData;
    let mutatableData = [];
    if (selectedStatuses) {
      const newStatuses = data.filter(d =>
        selectedStatuses.find(v => d.status === v.value)
      );
      mutatableData = mutatableData.concat(newStatuses);
    }
    if (selectedProjectOwners) {
      const newProjectOwners = data.filter(d =>
        selectedProjectOwners.find(v => d.project_owner === v.value)
      );
      mutatableData = mutatableData.concat(newProjectOwners);
    }
    if (selectedTitles) {
      const newTitles = data.filter(d =>
        selectedTitles.find(v => d.title === v.value)
      );
      mutatableData = mutatableData.concat(newTitles);
    }
    // TODO:  Can extract most of this out.
    if (modifiedStartDate && modifiedEndDate) {
      const modifiedDates = data.filter(v =>
        moment(v.modified, DEFAULT_FORMAT).isBetween(
          modifiedStartDate.toISOString(),
          modifiedEndDate.toISOString()
        )
      );
      mutatableData = mutatableData.concat(modifiedDates);
    }
    // else if (modifiedStartDate) {
    //   const modifiedDates = data.filter(v =>
    //     moment(v.modified, DEFAULT_FORMAT).isAfter(
    //       modifiedStartDate.toISOString()
    //     )
    //   );
    //   mutatableData = mutatableData.concat(modifiedDates);
    // } else if (modifiedEndDate) {
    //   const modifiedDates = data.filter(v =>
    //     moment(v.modified, DEFAULT_FORMAT).isBefore(
    //       modifiedEndDate.toISOString()
    //     )
    //   );
    //   mutatableData = mutatableData.concat(modifiedDates);
    // }
    if (createdStartDate && createdEndDate) {
      const modifiedDates = data.filter(v =>
        moment(v.created, DEFAULT_FORMAT).isBetween(
          createdStartDate.toISOString(),
          createdEndDate.toISOString()
        )
      );
      mutatableData = mutatableData.concat(modifiedDates);
    }
    // else if (createdStartDate) {
    //   const modifiedDates = data.filter(v =>
    //     moment(v.created, DEFAULT_FORMAT).isAfter(
    //       createdStartDate.toISOString()
    //     )
    //   );
    //   mutatableData = mutatableData.concat(modifiedDates);
    // } else if (createdEndDate) {
    //   const modifiedDates = data.filter(v =>
    //     moment(v.created, DEFAULT_FORMAT).isBefore(createdEndDate.toISOString())
    //   );
    //   mutatableData = mutatableData.concat(modifiedDates);
    // }
    mutatableData = uniq(mutatableData, isEqual);

    await orderedDataUpdate(mutatableData);
  };

  return {
    statuses,
    updateStatuses,
    projectOwners,
    updateProjectOwners,
    titles,
    updateTitles,
    downloadCSV,
    downloadPDF,
    showUpdatedCalendar,
    updateShowUpdatedCalendar,
    showCreatedCalendar,
    updateShowCreatedCalendar,
    modifiedEndDate,
    modifiedStartDate,
    updateModifiedEndDate,
    updateModifiedStartDate,
    createdStartDate,
    updateCreatedStartDate,
    createdEndDate,
    updateCreatedEndDate,
    performFiltering
  };
};
FiltersState.defaultProps = {
  data: []
};
