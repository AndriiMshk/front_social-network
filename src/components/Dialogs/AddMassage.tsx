import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

type AddMessagePropsType = {
  addMessage: (message: string) => void
}

type FormDataType = {
  message: string
}

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="Your message" name={'message'} component={'textarea'} />
      </div>
      <button>Send</button>
    </form>
  );
};

const AddMessageReduxForm = reduxForm<FormDataType>({ form: 'message' })(AddMessageForm);

export const AddMessage: React.FC<AddMessagePropsType> = (props) => {
  const onSubmit = (formData: FormDataType) => {
    props.addMessage(formData.message);
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <AddMessageReduxForm onSubmit={onSubmit} />
    </div>
  );
};