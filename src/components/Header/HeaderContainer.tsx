import React from 'react';
import { Header } from './Header';
import { connect } from 'react-redux';
import { authMeTC, logoutTC } from '../../Redux/auth-reducer';
import { StateTypeFromRedux, UserFromReduxAuthType } from '../../Redux/redux-store';

type HeaderPropsType = {
  isAuth: boolean
  login: string | null
  authMe: () => void
  logout: () => void
}

export class HeaderApiContainer extends React.Component<HeaderPropsType, UserFromReduxAuthType> {

  componentDidMount(): void {
    this.props.authMe();
  }

  render(): React.ReactNode {
    return <Header
      isAuth={this.props.isAuth}
      login={this.props.login}
      logout={this.props.logout}
    />;
  }
}

type mapStateToPropsType = {
  isAuth: boolean
  login: string | null
}

const mapStateToProps = (state: StateTypeFromRedux): mapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export const HeaderContainer = connect(mapStateToProps,
  {
    authMe: authMeTC,
    logout: logoutTC
  })(HeaderApiContainer);

