// @flow
import * as React from 'react';
import { BasicButton } from './BasicButton.jsx';
import PropTypes from 'prop-types';
import { colors } from '../../../../js/colors';

type Props = {
  value: string,
  onClick: Function,
  width?: string,
  height?: string,
  outline?: string,
  color: string,
  background: string,
  onMouseEnter?: Function,
  type?: string,
  margin?: string,
  center?: boolean
};

export const PrimaryButton = (props: Props) => {
  const {
    width,
    height,
    outline,
    color,
    value,
    onClick,
    background,
    onMouseEnter,
    type,
    margin,
    center
  } = props;

  return (
    <BasicButton
      {...props}
      width={width}
      height={height}
      outline={outline}
      color={color}
      onClick={onClick}
      background={background}
      value={value}
      onMouseEnter={onMouseEnter}
      type={type}
      margin={margin}
      center={center}
    />
  );
};

PrimaryButton.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.object
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  outline: PropTypes.string,
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func,
  type: PropTypes.string,
  center: PropTypes.bool
};

PrimaryButton.defaultProps = {
  width: '220px',
  height: '45px',
  background: colors.red.ultra_dark,
  border: `solid 1px ${colors.red.ultra_dark}`,
  color: colors.white.primary
};
