import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { setUserProfileTC } from '../../Redux/profileReduc';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { ProfileFromReduxType, StateTypeFromRedux } from '../../Redux/redux-store';

export type ProfileType = {
  aboutMe: string
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  }
  photos: {
    small: string
    large: string
  }
}

type mapStateToPropsType = {
  profile: ProfileType | null
  isAuth: boolean
}

type mapDispatchPropsType = {
  setUserProfile: (userId: string) => void
}

type PathParamsType = {
  userId: string
}

// Type for withRouter
type ProfileAPIComponentPropsType = mapStateToPropsType & mapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType> & ProfileAPIComponentPropsType

export class ProfileAPIComponent extends React.Component<PropsType, ProfileFromReduxType> {

  componentDidMount(): void {
    let userId = this.props.match.params.userId;
    this.props.setUserProfile(userId);
  }

  render() {

    if (!this.props.isAuth) return <Redirect to={'/login'}/>

    return (
      <Profile
        {...this.props}
        profile={this.props.profile} />
    );
  }
}

const mapStateToProps = (state: StateTypeFromRedux): mapStateToPropsType => ({
  profile: state.profile.profile,
  isAuth: state.auth.isAuth
});

const WithUrlContainerComponent = withRouter(ProfileAPIComponent);

export const ProfileContainer = connect(mapStateToProps, {
  setUserProfile: setUserProfileTC,
})(WithUrlContainerComponent);