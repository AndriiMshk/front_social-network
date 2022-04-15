import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export type PostPropsType = {
    id ?: number
    message: string
    likeCounts: number
}

const postsData = [
    {id: 1, message: 'hello', likeCounts: 14},
    {id: 2, message: 'hello', likeCounts: 24},
    {id: 3, message: 'hello', likeCounts: 34}
]

export type DialogItemPropsType = {
    id: string | number
    name: string
}

const dialogsData = [
    {id: 1, name: 'name1'},
    {id: 2, name: 'name2'},
    {id: 3, name: 'name3'},
    {id: 4, name: 'name4'}
]

export type MessageItemPropsType = {
    id: string | number
    message: string
}

const messagesData = [
    {id: 1, message: "message1"},
    {id: 2, message: "message2"},
    {id: 3, message: "message3"},
    {id: 4, message: "message4"}
]

ReactDOM.render(
    <App
        postsData={postsData}
        dialogsData={dialogsData}
        messagesData={messagesData}
    />,
    document.getElementById('root'));