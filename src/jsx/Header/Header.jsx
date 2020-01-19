// @flow

import * as React from 'react';

export const selectors = {
  projectName: {
    id: 'project-name',
    selector: '[data-test="project-name"]',
  }
};

export const Header = () => {
  return (
      <section className="header">
        <h1 data-test={selectors.projectName.id}>Project Dashboard</h1>
      </section>
  );
};
