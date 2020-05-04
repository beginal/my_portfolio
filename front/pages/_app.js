import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import withRedux from 'next-redux-wrapper';
import PropTypes from 'prop-types';
import createSagaMiddleware from 'redux-saga';
import './_app.css';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import rootSaga from '../sagas';


const MainPage = ({ Component, store, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
      <title>My PortFolio</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.1.5/antd.css"/>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/4.1.5/antd.js" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>

    </Provider>
  )
}

  MainPage.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
  }

  MainPage.getInitialProps = async (context) => { // context 는 next에서 내려줌
    const { ctx, Component } = context;
    let pageProps = {};
    if(Component.getInitialProps) { // 여기서  Component는 _app.js의 하위Component
      // 하위 컴포넌트에 getInitialProps가 있으면 그것을 실행해준다.
      pageProps =  await Component.getInitialProps(ctx); 
    }
    return { pageProps };
  }

const configStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware];
  const enhancer = compose( process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : applyMiddleware(...middleWares),
    !options.isServer && 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' 
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    )
  const store = createStore(reducer, initialState, enhancer)
  sagaMiddleware.run(rootSaga)
  return store;
}


export default withRedux(configStore)(MainPage);