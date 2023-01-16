import React from 'react'
import { AppProps } from 'next/app'
import { Refine } from '@pankod/refine-core'
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  AuthPage
} from '@pankod/refine-antd'
import { AntdInferencer } from '@pankod/refine-inferencer/antd'
import routerProvider from '@pankod/refine-nextjs-router'
import '@pankod/refine-antd/dist/reset.css'
import { ColorModeContextProvider } from '@contexts'
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea
} from '@components/layout'
import { authProvider } from 'src/authProvider'
import { dataProvider } from 'src/dataProvider'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ColorModeContextProvider>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        notificationProvider={notificationProvider}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        Title={Title}
        Header={Header}
        Sider={Sider}
        Footer={Footer}
        Layout={Layout}
        OffLayoutArea={OffLayoutArea}
        authProvider={authProvider}
        LoginPage={AuthPage}
        resources={[
          {
            name: 'Film',
            list: AntdInferencer,
            show: AntdInferencer
          },
          {
            name: 'User',
            list: AntdInferencer
          }
        ]}
      >
        <Component {...pageProps} />
      </Refine>
    </ColorModeContextProvider>
  )
}

export default MyApp
