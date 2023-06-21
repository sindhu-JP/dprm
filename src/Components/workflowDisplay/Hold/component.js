// @flow

import React from 'react';
import style from 'styled-components';
// import { EditOutlined } from '@ant-design/icons';
// import { onNodeClick } from '../../../redux/actions/flowchartAction';
import { connect } from 'react-redux';

/*
 * Presentational
 * ==================================== */

const HoldOuterStyle = style.div`
  background-color: #fff;
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 0px;
  justify-content: center;
  background: #9E9E9E;
  color: white;
  border-radius: 50%;
  border: ${(props) =>
    props.status === 'Resolved'
      ? '#00ff00'
      : props.status === 'Failed'
      ? '#ff0000'
      : props.status === 'In-Progress'
      ? '#e69900'
      : props.status === 'Open'
      ? 'none'
      : '#888'};
 
`;

const InnerCircle = style.span`
position: relative;
background: #e3e7ea;
border-radius: 50%;
width: ${(props) => props.width - 30}px;
height: ${(props) => props.height - 30}px;
margin: 0px;
color:black;
`;

const Name = style.span`
  position: absolute;
  top: 20%;
  width: 200%;
  padding: .5em;
  font-size: 1.5rem;
  color:black;
  left:-45%;
  font-weight: 500;
`;

const EditName = style.textarea`
  position: absolute;
  top: 20%;
  width: 200%;
  padding: .5em;
  border: none;
  font-size: 1.5rem;
  text-align: center;
  border-radius: .1rem;
  resize: none;
  z-index: 10;
  left:-45%;
  font-weight: 500;
  background: none;
`;

const HoldComp = (props) => (
  <HoldOuterStyle
    width={props.model.width}
    height={props.model.height}
    status={props.status}
  >
    <InnerCircle width={props.model.width} height={props.model.height}>
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
        {props.model.name === 'test' ? 'Hold' : props.model.name}
      </Name>
    </InnerCircle>
  </HoldOuterStyle>
);

class EventComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: 'Hold',
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
              left: '58px',
              zIndex: '4'
            }}
          /> */}
          <HoldComp
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
