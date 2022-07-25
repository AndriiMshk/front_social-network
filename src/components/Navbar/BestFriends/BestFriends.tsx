import React from 'react';
import style from './BestFriedns.module.css';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootStateType } from '../../../Redux/store';

export type FriendsType = {
  id: number
  name: string
  ava: string
}

type BestFriendsPropsType = {
  bestFriends: FriendsType[]
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

const mapStateToProps = (state: RootStateType) => {
  return {
    bestFriends: state.sidebar.friends,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export const BestFriendsContainer = connect(mapStateToProps, mapDispatchToProps)(BestFriends);