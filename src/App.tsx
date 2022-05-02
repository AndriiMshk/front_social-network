import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { Dialogs } from './components/Dialogs/Dialogs';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { addMessage, stateType, updateNewMessageText } from './Redux/store';

type appPropsType = {
  state: stateType
  addPost: () => void
  updateNewPostText: (newText: string | undefined) => void
  addMessage: () => void
  updateNewMessageText: (newText: string | undefined) => void
}

const App: React.FC<appPropsType> = (props) => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar
          navbarState={props.state.sidebar}
        />
        <div className="app-wrapper-content">
          <Route path={'/profile'} render={() =>
            <Profile
              profile={props.state.profile}
              addPost={props.addPost}
              updateNewPostText={props.updateNewPostText}
            />
          } />
          <Route path={'/dialogs'} render={() =>
            <Dialogs
              dialogsState={props.state.dialogs}
              addMessage={props.addMessage}
              updateNewMessageText={props.updateNewMessageText}
            />
          } />
          <Route path={'/news'} component={News} />
          <Route path={'/music'} component={Music} />
          <Route path={'/settings'} component={Settings} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;