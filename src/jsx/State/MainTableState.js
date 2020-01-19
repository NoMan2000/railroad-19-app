// @flow
import * as React from 'react';
import shortid from 'shortid';
import { DEFAULT_FORMAT, moment } from '../../js/time';
import type { ServerDataWithShowModal } from './../../types';
import { ASC, DESC, NONE } from '../MainTable/MainTable';

type Props = {
  data: ServerDataWithShowModal[]
};

export const MainTableState = (props: Props) => {
  const addedModals: ServerDataWithShowModal[] = props.data.map(d => {
    const id = d.id || shortid.generate();
    return { ...d, showModal: false, id };
  });
  const [
    orderedData: ServerDataWithShowModal,
    orderedDataUpdate
  ] = React.useState<ServerDataWithShowModal[]>(addedModals);
  const [directions, updateDirections] = React.useState({
    title: NONE,
    division: NONE,
    project_owner: NONE,
    status: NONE,
    budget: NONE,
    created: NONE,
    modified: NONE,
    clickedOrder: []
  });

  const clickHandler = async (e: SyntheticInputEvent<*>) => {
    const { dataset } = e.currentTarget;
    const { name, direction } = dataset;
    let { clickedOrder } = directions;
    let newDirection = '';
    if (direction === ASC) {
      newDirection = DESC;
    } else if (direction === DESC) {
      newDirection = NONE;
    } else if (direction === NONE) {
      newDirection = ASC;
    }
    if (!clickedOrder.find(order => order === name)) {
      if (newDirection === NONE) {
        clickedOrder = clickedOrder.filter(function(order) {
          return order !== name;
        });
      } else {
        clickedOrder.unshift(name);
      }
    }
    const newDirections = { ...directions, [name]: newDirection, clickedOrder };
    await updateDirections(newDirections);
    const createSort = (
      name: string,
      a: ServerDataWithShowModal,
      b: ServerDataWithShowModal
    ) => {
      const direction = newDirections[name];
      if (direction === ASC) {
        if (name === 'modified' || name === 'created') {
          return moment(a[name], DEFAULT_FORMAT).isBefore(b[name]) ? -1 : 1;
        }
        if (name === 'budget') {
          return a[name] > b[name] ? 1 : -1;
        }
        return a[name].localeCompare(b[name]);
      }
      if (direction === DESC) {
        if (name === 'modified' || name === 'created') {
          return moment(b[name], DEFAULT_FORMAT).isBefore(a[name]) ? -1 : 1;
        }
        if (name === 'budget') {
          return a[name] < b[name] ? 1 : -1;
        }
        return b[name].localeCompare(a[name]);
      }
      return 0;
    };

    const newOrderedData = [...orderedData].sort((a, b) => {
      const [
        first,
        second,
        third,
        fourth,
        fifth,
        sixth,
        seventh
      ] = clickedOrder;
      const firstSort = createSort(first, a, b);
      const secondSort = createSort(second, a, b);
      const thirdSort = createSort(third, a, b);
      const fourthSort = createSort(fourth, a, b);
      const fifthSort = createSort(fifth, a, b);
      const sixthSort = createSort(sixth, a, b);
      const seventhSort = createSort(seventh, a, b);
      if (firstSort) {
        return firstSort;
      }
      if (secondSort) {
        return secondSort;
      }
      if (thirdSort) {
        return thirdSort;
      }
      if (fourthSort) {
        return fourthSort;
      }
      if (fifthSort) {
        return fifthSort;
      }
      if (sixthSort) {
        return sixthSort;
      }
      if (seventhSort) {
        return seventhSort;
      }
      return 0;
    });
    await orderedDataUpdate(newOrderedData);
  };

  const modalClick = async (e: SyntheticEvent<*>) => {
    const { dataset } = e.currentTarget;
    const { id } = dataset;
    const newOrderedData = orderedData.map(order => {
      if (order.id === id) {
        return { ...order, showModal: !order.showModal };
      }
      const showModal = order.showModal || false;
      return { ...order, showModal };
    });
    await orderedDataUpdate(newOrderedData);
  };

  const changeInputInline = (name: string, id: string) => {
    return async (value: string) => {
      let newValue = value;
      if (name === 'budget') {
        newValue = parseFloat(value);
      }
      const newOrderedData = orderedData.map(order => {
        const showModal = order.showModal || false;
        if (order.id === id) {
          return { ...order, [name]: newValue, showModal };
        }
        return { ...order, showModal };
      });
      await orderedDataUpdate(newOrderedData);
    };
  };
  return {
    directions,
    orderedData,
    orderedDataUpdate,
    changeInputInline,
    modalClick,
    clickHandler,
    originalData: props.data
  };
};
