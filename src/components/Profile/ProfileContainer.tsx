import React from 'react';
import { Profile } from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfileAC } from '../../Redux/profileReduc';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProfileFromReduxType, StateTypeFromRedux } from '../../Redux/redux-store';
import { Dispatch } from 'redux';

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
}

type mapDispatchPropsType = {
  setUserProfile: (profile: ProfileType) => void
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
    if (!userId) {userId = '2';}
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((response) => {
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile} />
    );
  }
}

const mapStateToProps = (state: StateTypeFromRedux): mapStateToPropsType => ({
  profile: state.profile.profile,
});

const mapDispatchProps = (dispatch: Dispatch): mapDispatchPropsType => ({
  setUserProfile: ((profile: ProfileType) => dispatch(setUserProfileAC(profile))),
});

const WithUrlContainerComponent = withRouter(ProfileAPIComponent);

export const ProfileContainer = connect(mapStateToProps, mapDispatchProps)(WithUrlContainerComponent);