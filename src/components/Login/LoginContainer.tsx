import React from 'react';
import { Login, LoginPropsType } from './Login';
import { AnyAction, compose } from 'redux';
import { loginTC } from '../../Redux/auth-reducer';
import { connect } from 'react-redux';
import { RootStateType } from '../../Redux/store';
import { ThunkDispatch } from 'redux-thunk';

type mapStateToPropsType = {
  isAuth: boolean
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
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootStateType, unknown, AnyAction>): maDispatchToPropsType => {
  return {
    login: (email: string, password: string, rememberMe: boolean) =>
      dispatch(loginTC(email, password, rememberMe)),
  };
};
// проблема типизации диспатча
// вынес все вниз без мапдиспатч ту пропс функции тогда не адо типизировать и не ругается
// касается только когда диспатчить санки с экшенами все работает норм в функции

// короче нашел я как типизировать но не использовал потому как так работает норм
// но на всякий случай оставил

export default compose<React.ComponentType>(
  connect(mapStateToProps, {login: loginTC}),
)(LoginContainer);
