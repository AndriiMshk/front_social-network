import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { Redirect, Route, withRouter } from 'react-router-dom';
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
import ErrorMessage from './components/common/ErrorMessage/ErrorMessage';

class AppContainer extends React.Component<AppPropsType, RootStateType> {

  catchAllUnhandledErrors(promiseRejectionEvent: PromiseRejectionEvent) {
    console.warn(promiseRejectionEvent.reason);
  };

  componentDidMount(): void {
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors.bind(this));
    this.props.initialize();
  }

  componentWillUnmount(): void {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors.bind(this));
  }

  render() {
    if (!this.props.isInitialize) {
      return <Preloader />;
    }

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
          <Route path={'/'} render={() => <Redirect to={'/profile'} />} />
        </div>
        <ErrorMessage />
      </div>
    );
  }
}

const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
  isInitialize: state.app.isInitialize,
});

export const App = compose<React.ComponentType>(
  connect(mapStateToProps, {
      initialize: setInitializeTC,
    },
  ), withRouter)(AppContainer);

type AppPropsType = {
  initialize: () => void
  isInitialize: boolean
}

type mapStateToPropsType = {
  isInitialize: boolean
}