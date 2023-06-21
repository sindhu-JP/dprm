import React, { useState, useEffect } from 'react';
// import { API } from '../../utils/API';
import {
  Table,
  message,
  Space,
  Button,
  Row,
  Col,
  Input,
  Modal,
  Popconfirm
} from 'antd';
// import { LoadingSpin } from '../../Loading/LoadingSping';
import EditLinkCollection from './EditLinkCollection';
import { useLocation } from 'react-router-dom';
// import config from 'config';
import BulkUpload from 'components/BulkUpload/BulkUpload';
import FormtaskModal from '../FormFields/FormtaskModal';
// import './LinkCollection.scss';
import { useHistory } from 'react-router-dom';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { TecnotreedigitalSales } from '../../Http/axios';

function LinkList(props) {
  const history = useHistory();
  const location = useLocation();
  const [columns, setColumn] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [collectionList, setCollectionList] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [ApiData, setApiData] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [currentCollection, setCurrentCollection] = useState('');
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [TempData, setTempData] = useState([]);
  const [isBulkUpload, setIsBulkupload] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [buttonsData, setButtonsData] = useState([]);
  const [popoupData, setPopupData] = useState('');
  const [showBlackListModal, setShowBlacklistModal] = useState(false);
  const [seeBlacklistPopup, setSeeBlacklistPopup] = useState(false);
  const [showFormtaskModal, setShowFormtaskModal] = useState(false);
  const [taskResponse, setTaskResponse] = useState('');
  const [formIdentity, setFormIdentity] = useState('');

  //   useEffect(() => {
  //     LoadingSpin(true);
  //     let collectionLst = location.state.listCollection
  //       ? location.state.listCollection
  //       : {};
  //     if (collectionLst.link) {
  //       getCollectionList(collectionLst.link);
  //     }
  //   }, [location.state.listCollection]);
  useEffect(() => {
    getCollectiondata();
  }, []);
  const getCollectionList = (link) => {
    API.get(`/listpermission?id=${link}`)
      // TecnotreedigitalSales.get(`/list/LINKEDFORMOZBYY967?Partner_ID=MP3INRGL`)
      .then((resp) => {
        setCollectionList(resp.data[0]);
        if (resp.data[0].filters && resp.data[0].filters.length > 0) {
          let search = [];
          resp.data[0].filters.forEach((searchItem, i) => {
            let item = {
              id: i,
              name: searchItem,
              value: ''
            };
            search.push(item);
          });
          setSearchList([...search]);
        }
        let linkId = resp.data[0].linkListId,
          isEditing = false,
          isDeleting = false,
          isButton = resp.data[0].buttons,
          permissions = resp.data[0].permissions;
        permissions &&
          permissions.forEach((element) => {
            if (element === 'View') {
              setIsView(true);
            } else if (element === 'Edit') {
              isEditing = true;
              setIsEdit(true);
            } else if (element === 'Delete') {
              isDeleting = true;
              setIsDelete(true);
            }
          });
        linkId &&
          setTimeout(() => {
            //getCollectiondata(linkId, isEditing, isDeleting, isButton);
            getCollectiondata();
          }, 1000);
        setButtonsData(isButton);
        setCurrentCollection(linkId);
      })
      .catch((err) => {});
  };

  const getCollectiondata = () => {
    // LoadingSpin(true);
    // API.get(`/list/${val}`)
    TecnotreedigitalSales.get(`/list/LINKEDFORMOZBYY967?Partner_ID=MP3INRGL`)
      .then((resp) => {
        setApiData({ ...resp.data[0] });

        let data = [],
          finalArr = [],
          isreviewEdit = isEditing ? isEditing : isEdit,
          isreviewDelete = isDeleting ? isDeleting : isDelete,
          respData = resp.data[0],
          headers = resp.data[0].headerList;
        data = getHeaders(
          headers,
          isreviewEdit,
          isreviewDelete,
          respData,
          val,
          isButton
        );

        finalArr = getTableData(resp);
        setColumn(data);
        setDataSource(finalArr);
        setTempData(finalArr);
        // LoadingSpin(false);
      })
      .catch((err) => {
        if (err.response) {
          try {
            // LoadingSpin(false);
            message.error(`${err.response.data.message}`, 1);
          } catch (erry) {
            // LoadingSpin(false);
            message.error(`${erry.message}`, 1);
          }
        }
      });
  };
  const onEditClick = (record) => {
    setIsModalOpen(true);
    setSelectedRow(record);
  };

  const getHeaders = (
    headers,
    isEditing,
    isDeleting,
    respData,
    linkId,
    isButton
  ) => {
    let data = [];
    if (headers) {
      for (let i = 0; i < headers.length; i++) {
        let item = {
          title: headers[i],
          dataIndex: headers[i],
          key: headers[i]
        };

        data.push(item);
      }
    }
    let edit = {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          {isEditing && (
            <Space size="middle">
              <label
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                  paddingRight: '10px'
                }}
                onClick={() => onEditClick(record)}
              >
                Edit
              </label>
            </Space>
          )}
          {isDeleting && (
            <Popconfirm
              title="Are you sure to delete this Row?"
              onConfirm={() =>
                onDeleteClick(record, respData, linkId, isEditing, isDeleting)
              }
              // onCancel={() => console.log('cancel')}
              okText="Yes"
              cancelText="No"
            >
              <Space size="middle">
                <label
                  style={{
                    color: 'blue',
                    cursor: 'pointer',
                    paddingRight: '10px'
                  }}
                >
                  Delete
                </label>
              </Space>
            </Popconfirm>
          )}
          {isButton.length > 0 ? getButtons(isButton, record) : ''}
        </>
      )
    };
    data.push(edit);
    return data;
  };

  const getButtons = (buttonData, record) => {
    return buttonData.map((item) => {
      return (
        <Button
          type="primary"
          onClick={() => onredirectButtonClick(item, record)}
          icon={<i className={`fa fa-${item.iconName}`} aria-hidden="true"></i>}
        >
          {item.name}
        </Button>
      );
    });
  };

  const onredirectButtonClick = (data, record) => {
    try {
      if (data.subMenuId && data.subMenuId.id) {
        triggerMenu(data.subMenuId, record);
      } else if (data.menuId && data.menuId.id) {
        triggerMenu(data.menuId, record);
      } else if (data.workFlowId && data.workflowName) {
        triggerWorkflow(data, record);
      }
    } catch (erry) {
      if (data.subMenuId && data.subMenuId.id) {
        triggerMenu(data.subMenuId, record);
      } else if (data.menuId && data.menuId.id) {
        triggerMenu(data.menuId, record);
      } else if (data.workFlowId && data.workflowName) {
        triggerWorkflow(data, record);
      }
    }
  };

  const triggerWorkflow = (data, record) => {
    LoadingSpin(true);
    let userName =
        localStorage.getItem('USER') &&
        JSON.parse(localStorage.getItem('USER')).sub,
      userRole = localStorage.getItem('roleId'),
      Ebody = {},
      newVal = { ...record };
    Ebody['username'] = userName.sub;
    Ebody['userId'] = localStorage.getItem('signinId');
    Ebody['userRole'] = userRole;
    Ebody['executionModeStatus'] = false;
    Ebody['async'] = false;
    Ebody['workflowId'] = data.workFlowId;
    Ebody['formIdentity'] = record.formIdentity;
    Ebody['stepIdentity'] = record.stepIdentity;
    Ebody['Values'] = { ...newVal };
    Ebody['Values']['username'] = userName;
    Ebody['Values']['merchantId'] = localStorage.getItem('merchantId');
    Ebody['Values']['accessToken'] = localStorage.getItem('ACCESS_TOKEN');
    API.post('/bpmn/executeProcess', Ebody)
      .then((resp) => {
        if (resp.data.notification) {
          if (
            resp.data.notification.typeofResponse &&
            resp.data.notification.typeofResponse === 'popup'
          ) {
            let tempData = [];
            for (let object in resp.data.notification) {
              if (object.startsWith('*')) {
                let temp = {
                  label: object.substring(1),
                  value: resp.data.notification[object]
                };
                tempData.push(temp);
              }
            }

            let finalData = {
              notification: resp.data.notification,
              fieldData: tempData
            };
            setPopupData(finalData);
            LoadingSpin(false);
            setShowBlacklistModal(true);
          }
        } else if (resp.data.taskType === 'FormTask') {
          resp.data.Values.form_formIdentity
            ? setFormIdentity(resp.data.Values.form_formIdentity)
            : '';
          setShowFormtaskModal(true);
          let parseData = JSON.parse(resp.data.taskResponse);
          setTaskResponse(parseData);
        } else {
          LoadingSpin(false);
        }
      })
      .catch((err) => {
        LoadingSpin(false);
        if (err.response) {
          let apires = err.response.data ? err.response.data?.apiResponse : {};
          Modal.error({
            className: 'modal-error-content',
            title: 'This is an error message',
            content: (
              <>
                <Row>
                  <Col span={10}>
                    <b> Error Message : </b>{' '}
                  </Col>{' '}
                  <Col span={14}> {apires?.body} </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    {' '}
                    <b>status Code : </b>{' '}
                  </Col>{' '}
                  <Col> {apires?.statusCode} </Col>
                </Row>
                <Row>
                  <Col span={10}>
                    {' '}
                    <b> Status Code Value : </b>
                  </Col>{' '}
                  <Col> {apires?.statusCodeValue} </Col>
                </Row>
              </>
            )
          });
        }
      });
  };

  const triggerMenu = (menu, record) => {
    if (menu.isForm) {
      history.push({
        pathname: `${config.basePath}formSubmission`,
        state: {
          formIdentity: menu.link,
          prefillFormData: record
        }
      });
    } else if (menu.isFormList) {
      history.push({
        pathname: `${config.basePath}formList`,
        state: {
          formIdentity: menu
        }
      });
    } else if (menu.isDynamicLink) {
      history.push({
        pathname: `${config.basePath}linkCollection`,
        state: {
          listCollection: menu
        }
      });
    } else {
      if (menu.link) {
        history.push(`${config.basePath}${menu.link}`);
      }
    }
  };

  const onDeleteClick = (record, data = val, linkId, isEditing, isDeleting) => {
    try {
      let rowList = data.rowList;
      let filterRow = rowList.filter((row) => {
        return data[row].some(
          (item) => item.refNoRegistartion === record.refNoRegistartion
        );
      });
      let filterArr = data[filterRow];
      let body = {};
      body[filterRow[0]] = filterArr;
      body['rowList'] = filterRow;
      API.post('/list', body)
        .then((resp) => {
          // console.log('resp', currentCollection);
          //getCollectiondata(linkId, isEditing, isDeleting, buttonsData);
          getCollectiondata();
        })
        .catch((err) => err);
    } catch (err) {
      let error = 'err';
    }
  };

  const getTableData = (resp) => {
    let rowList = resp.data[0].rowList,
      finalArr = [],
      jsonData = resp.data[0];
    finalArr = rowList.map((row) => {
      let obj = {};
      if (jsonData[row]) {
        jsonData[row].forEach((item) => {
          obj = Object.assign(obj, item);
        });
        return obj;
      }
    });
    return finalArr;
  };
  const handleEditOk = (editedValue, slectedItem, selectedrow) => {
    let rowList = ApiData.rowList;
    if (editedValue[slectedItem]) {
      setEditLoading(true);
      let filterRow = rowList.filter((row) => {
        return ApiData[row].some(
          (item) => item.refNoRegistartion === selectedrow.refNoRegistartion
        );
      });
      let filterArr = ApiData[filterRow];
      let findObj = filterArr.filter((item) => item[slectedItem]);
      let jsonDatatrig = {
        field: slectedItem,
        value: editedValue[slectedItem],
        formIdentity: findObj[0].formIdentity,
        stepIdentity: findObj[0].stepIdentity,
        _id: findObj[0]._id,
        refNoRegistartion: findObj[0].refNoRegistartion
      };
      API.patch('/list', jsonDatatrig)
        .then((resp) => {
          // getCollectiondata(currentCollection, isEdit, isDelete, buttonsData);
          getCollectiondata();
          setEditLoading(false);
          setIsModalOpen(false);
        })
        .catch((err) => {
          setIsModalOpen(false);
          setEditLoading(false);
        });
    } else {
      setEditLoading(false);
      message.warn('Please double click on any field to edit ... ', 3);
    }
  };
  const handleEditCancel = () => {
    setIsModalOpen(false);
    setSelectedRow({});
  };

  const onEditInput = (value, item, selectedRow) => {
    selectedRow[item] = value;
    setSelectedRow({ ...selectedRow });
  };

  const onSearchChange = (value, id) => {
    let search = searchList;
    search[id].value = value;
    setSearchList([...search]);
  };

  const onSearch = (isEditing, isDeleting) => {
    let search = {};
    searchList.forEach((item) => {
      if (item.value !== '') {
        search[item.name] = item.value;
      }
    });
    if (Object.keys(search).length <= 0) {
      message.warning('Search body is empty!!', 1.5);
      return;
    }
    LoadingSpin(true);
    let body = {
      linkedFormId: collectionList.linkListId,
      search: search
    };
    API.post(`/filterlist`, body)
      .then((resp) => {
        // console.log('called here', resp, currentCollection);
        // setApiData({ ...resp.data[0] })

        let data = [],
          finalArr = [],
          isreviewEdit = isEditing ? isEditing : isEdit,
          isreviewDelete = isDeleting ? isDeleting : isDelete,
          respData = resp.data[0],
          headers = resp.data[0].headerList;
        data = getHeaders(
          headers,
          isreviewEdit,
          isreviewDelete,
          respData,
          currentCollection,
          buttonsData
        );
        finalArr = getTableData(resp);

        setColumn(data);
        setDataSource(finalArr);

        LoadingSpin(false);
      })
      .catch((err) => {
        LoadingSpin(false);
      });
  };

  const onReset = () => {
    let reset = searchList.map((item) => {
      item.value = '';
      return item;
    });
    let data = [...TempData];
    setDataSource(data);
    setSearchList([...reset]);
  };
  const handleFormtaskModalCancel = () => {
    setShowFormtaskModal(false);
  };
  const handleFormtaskModalOk = () => {
    setShowFormtaskModal(false);
  };
  const onAddRow = () => {
    let obj = ApiData;
    if (obj.formIdentity) {
      props.history.push({
        pathname: `${config.basePath}formSubmission`,
        state: {
          formIdentity: obj.formIdentity
        }
      });
    }
  };

  const onBulkUpload = () => {
    setIsBulkupload(true);
  };

  const onCancelClick = () => {
    setShowBlacklistModal(false);
    setTimeout(() => {
      setSeeBlacklistPopup(false);
    }, 100);
  };

  return (
    <div style={{ marginTop: '20px', marginLeft: '20px' }}>
      <Row justify="end"></Row>
      {searchList.length > 0 && (
        <Row style={{ marginBottom: '10px' }}>
          <Col span={14}>
            <Row>
              {searchList.map((item) => (
                <Col span={6} key={item.id}>
                  <div className="search-list-label">{item.name}</div>
                  <Input
                    placeholder={`Enter ${item.name}`}
                    style={{ width: '100%' }}
                    name={item.name}
                    value={item.value}
                    onChange={({ target }) =>
                      onSearchChange(target.value, item.id)
                    }
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={10} style={{ marginTop: '20px' }}>
            <Button type="primary" onClick={() => onSearch(isEdit, isDelete)}>
              Search
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: '5px' }}
              onClick={onReset}
            >
              Reset
            </Button>
            {ApiData.join === false && (
              <>
                <Button
                  type="primary"
                  style={{ marginLeft: '5px' }}
                  onClick={onAddRow}
                >
                  Add Row
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: '5px' }}
                  onClick={onBulkUpload}
                >
                  Bulk Upload
                </Button>
              </>
            )}
          </Col>
        </Row>
      )}

      <div className="link-list-table">
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record.refNoRegistartion}
        />
      </div>
      {isModalOpen && (
        <EditLinkCollection
          visible={isModalOpen}
          selectedRow={selectedRow}
          handleEditCancel={handleEditCancel}
          handleEditOk={handleEditOk}
          onEditInput={onEditInput}
          editLoading={editLoading}
          isEdit={isEdit}
          isView={isView}
        />
      )}
      {isBulkUpload && (
        <Modal
          title="Bulkupload"
          visible={isBulkUpload}
          onOk={() => setIsBulkupload(false)}
          onCancel={() => setIsBulkupload(false)}
          width={1000}
          maskClosable={false}
        >
          <BulkUpload
            formName={ApiData.formIdentity ? ApiData.formIdentity : ''}
          />
        </Modal>
      )}

      {showFormtaskModal && (
        <FormtaskModal
          visible={showFormtaskModal}
          handleOk={handleFormtaskModalOk}
          handleCancel={handleFormtaskModalCancel}
          formIdentityName={formIdentity}
          taskResponse={taskResponse}
        />
      )}
      {showBlackListModal ? (
        <Modal
          visible={showBlackListModal}
          closable={false}
          footer={null}
          maskClosable={false}
          className="dropdown-modal"
          maskStyle={{ background: '#2F3542 0% 0% no-repeat', opacity: 0.87 }}
        >
          <div className="popup-heading">
            <div className="popup-heading-msg">
              {popoupData &&
                popoupData.notification &&
                popoupData.notification.header}
            </div>
            <div>
              {popoupData.notification &&
              popoupData.notification.status &&
              popoupData.notification.status === 'success' ? (
                <CheckCircleOutlined
                  style={{ fontSize: ' 40px', color: 'green' }}
                />
              ) : popoupData.notification.status === 'warning' ? (
                <WarningOutlined
                  style={{ fontSize: ' 40px', color: '#ffc107' }}
                />
              ) : popoupData.notification.status === 'error' ? (
                <CloseCircleOutlined
                  style={{ fontSize: ' 40px', color: 'tomato' }}
                />
              ) : (
                ''
              )}
            </div>

            <div>{popoupData && popoupData.notification.message}</div>
          </div>
          <Row
            gutter={[48, 16]}
            justify="space-between"
            style={{ marginTop: '30px' }}
          >
            {popoupData &&
              popoupData.fieldData &&
              popoupData.fieldData.map((item, index) => (
                <Col span={12} key={index}>
                  <div className="popup-label">{item.label}</div>
                  <div className="popup-value">{item.value}</div>
                </Col>
              ))}
          </Row>
          <div style={{ textAlign: 'right', marginTop: 20 }}>
            {!seeBlacklistPopup ? (
              <>
                <Button
                  type="text"
                  className="cancel-btn"
                  onClick={onCancelClick}
                  endIcon={<NavigateNext />}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  className="submit-btn"
                  onClick={onCancelClick}
                  endIcon={<NavigateNext />}
                >
                  Ok
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                className="submit-btn"
                onClick={onCancelClick}
                endIcon={<NavigateNext />}
              >
                Ok
              </Button>
            )}
          </div>
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
}

export default LinkList;
