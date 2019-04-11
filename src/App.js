import React, { Component } from 'react';

import Routes from './Routes';

import './App.css';

import { Config, injector } from './config';

injector.config(Config); // 初始化依赖

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
        {/* <Notifications />
        <Spinner ref={el => UtilService.instance.spinner = el} />
        <Dialog ref={el => UtilService.instance.dialog = el}></Dialog>
        <div id="modal-container"></div> */}
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
