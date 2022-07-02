import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { HeaderContainer } from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';

const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Route path={'/profile/:userId?'} render={() => <ProfileContainer />} />
        <Route path={'/dialogs'} render={() => <DialogsContainer />} />
        <Route path={'/users'} render={() => <UsersContainer />} />
        <Route path={'/news'} component={News} />
        <Route path={'/music'} component={Music} />
        <Route path={'/settings'} component={Settings} />
        <Route path={'/login'} component={LoginContainer} />
      </div>
    </div>
  );
};

export default App;


/*
  (dispatch: ThunkDispatch<StateTypeFromRedux, unknown, AnyAction>) => {
    //типизацию спиздил из тудулиста и не понятно что она сука делает
 */