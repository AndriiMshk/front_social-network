import React from 'react';

export const AddMessage = () => {

    let newMessage: any = React.createRef()

    const addMessageHandler = () => {
        console.log(newMessage.current.value)
    }

    return (
        <div>
            <textarea
                ref={newMessage}/>
            <button
                onClick={addMessageHandler}
            >add
            </button>
        </div>
    )
}