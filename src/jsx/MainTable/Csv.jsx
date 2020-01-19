// @flow
import * as React from 'react';
import styled from 'styled-components';
import SecondaryButton from './FormElements/Buttons/SecondaryButton';
import { AppToaster } from '../Misc/AppToaster';

const Section = styled('section')`
  &:hover {
    cursor: pointer;
  }
  button {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Csv = () => {
  const onClick = () => {
    AppToaster.success('Downloading CSV!');
  };
  return (
    <Section data-test={'download-csv'} className="csv">
      <SecondaryButton
        className={'csv'}
        onClick={onClick}
        value={'DOWNLOAD CSV!'}
      />
    </Section>
  );
};
