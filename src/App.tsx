import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from "./components/Dialogs/Dialogs";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {stateType} from './Redux/store'

type appPropsType = {
    state: stateType
    addPost: (postMessage: string) => void
}

const App: React.FC<appPropsType> = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar
                    navbarState={props.state.sidebar}
                />
                <div className='app-wrapper-content'>
                    <Route path={'/profile'} render={() =>
                        <Profile
                            postsState={props.state.profile.postsData}
                            addPost={props.addPost}
                        />
                    }/>
                    <Route path={'/dialogs'} render={() =>
                        <Dialogs
                            dialogsState={props.state.dialogs}
                        />
                    }/>
                    <Route path={'/news'} component={News}/>
                    <Route path={'/music'} component={Music}/>
                    <Route path={'/settings'} component={Settings}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;