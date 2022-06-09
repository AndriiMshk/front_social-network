import React from 'react';
import { Header } from './Header';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setUserAuthDataAC } from '../../Redux/auth-reducer';
import { StateTypeFromRedux, UserAuthTypeFromRedux } from '../../Redux/redux-store';
import { usersAPI } from '../../api/api';

type HeaderPropsType = {
  isAuth: boolean
  login: string
  setUserAuthData: (userId: number, email: string, login: string) => void
}

export class HeaderApiContainer extends React.Component<HeaderPropsType, UserAuthTypeFromRedux> {

  componentDidMount(): void {
    usersAPI.authGetRequest()
      .then((data) => {
        if (data.resultCode === 0) {
          const { id, login, email } = data.data;
          this.props.setUserAuthData(id, email, login);
        }
      });
  }

  render(): React.ReactNode {
    return <Header
      isAuth={this.props.isAuth}
      login={this.props.login}
    />;
  }
}

const mapStateToProps = (state: StateTypeFromRedux) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    setUserAuthData: (userId: number, email: string, login: string) => dispatch(
      setUserAuthDataAC(userId, email, login)),
  }
);

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderApiContainer);

