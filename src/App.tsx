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
import { Users, UsersContainer } from './components/Users/Users';

type appPropsType = {
  store: any
  // dispatch: (action: any) => void
}

const App: React.FC<any> = (props) => {
    const state = props.store.getState()
  return (
    <div className="app-wrapper">
      <Header />
      {/*<Route path={'/navbar'} render={() => <Navbar*/}
      {/*  navbarState={state.sidebar}*/}
      {/*/>}/>*/}
      <Navbar
        navbarState={state.sidebar}
      />
      <div className="app-wrapper-content">
        <Route path={'/profile'} render={() =>
          <Profile
            // store={props.store}
          />
        } />
        <Route path={'/dialogs'} render={() =>
          <DialogsContainer
            // store={props.store}
            // dialogsState={state.dialogs}
            // dispatch={props.dispatch}
          />
        } />
        <Route path={'/users'} render={() => <UsersContainer/>}/>
        <Route path={'/news'} component={News} />
        <Route path={'/music'} component={Music} />
        <Route path={'/settings'} component={Settings} />
      </div>
    </div>
  );
};

export default App;