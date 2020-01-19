// @flow
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime';
import 'normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';
import shortid from 'shortid';
import * as React from 'react';
import ReactDom from 'react-dom';
import './../scss/index.scss';
import styled from 'styled-components';
import { routeMaps } from './../js/routeMaps';
import { colors } from './../js/colors';
import { mainData } from '../js/data/mainData';
import { Header } from './Header/Header';
import { MainTable } from './MainTable/MainTable';
import type { ServerDataWithShowModal } from '../types';

const App = () => {
  const { managementData, updateManagementData } = mainData();
  React.useEffect(() => {
    (async () => {
      const { data } = await routeMaps.getAllData();
      let { serverData } = data;
      if (Array.isArray(serverData)) {
        serverData = serverData.map((data): ServerDataWithShowModal => {
          const id = data.id || shortid.generate();
          const showModal = data.showModal || false;
          return { ...data, id, showModal };
        });
      }
      updateManagementData(serverData);
    })();
  }, []);
  const Section = styled('section')`
    padding: 10px 0 5px 0;
    background: ${colors.blue.light};
  `;
  const Container = styled('div')`
    margin: 20px auto;
    padding-top: 10px;
    max-width: 1280px;
    background: ${colors.white.primary};
  `;
  const Content = styled('div')`
    margin: 10px;
  `;
  return (
    <React.StrictMode>
      <Section className={'app'}>
        <Container>
          <Content>
            <Header />
            <MainTable data={managementData} />
          </Content>
        </Container>
      </Section>
    </React.StrictMode>
  );
};

const root = document.querySelector('#root');
if (root) {
  ReactDom.render(<App />, root);
}
