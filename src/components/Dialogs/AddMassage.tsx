import React from 'react';

type AddMessagePropsType = {
  dispatch: any
}

export const AddMessage: React.FC<AddMessagePropsType> = (props) => {

  let newMessage = React.createRef<HTMLTextAreaElement>();

  const addMessageHandler = () => {
    props.dispatch({ type: 'ADD-MESSAGE' });
  };

  const onPostChange = () => {
    let text = newMessage.current?.value;
    props.dispatch({ type: 'UPDATE-NEW-MESSAGE-TEXT', newText: text });
  };

  return (
    <div>
            <textarea
              ref={newMessage}
              onChange={onPostChange}
            />
      <button
        onClick={addMessageHandler}
      >add
      </button>
    </div>
  );
};