import React from 'react';
import { Header } from './Header';
import axios from 'axios';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setUserAuthDataAC } from '../../Redux/auth-reducer';
import { StateTypeFromRedux } from '../../Redux/redux-store';

type HeaderPropsType = {
  // userData?: any
  setUserAuthData: (userId: number, email: string, login: string) => void
}



export class HeaderApiContainer extends React.Component<any, any> {


  componentDidMount(): void {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true })
      .then((response) => {
        if (response.data.resultCode === 0) {
          const {id, login, email} = response.data.data
          this.props.setUserAuthDataAC(id, email, login);
        }
      });
  }

  render(): React.ReactNode {
    return <Header
            {...this.props}
    />;
  }
}

const mapStateToProps = (state: StateTypeFromRedux) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
});

const mapDispatchToProps = (dispatch: Dispatch) => (
  {
    setUserAuthData: (userId: number, email: string, login: string) => dispatch(setUserAuthDataAC(userId, email, login))
  }
)

export const HeaderContainer = connect(mapStateToProps, {setUserAuthDataAC})(HeaderApiContainer)

