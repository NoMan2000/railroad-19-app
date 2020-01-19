// @flow
import * as React from 'react';
import SecondaryButton from './FormElements/Buttons/SecondaryButton';
import { AppToaster } from '../Misc/AppToaster';
import styled from 'styled-components';

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
export const Pdf = () => {
  const onClick = () => {
    AppToaster.success('Downloading PDF!');
  };
  return (
    <Section className="pdf">
      <SecondaryButton
        data-test={'download-pdf'}
        onClick={onClick}
        value={'DOWNLOAD PDF!'}
      />
    </Section>
  );
};
