import React from 'react';
import { friendsType } from '../../../Redux/store';
import style from './BestFriedns.module.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StateTypeFromRedux } from '../../../Redux/redux-store';

type BestFriendsPropsType = {
  bestFriends: friendsType[]
}

export const BestFriends: React.FC<BestFriendsPropsType> = (props) => {
  return (
    <div className={style.friends}>
      {props.bestFriends.map((friend, key: number) => {
        return (
          <div key={key}>
            <div className={style.friends_img}><img src={friend.ava} alt="ava" /></div>
            <div className={style.friends_name}>{friend.name}</div>
          </div>
        );
      })
      }
    </div>
  );
};

const mapStateToProps = (state: StateTypeFromRedux) => {
  return {
    bestFriends: state.sidebar.friends,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export const BestFriendsContainer = connect(mapStateToProps, mapDispatchToProps)(BestFriends);