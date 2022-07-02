import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLength, requiredField } from '../../helpers/validators/validators';
import { Textarea } from '../common/FormControls/FormControls';

type AddMessagePropsType = {
  addMessage: (message: string) => void
}

type FormDataType = {
  message: string
}
const maxLength20 = maxLength(20);

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="Your message"
          name={'message'}
          component={Textarea}
          validate={[maxLength20, requiredField]}
        />
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
      <AddMessageReduxForm onSubmit={onSubmit} />
    </div>
  );
};