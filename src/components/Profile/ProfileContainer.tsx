import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { setUserProfileTC } from '../../Redux/profileReduc';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProfileFromReduxType, StateTypeFromRedux } from '../../Redux/redux-store';
import { withAuthRedirectHOC } from '../../HOC/AuthRedirectHOC';
import { compose } from 'redux';

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
  setUserProfile: (userId: string) => void
}

type PathParamsType = {
  userId: string
}

// Type for withRouter
type ProfileContainerPropsType = mapStateToPropsType & mapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType, ProfileFromReduxType> {

  componentDidMount(): void {
    let userId = this.props.match.params.userId;
    this.props.setUserProfile(userId);
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

export default compose<React.ComponentType>(
  connect(mapStateToProps, { setUserProfile: setUserProfileTC }),
  withRouter,
  withAuthRedirectHOC,
)(ProfileContainer);





