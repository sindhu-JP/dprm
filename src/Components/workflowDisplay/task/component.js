// @flow

import React from 'react';
import style from 'styled-components';
// import { EditOutlined } from '@ant-design/icons';
// import { onNodeClick } from '../../../redux/actions/flowchartAction';
import { connect } from 'react-redux';

/*
 * Presentational
 CSS for the component
 * ==================================== */

const TaskStyle = style.div`
  background-color: #fff;
  display: flex;
  flex-flow: row nowrap;
  align-items: ${(props) => (props.isEditing ? 'stretch' : 'center')};
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: .5rem;
  border: 2px solid ${(props) =>
    props.status === 'Resolved'
      ? '#00ff00'
      : props.status === 'Failed'
      ? '#ff0000'
      : props.status === 'In-Progress'
      ? '#e69900'
      : '#888'};
`;

const Name = style.span`
  flex: 1 0;
  padding: .5em;
  font-size: 1.5rem;
`;

const EditName = style.textarea`
  padding: .5em;
  font-size: 1.5rem;
  text-align: center;
  resize: none;
  border: none;
  border-radius: .5rem;
`;

const ServiceTask = (props) => (
  <TaskStyle
    status={props.status}
    width={props.model.width}
    height={props.model.height}
    isEditing={props.isEditing}
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
      {props.model.name === 'test' ? 'Service' : props.model.name}
    </Name>
  </TaskStyle>
);

class TaskComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: 'Service',
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
              left: '119px',
              zIndex: '4'
            }}
          /> */}

          <ServiceTask
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

export default connect(mapStateToProps, null)(TaskComponent);
