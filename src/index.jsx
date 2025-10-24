import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR,
  APP_READY,
  initialize,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import {
  AppProvider,
  ErrorPage,
} from '@edx/frontend-platform/react';

import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { createRoot } from 'react-dom/client';


// import { FooterSlot } from '@edx/frontend-component-footer';

import { CustomFooter, CustomHeader } from '@nekoneko6996/cusc-custom-brand';

import messages from './i18n';
import configureStore from './data/configureStore';

import Head from './head/Head';

import AppRoutes from './routes/AppRoutes';

// import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.scss';

const rootNode = createRoot(document.getElementById('root'));

import { primaryNav, cuscLogoImgSrc, ctuLogoImgSrc } from './profile-header/auth-header.jsx';

console.log('typeof CustomHeader =', typeof CustomHeader);
console.log('value CustomHeader =', CustomHeader);
subscribe(APP_READY, async () => {

  const primary = primaryNav();
  const cuscLogo = cuscLogoImgSrc();
  const ctuLogo = ctuLogoImgSrc(); 
  
  const logoRedirectURL = {
    ctu: "https://www.ctu.edu.vn/",
    cusc: "https://cusc.ctu.edu.vn/cms/"
  };


  rootNode.render(
    <AppProvider store={configureStore()}>
      <Head />
      <CustomHeader firstLogo={ctuLogo} secondLogo={cuscLogo} secondaryNav={[]}  primaryNav={primary} />
      <main id="main">
        <AppRoutes />
      </main>
      <CustomFooter firstLogo={cuscLogo} secondLogo={ctuLogo} firstLogoRedirectURL={logoRedirectURL.cusc} secondLogoRedirectURL={logoRedirectURL.ctu} />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  rootNode.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        COLLECT_YEAR_OF_BIRTH: process.env.COLLECT_YEAR_OF_BIRTH,
        ENABLE_SKILLS_BUILDER_PROFILE: process.env.ENABLE_SKILLS_BUILDER_PROFILE,
        DISABLE_VISIBILITY_EDITING: process.env.DISABLE_VISIBILITY_EDITING,
      }, 'App loadConfig override handler');
    }, 
  },
});
