import React from 'react';
import { ProfileFromReduxType } from '../../../Redux/store';

type EditableSpanPropsType = {
  value: string
  updateValue: (status: string) => void
  isMyProfilePage: boolean
}
type StateType = { editMode: boolean, value: string }

export class EditableSpan extends React.Component<EditableSpanPropsType, StateType> {

  state = {
    editMode: false,
    value: this.props.value,
  };

  componentDidUpdate(
    prevProps: Readonly<EditableSpanPropsType>,
    prevState: Readonly<ProfileFromReduxType>, snapshot?: any,
  ): void {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  activateEditMode() {
    if (!this.props.isMyProfilePage) {
      this.setState( //асинхронная шянга
        { editMode: true },
      );
    }
  };

  deActivateEditMode = () => {
    this.setState( //асинхронная шянга
      { editMode: false },
    );
    if (this.state.value !== this.props.value) {
      this.props.updateValue(this.state.value);
    }
  };

  onChangeValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  };

  render() {

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        this.deActivateEditMode();
      } else if (e.key === 'Escape') {
        this.setState({ editMode: false });
        this.state.value = this.props.value;
      }
    };

    return (

      <div>
        {!this.state.editMode
          ?
          <div>
            <span style={!this.props.isMyProfilePage ? { cursor: 'pointer' } : {}}
                  onDoubleClick={this.activateEditMode.bind(this)}  // interesting case
            >{this.props.value || '--------------'}</span>
          </div>
          :
          <div>
            <input
              value={this.state.value}
              onChange={this.onChangeValueHandler}
              autoFocus
              onBlur={this.deActivateEditMode}
              onKeyDown={(e) => onKeyPressHandler(e)}
            />
          </div>}
      </div>
    );
  }
}