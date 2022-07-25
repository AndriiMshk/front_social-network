import React from 'react';
import { Header } from './Header';
import { connect } from 'react-redux';
import { logoutTC } from '../../Redux/auth-reducer';
import { RootStateType, UserFromReduxAuthType } from '../../Redux/store';

type HeaderPropsType = {
  isAuth: boolean
  login: string | null
  logout: () => void
}

export class HeaderApiContainer extends React.Component<HeaderPropsType, UserFromReduxAuthType> {

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

const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export const HeaderContainer = connect(mapStateToProps,
  {

    logout: logoutTC,
  })(HeaderApiContainer);

