import React from 'react';

type AddMessagePropsType = {
  addMessage: () => void
  updateNewMessageText: (newText: string | undefined) => void
}

export const AddMessage: React.FC<AddMessagePropsType> = (props) => {

  let newMessage = React.createRef<HTMLTextAreaElement>();

  const addMessageHandler = () => {
    props.addMessage();
  };

  const onPostChange = () => {
    let text = newMessage.current?.value;
    props.updateNewMessageText(text);
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