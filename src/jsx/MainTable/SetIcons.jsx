// @flow
import * as React from 'react';
import {
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons/index';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../../js/colors';
import { ASC, DESC, NONE } from './MainTable';

type Props = {
  name: string,
  direction: string,
  right?: string
};

const FontAwesomeSizedIcon = styled(FontAwesomeIcon)`
  color: ${props => props.color || colors.black.dark};
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin || '0px'};
  &:hover {
    cursor: ${props => props.cursor};
  }
`;

const FontAwesomeChevronTop = styled(FontAwesomeSizedIcon)`
  position: absolute;
  right: ${props => props.right || '10%'};
  top: 0;
  font-size: 10px;
`;

const FontAwesomeChevronBottom = styled(FontAwesomeSizedIcon)`
  position: absolute;
  right: ${props => props.right || '10%'};
  bottom: 0;
  font-size: 10px;
`;

export const SetIcons = (props: Props) => {
  const { direction, name, right } = props;

  if (direction === DESC) {
    return (
      <span data-name={name} data-direction={direction} className={DESC}>
        <FontAwesomeChevronBottom right={right} icon={faChevronDown} />
      </span>
    );
  }
  if (direction === ASC) {
    return (
      <span data-name={name} data-direction={direction} className={ASC}>
        <FontAwesomeChevronTop right={right} icon={faChevronUp} />
      </span>
    );
  }
  return (
    <span className={NONE}>
      <FontAwesomeChevronTop
        right={right}
        key={`${name} up`}
        icon={faChevronUp}
      />
      <FontAwesomeChevronBottom
        right={right}
        key={`${name} down`}
        icon={faChevronDown}
      />
    </span>
  );
};
