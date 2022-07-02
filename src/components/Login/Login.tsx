import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../common/FormControls/FormControls';
import { requiredField } from '../../helpers/validators/validators';
import { Redirect } from 'react-router-dom';
import styles from '../common/FormControls/FormsControl.module.css';

export type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="login"
          name={'email'}
          component={Input}
          validate={[requiredField]}
        />
      </div>
      <div>
        <Field
          placeholder="password"
          name={'password'}
          type={'password'}
          component={Input}
          validate={[requiredField]}
        />
      </div>
      <div>
        <Field type="checkbox" name={'rememberMe'} component={'input'} /> remember me
      </div>
      {props.error &&
      <div className={styles.formCommonError}>
        {props.error}
      </div>}
      <div>
        <button>sign in</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<FormDataType>({ form: 'login' })(LoginForm);

export type LoginPropsType = {
  login: (email: string, password: string, rememberMe: boolean) => void
  isAuth: boolean
}

export const Login: React.FC<LoginPropsType> = (props) => {

  const onSubmit = (formData: FormDataType) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

// типизация формы тоже полная жома