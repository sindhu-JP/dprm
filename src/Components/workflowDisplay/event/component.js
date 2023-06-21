// @flow

import React from 'react';
import style from 'styled-components';
// import { EditOutlined } from '@ant-design/icons';
// import { onNodeClick } from '../../../redux/actions/flowchartAction';
import { connect } from 'react-redux';
// import type { DiagComponentProps } from 'react-flow-diagram';

/*
 * Presentational
 * ==================================== */

const EventStyle = style.div`
  background-color: #46565d;
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 77rem;
  border: 2px solid ${(props) =>
    props.status === 'Resolved'
      ? '#00ff00'
      : props.status === 'Failed'
      ? '#ff0000'
      : props.status === 'In-Progress'
      ? '#e69900'
      : props.status === 'Open'
      ? '#888'
      : 'none'};
  justify-content: center;
  font-size: .5rem;
`;

const Name = style.span`
  position: absolute;
  top: 100%;
  width: 200%;
  padding: .5em;
  font-size: 1.5rem;
`;

const EditName = style.textarea`
  position: absolute;
  top: 100%;
  width: 200%;
  padding: .5em;
  border: none;
  font-size: 1.5rem;
  text-align: center;
  border-radius: .1rem;
  resize: none;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
`;

const End = (props) => (
  <EventStyle
    width={props.model.width}
    height={props.model.height}
    status={props.status}
  >
    <EditName
      value={props.name}
      onChange={props.refreshName}
      onKeyDown={props.handleKeyPress}
      innerRef={(textarea) => props.handleRef(textarea)}
      style={{ display: props.isEditing ? 'block' : 'none' }}
    />
    <Name
      onDoubleClick={() => props.toggleEdit(true)}
      style={{ display: !props.isEditing ? 'block' : 'none' }}
    >
      {props.model.name === 'test' ? 'End' : props.model.name}
    </Name>
  </EventStyle>
);

class EventComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: 'End',
      status: ''
    };
    this.textarea = '';
  }

  componentWillUnmount() {
    this.textarea = null;
  }

  componentDidMount() {
    try {
      let taskStatus = this.props.workflowStatus,
        id = this.props.meta.id,
        status = '';
      if (id === taskStatus) {
        status = 'Resolved';
      }

      this.setState({ status });
    } catch (err) {
      let error = '';
    }
  }

  handleRef = (textarea) => {
    if (!this.textarea) {
      this.textarea = textarea;
    }
  };

  toggleEdit = (isEditing) => {
    // const { textarea } = this;
    // if (isEditing && textarea) {
    //   setTimeout(() => textarea.focus(), 16 * 4);
    // }
    this.setState({ isEditing: false });
  };

  refreshName = (ev) => {
    this.setState({ name: ev.currentTarget.value });
  };

  handleKeyPress = (ev) => {
    switch (ev.key) {
      case 'Enter':
        this.toggleEdit(false);
        this.props.setName({ id: this.props.model.id, name: this.state.name });
        break;
      case 'Escape':
        this.toggleEdit(false);
        this.setState({ name: this.props.model.name });
        break;
      // no default
    }
  };

  render() {
    return (
      <>
        <div>
          {/* <EditOutlined
            // onClick={() => this.props.onNodeClick(this.props)}
            style={{
              position: 'absolute',
              fontSize: '1.7rem',
              top: '-30px',
              left: '58px',
              zIndex: '4'
            }}
          /> */}
          <End
            {...this.props}
            isEditing={this.state.isEditing}
            name={this.state.name}
            toggleEdit={this.toggleEdit}
            refreshName={this.refreshName}
            handleKeyPress={this.handleKeyPress}
            handleRef={this.handleRef}
            status={this.state.status}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  workflowStatus: state.setWorkflowReducer.workflowStatus
});

export default connect(mapStateToProps, null)(EventComponent);
