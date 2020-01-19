// @flow
import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

type Props = {
  border?: string,
  value: string,
  onClick?: Function,
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

const Button = styled('button')`
  width: ${props => props.width || '220px'};
  height: ${props => props.height || '45px'};
  outline: ${props => props.outline};
  color: ${props => props.color};
  background: ${props => props.background};
  margin: ${props => props.margin};
  border: ${props => props.border};
`;
const CenterDiv = styled('div')`
  width: ${props => props.width || '220px'};
  margin: ${props => props.margin || '0 auto'};
`;

export const BasicButton = (props: Props) => {
  const {
    center,
    border,
    width,
    height,
    outline,
    color,
    value,
    onClick,
    background,
    onMouseEnter,
    type,
    margin
  } = props;
  const getBasicButton = () => {
    return (
      <Button
        {...props}
        background={background}
        border={border}
        width={width}
        height={height}
        outline={outline}
        color={color}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        type={type}
        margin={margin}
      >
        {value}
      </Button>
    );
  };
  return (
    <React.Fragment>
      {center && (
        <CenterDiv width={width} margin={margin}>
          {getBasicButton()}
        </CenterDiv>
      )}
      {!center && getBasicButton()}
    </React.Fragment>
  );
};

BasicButton.propTypes = {
  border: PropTypes.string,
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
  margin: PropTypes.string,
  center: PropTypes.bool
};

BasicButton.defaultProps = {
  onMouseEnter: () => {},
  type: 'button'
};
