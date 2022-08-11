import React from 'react';

type ProfileStatusPropsType = {
  status: string
  updateUserStatus: (status: string) => void
}

type StateType = { editMode: boolean, status: string }

export class ProfileStatus extends React.Component<ProfileStatusPropsType, StateType> {

  state = {
    editMode: false,
    status: this.props.status,
  };

  toggleEditMode() {
    this.setState( //асинхронная шянга
      { editMode: !this.state.editMode },
    );
    this.props.updateUserStatus(this.state.status);
    // this.forceUpdate()    //заставляет перерисовать кмпонент принудительно (лучше не использовать но хрень прикольная)
  };

  activateEditMode() {
    this.setState( //асинхронная шянга
      { editMode: true },
    );
  };

  deActivateEditMode = () => {
    this.setState( //асинхронная шянга
      { editMode: false },
    );
    this.props.updateUserStatus(this.state.status);
  };

  onUserStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ status: event.currentTarget.value });
  };

  render(): React.ReactNode {
    return (
      <div>
        {!this.state.editMode
          ?
          <div>
            <span
              onDoubleClick={this.activateEditMode.bind(this)}  // interesting case
            >{this.props.status || '--------------'}</span>
          </div>
          :
          <div>
            <input
              value={this.state.status}
              onChange={this.onUserStatusChange}
              autoFocus
              onBlur={this.deActivateEditMode}
            />
          </div>}
      </div>
    );
  }
}