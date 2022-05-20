import React from 'react';
import { connect } from 'react-redux';
import { addMessageAC, onMessageChangeAC } from '../../Redux/messageReduc';
import { followAC, setUsersAC, unFollowAC } from '../../Redux/users-reduc';
import { log } from 'util';

export const Users = (props: any) => {

  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        photo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Avatar_cat.png',
        followed: false,
        fullName: 'name1',
        status: 'status1',
        location: {
          city: 'city1',
          country: 'country1',
        },
      },
      {
        id: 2,
        photo: 'https://thumbs.dreamstime.com/b/cat-avatar-illustration-cartoon-45383590.jpg',

        followed: true,
        fullName: 'name2',
        status: 'status2',
        location: {
          city: 'city2',
          country: 'country2',
        },
      },
      {
        id: 3,
        photo: 'data:image/jpeg;base64,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',
        followed: false,
        fullName: 'name3',
        status: 'status3',
        location: {
          city: 'city3',
          country: 'country3',
        },
      }]);
  }

  return (
    <div>
      {props.users.map((user: any) => <div key={user.id}>
        <span>
          <div className="avatar">
            <img src={user.photo} alt="avatar" />
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
            <div>{user.fullName}</div>
            <div>{user.status}</div>
          </span>
          <span>
            <div>{user.location.country}</div>
            <div>{user.location.city}</div>
          </span>
        </span>
        {user.fullName}
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