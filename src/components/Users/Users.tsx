import axios from 'axios';
import React from 'react';
import userPhoto from '../../assets/imgs/avatar.png';

type UsersPropsType = {
  users: any[]
  follow: (id: number) => void
  unFollow: (id: number) => void
  setUsers: (users: any) => void
}

class Users extends React.Component<UsersPropsType, any> {

  componentDidMount(): void {
    if (this.props.users.length === 0) {
      axios
        .get('https://social-network.samuraijs.com/api/1.0/users')
        .then((response) => {
          this.props.setUsers(response.data.items);
        });
    }
  }

  render(): any {
    return (
      <div>
        {this.props.users.map((user: any) => <div key={user.id}>
        <span>
          <div className="avatar">
            <img src={user.photos.small
              ? user.photos.small
              : userPhoto} alt="avatar" />
          </div>
          <div>
            {user.followed
              ? <button
                onClick={() => this.props.unFollow(user.id)}
              >follow</button>
              : <button
                onClick={() => this.props.follow(user.id)}
              >unFollow</button>}
          </div>
        </span>
          <span>
          <span>
            <div>{user.name}</div>
            <div>{user.status}</div>
          </span>
          <span>
            <div>{'user.location.country'}</div>
            <div>{'user.location.city'}</div>
          </span>
        </span>
          {'user.fullName'}
        </div>)}
      </div>
    );
  }
}

export default Users;