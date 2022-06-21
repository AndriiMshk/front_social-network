import React from 'react';
import { ProfileFromReduxType } from '../../../Redux/redux-store';

type ProfileStatusPropsType = {
  status: string
}

type SomeType = ProfileFromReduxType & { state: { editMode: boolean } } // do not work

export class ProfileStatus extends React.Component<ProfileStatusPropsType, any> { // fix any
  state = {
    editMode: false,
  };

  toggleEditMode() {
    this.setState( //асинхронная шянга
      { editMode: !this.state.editMode },
    );
    // this.forceUpdate()    //заставляет перерисовать кмпонент принудительно (лучше не использовать но хрень прикольная)
  };

  render(): React.ReactNode {
    return (
      <div>
        {!this.state.editMode
          ?
          <div>
            <span
              onDoubleClick={this.toggleEditMode.bind(this)}  // interesting case
            >{this.props.status}</span>
          </div>
          :
          <div>
            <input
              value={this.props.status}
              autoFocus
              onBlur={this.toggleEditMode.bind(this)}
            />
          </div>}
      </div>
    );
  }
}