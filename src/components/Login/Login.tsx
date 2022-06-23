import React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { authAPI } from '../../api/api';

type FormDataType2 = {
  login: string
  password: string
  rememberMe: boolean
}

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
        <Field placeholder="login" name={'email'} component={'input'}/>
      </div>
      <div>
        <Field placeholder="password" name={'password'} component={'input'}/>
      </div>
      <div>
        <Field type="checkbox" name={'rememberMe'} component={'input'}/> remember me
      </div>
      <div>
        <button>sign in</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<FormDataType>({ form: 'login' })(LoginForm);

const Login = () => {
  const onSubmit = (formData: FormDataType) => {
    authAPI.loginRequest(formData).then((res)=>{
      console.log(res);
    })
  };
  // вынести запрос в санку
  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
export default Login

// типизация формы тоже полная жома