import React from 'react';

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
    this.props.updateValue(this.state.value);
  };

  onChangeValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
  };

  render(): React.ReactNode {
    return (
      <div>
        {!this.state.editMode
          ?
          <div>
            <span
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
            />
          </div>}
      </div>
    );
  }
}