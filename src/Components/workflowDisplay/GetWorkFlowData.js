import { Row, Col, Select, Table, Space, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { API } from 'utils/API';
import DisplayWorkFlow from './displayWorkflow';
import { connect } from 'react-redux';
import { setWorkflowStatus } from 'redux/actions/WorkflowTriggerAction';
import { LoadingSpin } from 'Loading/LoadingSping';

const { Option } = Select;

const GetWorkFlowData = (props) => {
  const [grpList, setGrpList] = useState([]);
  const [WrFlowList, setWorkflowList] = useState([]);
  const [workFlowData, setWorkFlowData] = useState({});
  const [displayModal, setDisplaymodal] = useState(false);

  const onVeiwWorkFlow = (record) => {
    LoadingSpin(true);
    API.get(`/createworkflow/${record._id}`)
      .then((resp) => {
        let response = resp.data ? resp.data : {};
        props.setWorkflowStatus(record.nodeId ? record.nodeId : '');
        setTimeout(() => {
          setWorkFlowData(response);
          setDisplaymodal(true);
          LoadingSpin(false);
        }, 1000);
      })
      .catch((err) => {
        LoadingSpin(false);
      });
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => onVeiwWorkFlow(record)}> View</a>
        </Space>
      )
    }
  ];

  useEffect(() => {
    API.get('/RBAC/get_group')
      .then((resp) => {
        setGrpList(resp.data);
      })
      .catch((err) => {});
  }, []);

  const onChangeGrp = (val) => {
    LoadingSpin(true);
    API.get(`/bpmncategory?groupid=${val}`)
      .then((resp) => {
        setWorkflowList(resp.data);
        LoadingSpin(false);
      })
      .catch((err) => {
        LoadingSpin(false);
      });
  };

  const handleWorkFlowOk = () => {
    setDisplaymodal(false);
    setWorkFlowData({});
    props.setWorkflowStatus('');
  };
  const handleWorkFlowCancel = () => {
    setDisplaymodal(false);
    setWorkFlowData({});
    props.setWorkflowStatus('');
  };

  return (
    <>
      <Row style={{ margin: 8 }}>
        <Select
          style={{ width: 200 }}
          placeholder="Select Group"
          onChange={(value) => onChangeGrp(value)}
        >
          {grpList.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.groupName}
            </Option>
          ))}
        </Select>
      </Row>
      <Row>
        <div className="workFlowTable">
          <Table
            columns={columns}
            dataSource={WrFlowList}
            rowKey={(record) => record._id}
          />
        </div>
      </Row>
      {displayModal && (
        <Modal
          title="Work Flow"
          visible={displayModal}
          onOk={handleWorkFlowOk}
          width="80vw"
          onCancel={handleWorkFlowCancel}
        >
          <DisplayWorkFlow workflowTaskData={workFlowData} />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  workflowStatus: state.setWorkflowReducer.workflowStatus
});

export default connect(mapStateToProps, { setWorkflowStatus })(GetWorkFlowData);
