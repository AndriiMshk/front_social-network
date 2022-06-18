import React from 'react';
import { Header } from './Header';
import { connect } from 'react-redux';
import { authMeTC } from '../../Redux/auth-reducer';
import { StateTypeFromRedux, UserAuthTypeFromRedux } from '../../Redux/redux-store';

type HeaderPropsType = {
  isAuth: boolean
  login: string
  authMe: () => void
}

export class HeaderApiContainer extends React.Component<HeaderPropsType, UserAuthTypeFromRedux> {

  componentDidMount(): void {
    this.props.authMe();
  }

  render(): React.ReactNode {
    return <Header
      isAuth={this.props.isAuth}
      login={this.props.login}
    />;
  }
}

type mapStateToPropsType = {
  isAuth: boolean
  login: string
}

const mapStateToProps = (state: StateTypeFromRedux): mapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export const HeaderContainer = connect(mapStateToProps,
  {
    authMe: authMeTC
  })(HeaderApiContainer);

