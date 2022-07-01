import React from 'react';
import styles from '../FormControls/FormsControl.module.css';

const FormControl = ({ meta, input, children, ...rest }: any) => {
  const isError = meta.touched && meta.error;
  return (
    <div className={isError
      ? `${styles.formControl} ${styles.error}`
      : styles.formControl}>
      <div>
        {children}
      </div>
      <div>
        {isError && <span>{meta.error}</span>}
      </div>
    </div>
  );
};

export const Textarea: React.FC = (props: any) => {
  const { meta, input, children, ...rest } = props;
  return <FormControl{...props}><textarea {...input} {...rest} /></FormControl>;

};

export const Input: React.FC = (props: any) => {
  const { meta, input, children, ...rest } = props;
  return <FormControl{...props}><input {...input} {...rest} /></FormControl>;
};




