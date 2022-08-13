import React from 'react';
import { Login, LoginPropsType } from './Login';
import { compose } from 'redux';
import { loginTC } from '../../Redux/auth-reducer';
import { connect } from 'react-redux';
import { RootStateType } from '../../Redux/store';

type mapStateToPropsType = {
  isAuth: boolean
  captchaUrl: string | null,
}

type maDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean) => void
}

type DialogsContainerPropsType = mapStateToPropsType & maDispatchToPropsType

class LoginContainer extends React.Component<DialogsContainerPropsType, LoginPropsType> {
  render() {
    return <Login {...this.props as LoginPropsType} />;
  }
}

const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    login: loginTC,
  }),
)(LoginContainer);
