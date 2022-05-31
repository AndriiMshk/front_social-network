import React from 'react';
import { Profile } from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../Redux/profileReduc';

export class ProfileAPIComponent extends React.Component<any, any> {

  componentDidMount(): void {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then((response) => {
        this.props.setUserProfile(response.data);
      });
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} />
    );
  }
};

const mapStateToProps = (state: any) => ({
  profile: state.profile.profile,
});

export const ProfileContainer = connect(mapStateToProps, { setUserProfile })(ProfileAPIComponent);