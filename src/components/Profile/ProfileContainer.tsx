import React from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import {
  setPhotoTC,
  setStatusTC,
  setUserProfileTC,
  updateProfileAboutTC,
  updateProfileContactsTC,
  updateStatusTC,
} from '../../Redux/profile-reducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProfileFromReduxType, RootStateType } from '../../Redux/store';
import { compose } from 'redux';
import { withAuthRedirectHOC } from '../../HOC/AuthRedirectHOC';
import { ProfileType } from '../../api/api';

class ProfileContainer extends React.Component<ProfilePropsType, ProfileFromReduxType> {

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
    prevProps: Readonly<ProfilePropsType>,
    prevState: Readonly<ProfileFromReduxType>, snapshot?: any,
  ): void {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.updateProfileHelper();
    }
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
    if (prevProps.error !== this.props.error) {
      this.setState({ profileError: this.props.error });
    }
  }

  render() {

    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        isMyProfilePage={this.props.profile?.userId !== +this.props.match.params.userId}
        setPhoto={this.props.setPhoto}
        updateProfileAbout={this.props.updateProfileAbout}
        updateProfileContacts={this.props.updateProfileContacts}
        error={this.props.error}
      />
    );
  }
}

const mapStateToProps = (state: RootStateType) => ({
  profile: state.profile.profile,
  status: state.profile.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
  error: state.app.error,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps,
    {
      setUserProfile: setUserProfileTC,
      getUserStatus: setStatusTC,
      updateUserStatus: updateStatusTC,
      setPhoto: setPhotoTC,
      updateProfileContacts: updateProfileContactsTC,
      updateProfileAbout: updateProfileAboutTC,
    },
  ),
  withRouter,
  withAuthRedirectHOC,
)(ProfileContainer);

type MapStateToPropsType = {
  profile: ProfileType | null
  status: string
  authorizedUserId: number | null
  isAuth: boolean
  error: string
}

type MapDispatchPropsType = {
  setUserProfile: (userId: string) => void
  getUserStatus: (userId: string) => void
  updateUserStatus: (status: string) => void
  setPhoto: (file: File | null) => void
  updateProfileAbout: (contact: string, value: string | boolean) => void
  updateProfileContacts: (contact: string, value: string) => void
}

type PathParamsType = {
  userId: string
}

// Type for withRouter
type ProfileContainerPropsType = MapStateToPropsType & MapDispatchPropsType
type ProfilePropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType


