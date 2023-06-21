import React from 'react';
import {
  Diagram,
  store as diagramStore,
  setEntities,
  setConfig
} from 'react-flow-diagram';
import { config, customEntities } from './config-example';
import './workflowHistory.scss';

class ViewWorkFlow extends React.PureComponent {
  UNSAFE_componentWillMount() {
    diagramStore.dispatch(setConfig(config));
  }

  componentDidMount() {
    let task = Object.values(this.props.workflowTaskData.task);
    diagramStore.dispatch(setEntities(task.length > 0 ? task : []));
  }
  render() {
    return (
      <>
        <div className="display-history">
          <Diagram customEntities={customEntities} />
        </div>
      </>
    );
  }
}

export default ViewWorkFlow;
