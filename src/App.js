import React, { Component } from 'react';

import Spinner from './shared/components/Spinner';

import Routes from './Routes';

import './App.css';

import { Config, injector, inject } from './config';

injector.config(Config); // 初始化依赖

class App extends Component {

  utilService = inject('utilService');

  render() {
    return (
      <div className="App">
        <Spinner ref={el => this.utilService.spinner = el} />
        <Routes />
      </div>
    );
  }
}

export default App;

// import dva from 'dva';

// // 1. Initialize
// const app = dva({
// });

// // 2. Plugins
// // app.use({});

// // 3. Model
// // app.model(require('./models/example').default);

// // 4. Router
// app.router(require('./Routes').default);

// export default app;
