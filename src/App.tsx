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
import {DialogItemPropsType, MessageItemPropsType, PostPropsType} from "./index";

type appPropsType = {
    postsData: PostPropsType[]
    dialogsData: DialogItemPropsType[]
    messagesData: MessageItemPropsType[]
}

const App: React.FC<appPropsType> = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path={'/profile'} render={() =>
                        <Profile
                            postsData={props.postsData}
                        />
                    }/>
                    <Route path={'/dialogs'} render={() =>
                        <Dialogs
                            dialogsData={props.dialogsData}
                            messagesData={props.messagesData}
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