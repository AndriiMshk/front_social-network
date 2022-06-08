import React from 'react';
import { Profile } from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../Redux/profileReduc';
import { withRouter } from 'react-router-dom';

// тут тип эни бо нихуя не понятно как типизировать

export class ProfileAPIComponent extends React.Component<any, any> {

  componentDidMount(): void {
    let userId = this.props.match.params.userId
    if (!userId) {userId = 2}
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then((response) => {
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    console.log(this.props);
    return (
      <Profile
                {...this.props}
        profile={this.props.profile} />
    );
  }
};

const mapStateToProps = (state: any) => ({
  profile: state.profile.profile,
});

const WithUrlContainerComponent = withRouter(ProfileAPIComponent)

export const ProfileContainer = connect(mapStateToProps, { setUserProfile })(WithUrlContainerComponent);