import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../common/FormControls/FormControls';
import { requiredField } from '../../helpers/validators/validators';
import { Redirect } from 'react-router-dom';
import styles from '../common/FormControls/FormsControl.module.css';

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormPropsType> & LoginFormPropsType> = (props) => {
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
      {props.captchaUrl && <div>
        <Field
          placeholder="captcha"
          name={'captcha'}
          component={Input}
          validate={[requiredField]}
        />
        <img src={props.captchaUrl} alt="captcha" />
      </div>}
      <div>
        <button>sign in</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<FormDataType, LoginFormPropsType>({ form: 'login' })(LoginForm);

export type LoginPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
  isAuth: boolean
  captchaUrl: string | null
}

export const Login: React.FC<LoginPropsType> = (props) => {
  const onSubmit = (formData: FormDataType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm
        onSubmit={onSubmit}
        captchaUrl={props.captchaUrl}
      />
    </div>
  );
};

export type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}

export type LoginFormPropsType = {
  captchaUrl: string | null
}