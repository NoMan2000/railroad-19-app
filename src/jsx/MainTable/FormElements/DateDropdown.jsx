// @flow
import * as React from 'react';
import { Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import {
  faChevronDown,
  faTimes
} from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DateDropdown.scss';
import colors from '../../../js/colors';

export type DateDropdownProps = {
  displayValue?: ?string | ?number | ?Date,
  minDate?: ?Date,
  maxDate?: ?Date,
  minWidth?: string,
  fontSize?: string,
  name: string,
  handleChange: Function,
  placeholder: string,
  placement: string,
  readOnly?: boolean,
  showCalendar?: boolean,
  value?: ?Date,
  showIcon?: boolean,
  Background?: string,
  Border?: string,
  className: string,
  Color?: string,
  showPresets?: boolean,
  selectedDateRangePreset?: string,
  onSelectedDateRangePresetChange?: Function
};

type State = {
  isOpen: boolean
};

export const selectors = {
  oneYear: {
    id: 'date-dropdown-one-year',
    selector: "[data-test='date-dropdown-one-year']"
  },
  threeMonths: {
    id: 'date-dropdown-three-months',
    selector: "[data-test='date-dropdown-three-months']"
  },
  thisMonth: {
    id: 'date-dropdown-this-month',
    selector: "[data-test='date-dropdown-this-month']"
  }
};

export const FlexRow = styled('div')`
  display: flex;
  flex-wrap: ${props => props.Wrap || 'wrap'};
  width: ${props => props.Width || '100%'};
  padding-top: ${props => props.paddingTop || '0'};
  justify-content: ${props => props.Justify};
  align-content: ${props => props.Align};
  align-items: ${props => props.AlignItems};
`;

export const IndicatorSeparator = styled('span')`
  -webkit-align-self: stretch;
  -ms-flex-item-align: stretch;
  align-self: stretch;
  background-color: hsl(0, 0%, 80%);
  margin-bottom: 8px;
  margin-top: 8px;
  padding-right: 1px;
  width: 1px;
  box-sizing: border-box;
`;

export const FontAwesomeSizedIcon = styled(FontAwesomeIcon)`
  color: ${props => props.color || colors.white.primary};
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin || '0px'};
  &:hover {
    cursor: ${props => props.cursor};
  }
`;

export const Container = styled('div')`
  background: ${props =>
    // $FlowFixMe
    props.Background || colors.blue.medium};
  color: ${props => props.Color || colors.white.primary};
  border: ${props => props.Border || 'none'};
  border-radius: 4px;
  font-size: 16px;
  min-width: ${props => props.minWidth};
  input {
    font-size: ${props =>
      props.fontSize ? `${props.fontSize} !important` : undefined};
    margin-top: ${props => (props.fontSize ? '2px' : undefined)};
  }
  max-width: 240px;
`;
export const Input = styled('input')`
  background: ${props => props.Background || colors.blue.medium};
  color: ${props => props.Color || colors.white.primary};
  &:read-only,
  &::placeholder,
  &:disabled {
    background: ${props => props.Background || colors.blue.medium};
    color: ${props => props.Color || colors.white.primary};
  }
  &:hover {
    cursor: pointer;
  }
`;

export const DateDropdown = (props: DateDropdownProps) => {
  const [dateDropdownState: State, updateState] = React.useState({
    isOpen: false
  });

  const handleInteraction = (nextOpenState: boolean) => {
    updateState({ isOpen: nextOpenState });
  };

  const onChange = (date: Date) => {
    props.handleChange(props.name, date);
    updateState({ isOpen: false });
  };

  const clear = (e: SyntheticEvent<*>) => {
    e.stopPropagation();
    props.handleChange(props.name, undefined);
    updateState({ isOpen: false });
  };
  const { isOpen } = dateDropdownState;
  const {
    Background,
    Border,
    className,
    Color,
    displayValue,
    maxDate,
    minDate,
    name,
    placeholder,
    placement,
    value,
    showIcon,
    showPresets,
    minWidth,
    fontSize
  } = props;
  const inputValue = displayValue || value || '';
  return (
    <Container
      fontSize={fontSize || ''}
      minWidth={minWidth || ''}
      className="date-dropdown"
      Background={Background}
      Border={Border}
      Color={Color}
    >
      <Popover
        className={`${className} date-dropdown`}
        popoverClassName={
          showPresets ? className + ' date-dropdown presets' : ' date-dropdown'
        }
        minimal
        PopperBoundary="scrollParent"
        modifiers={{
          flip: { enabled: false },
          preventOverflow: { enabled: false }
        }}
        interactionKind={PopoverInteractionKind.CLICK}
        isOpen={isOpen}
        onInteraction={state => handleInteraction(state)}
        position={Position[placement]}
        content={
          <>
            <Calendar
              onChange={onChange}
              value={value || ''}
              minDate={minDate}
              maxDate={maxDate}
            />
          </>
        }
      >
        <FlexRow Wrap="nowrap">
          <Input
            Background={Background}
            Color={Color}
            size={'13'}
            type={'text'}
            className="form-control"
            name={name}
            value={inputValue}
            placeholder={placeholder}
            readOnly
          />
          {value && (
            <FontAwesomeSizedIcon
              icon={faTimes}
              fontSize="14px"
              margin="12px"
              onClick={clear}
            />
          )}
          {showIcon && (
            <>
              <IndicatorSeparator />
              <FontAwesomeSizedIcon
                icon={faChevronDown}
                fontSize="14px"
                margin="12px"
              />
            </>
          )}
        </FlexRow>
      </Popover>
    </Container>
  );
};

DateDropdown.defaultProps = {
  minDate: null,
  maxDate: new Date(),
  placeholder: 'Select Date',
  placement: 'BOTTOM_LEFT',
  readOnly: false,
  showCalendar: false,
  value: null,
  className: 'date-dropdown'
};
