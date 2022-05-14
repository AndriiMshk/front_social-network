import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { Dialogs } from './components/Dialogs/Dialogs';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { stateType, storeType } from './Redux/store';
import { Route } from 'react-router-dom';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';

type appPropsType = {
  store: storeType
  // dispatch: (action: any) => void
}

const App: React.FC<appPropsType> = (props) => {
  const state = props.store.getState()
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar
        navbarState={state.sidebar}
      />
      <div className="app-wrapper-content">
        <Route path={'/profile'} render={() =>
          <Profile
            store={props.store}
          />
        } />
        <Route path={'/dialogs'} render={() =>
          <DialogsContainer
            store={props.store}
            // dialogsState={state.dialogs}
            // dispatch={props.dispatch}
          />
        } />
        <Route path={'/news'} component={News} />
        <Route path={'/music'} component={Music} />
        <Route path={'/settings'} component={Settings} />
      </div>
    </div>
  );
};

export default App;