import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { setPhotoTC, setStatusTC, setUserProfileTC, updateStatusTC } from '../../Redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProfileFromReduxType, RootStateType } from '../../Redux/store';
import { compose } from 'redux';
import { withAuthRedirectHOC } from '../../HOC/AuthRedirectHOC';

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
  authorizedUserId: number | null
  isAuth: boolean
}

type mapDispatchPropsType = {
  setUserProfile: (userId: string) => void
  getUserStatus: (userId: string) => void
  updateUserStatus: (status: string) => void
  setPhoto: any
}

type PathParamsType = {
  userId: string
}

// Type for withRouter
type ProfileContainerPropsType = mapStateToPropsType & mapDispatchPropsType
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType, ProfileFromReduxType> {

  updateProfileHelper(): void {
    if (this.props.authorizedUserId) {
      let userId = this.props.match.params.userId;
      if (!userId) {
        userId = this.props.authorizedUserId.toString();
      }
      this.props.getUserStatus(userId);
      this.props.setUserProfile(userId);
    } else {
      this.props.history.push('/login');  // like Redirect
    }
  }

  componentDidMount(): void {
    this.updateProfileHelper();
  }

  componentDidUpdate(
    prevProps: Readonly<PropsType>,
    prevState: Readonly<ProfileFromReduxType>, snapshot?: any,
  ): void {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.updateProfileHelper();
    }
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        idMyProfilePage={this.props.profile?.userId === +this.props.match.params.userId}
        setPhoto={this.props.setPhoto}
      />
    );
  }
}

const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
  profile: state.profile.profile,
  status: state.profile.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps,
    {
      setUserProfile: setUserProfileTC,
      getUserStatus: setStatusTC,
      updateUserStatus: updateStatusTC,
      setPhoto: setPhotoTC
    },
  ),
  withRouter,
  withAuthRedirectHOC,
)(ProfileContainer);



