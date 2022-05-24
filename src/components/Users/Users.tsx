import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { followAC, setUsersAC, unFollowAC } from '../../Redux/users-reduc';
import userPhoto from '../../assets/imgs/avatar.png'

type UsersPropsType = {
  users: any[]
  follow: (id: number) => void
  unFollow: (id: number) => void
  setUsers: (users: any) => void
}

export const Users: React.FC<UsersPropsType> = (props) => {

  if (props.users.length === 0) {
    axios.get('https://social-network.samuraijs.com/api/1.0/users').then((response)=> {
      props.setUsers(response.data.items)
    });
  }

  return (
    <div>
      {props.users.map((user: any) => <div key={user.id}>
        <span>
          <div className="avatar">
            <img src={user.photos.small
              ? user.photos.small
              : userPhoto} alt="avatar" />
          </div>
          <div>
            {user.followed
              ? <button
                onClick={() => props.unFollow(user.id)}
              >follow</button>
              : <button
                onClick={() => props.follow(user.id)}
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
};

const mapStateToProps = (state: any) => ({ users: state.usersPage.users });

const mapDispatchToProps = (dispatch: any) => (
  {
    follow: (id: number) => dispatch(followAC(id)),
    unFollow: (id: number) => dispatch(unFollowAC(id)),
    setUsers: (users: any) => dispatch(setUsersAC(users)),
  }
);

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);