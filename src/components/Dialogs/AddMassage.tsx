import React from 'react';
import { addMessageAC, onMessageChangeAC } from '../../Redux/messageReduc';

type AddMessagePropsType = {
  newMessage: string
  dispatch: (action: any) => void
}

export const AddMessage: React.FC<AddMessagePropsType> = (props) => {

  const addMessageHandler = () => {
    props.dispatch(addMessageAC());
  };

  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.dispatch(onMessageChangeAC(event.target.value));
  };

  return (
    <div>
      <textarea
        value={props.newMessage}
        onChange={onMessageChange}
      />
      <button
        onClick={addMessageHandler}
      >Send
      </button>
    </div>
  );
};