import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { StateTypeFromRedux } from '../Redux/redux-store';

type MapStateToPropsType = {
  isAuth: boolean
}

const mapStateToProps = (state: StateTypeFromRedux): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export function withAuthRedirectHOC<Type>(Component: React.ComponentType<Type>) {

  const RedirectComponent = (props: MapStateToPropsType) => {
    if (!props.isAuth) {
      return <Redirect to={'/login'} />;
    }

    const { isAuth, ...restProps } = props;

    return <Component {...restProps as Type} />;
  };

  return connect(mapStateToProps)(RedirectComponent);
}

//очень странно сложная типизация ХОКа



