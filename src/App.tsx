import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { Route, withRouter } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { HeaderContainer } from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import { RootStateType } from './Redux/store';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setInitializeTC } from './Redux/app-reducer';
import { Preloader } from './components/common/Preloader/Preloader';
import { lazyRenderHOC } from './HOC/LazyRenderHOC';

type AppPropsType = {
  initialize: () => void
  isInitialize: boolean
}

class AppContainer extends React.Component<AppPropsType, RootStateType> {

  componentDidMount(): void {
    this.props.initialize();
  }

  render() {
    if (!this.props.isInitialize) return <Preloader/>

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path={'/profile/:userId?'} render={() => <ProfileContainer />} />
          <Route path={'/dialogs'} render={lazyRenderHOC(DialogsContainer)} />
          <Route path={'/users'} render={lazyRenderHOC(UsersContainer)} />
          <Route path={'/news'} component={News} />
          <Route path={'/music'} component={Music} />
          <Route path={'/settings'} component={Settings} />
          <Route path={'/login'} render={lazyRenderHOC(LoginContainer)} />
        </div>
      </div>
    );
  }
}

type mapStateToPropsType = {
  isInitialize: boolean
}

const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
  isInitialize: state.app.isInitialize,
});

export const App = compose<React.ComponentType>(
  connect(mapStateToProps, {
      initialize: setInitializeTC,
    },
  ), withRouter)(AppContainer);
