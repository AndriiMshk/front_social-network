import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { setStatusTC, setUserProfileTC, updateStatusTC } from '../../Redux/profileReduc';
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
  status: string
}

type mapDispatchPropsType = {
  setUserProfile: (userId: string) => void
  getUserStatus: (userId: string) => void
  updateUserStatus: (status: string) => void
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
    if (!userId) {userId = '2';}
    this.props.getUserStatus(userId);
    this.props.setUserProfile(userId);
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
      />
    );
  }
}

const mapStateToProps = (state: StateTypeFromRedux): mapStateToPropsType => ({
  profile: state.profile.profile,
  status: state.profile.status,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps,
    {
      setUserProfile: setUserProfileTC,
      getUserStatus: setStatusTC,
      updateUserStatus: updateStatusTC,
    },
  ),
  // withAuthRedirectHOC,
  withRouter,
)(ProfileContainer);





