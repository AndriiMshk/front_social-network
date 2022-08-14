import React from 'react';
import styles from './ErrorMessage.module.css';
import { connect } from 'react-redux';
import { RootStateType } from '../../../Redux/store';

const classNames = require('classnames');

class ErrorMessage extends React.Component<ErrorMessagePropsType> {

  render() {
    return (
      <div className={classNames(styles.container, {
        [styles.hide]: !this.props.error,
      })}>{this.props.error}</div>
    );
  };
}

const mapStateToProps = (state: RootStateType) => ({
  error: state.app.error,
});

export default connect(mapStateToProps, {})(ErrorMessage);

type ErrorMessagePropsType = {
  error: string
}