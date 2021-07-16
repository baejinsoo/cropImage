import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import selfMvot from './containers/selfMvot';
import selfMvin from './containers/selfMvin';
import urscMvot from './containers/urscMvot';
import CameraCapture from './containers/CameraCapture';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/self_mvot" component={selfMvot}></Route>
          <Route path="/self_mvin" component={selfMvin}></Route>
          <Route path="/capture" component={CameraCapture}></Route>
          <Route path="/crop" component={CameraCapture}></Route>
          <Route path="/ursc_mvot" component={urscMvot}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;