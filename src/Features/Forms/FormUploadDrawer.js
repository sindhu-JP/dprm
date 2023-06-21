import React, { useState, useEffect} from 'react';
import { DatePicker, Input, Select, Row, Col, Form } from 'antd';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { CircularProgress } from '@material-ui/core';
import config from 'config';
import masterdata from 'Http/api/masterdata';


const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 22 }
};

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

const FormUploadDrawer = ({ onSubmitDocument, uploadType}) => {


  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false)
  const [masterData, setMasterData] = useState([])
 
  console.log('loading', loading, masterData)

  const handleGetMasterData = async () => {
    const data = await masterdata.DprmMasterdata();
    console.log(data, "datazzz")
  
     setMasterData(data[0].masterData)
  };
  useEffect(() => {
    handleGetMasterData();
  }, []);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('sss');
    values.issueBy = config?.dev?.server?.ISSUED_BY;
    values.issuePlace = config?.dev?.server?.ISSUE_PLACE;
    setIsDisabled(true);
    
    setTimeout(() => {
      onSubmitDocument(values);
    }, 800);
    
    setLoading(true)
  };

  const onReset = () => {
    form.resetFields();
  };

  React.useEffect(() => {
    console.log('loading from FormUploadDrawer', loading)
    // setLoading(false)
  }, [loading])

  const onFinishFailed = (errorInfo) => { };
  function disabledDate(current) {
    return current && current > moment().startOf('day');
  }
  return (
    <>
      <Form
        {...layout}
        layout={'vertical'}
        name="Filedocument"
        onFinish={onFinish}
        form={form}
        onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col span={!(uploadType === "reciept") ? 6 : 12}>
            <Form.Item
              label="DOCUMENT TYPE"
              name="documentype"
             
            >
              {/* <Select
                getPopupContainer={(node) => node.parentNode}
                placeholder="Select Type"
                onChange={(e)=> values.documentType = e.target.value}
              >
                {
                  masterData?.documentType?.map((el)=> (
                    <Option value={el.code}>{el.name}</Option>
                  ))
                }
                 */}
                  <Input defaultValue={uploadType?.startsWith("MP") ? 'Partner' : uploadType}/>
                {/* <Option value={'Company registration'}>
                  Company Registration
                </Option>
                <Option value={'Product brochure'}>Product Brochure</Option>
                <Option value={'Contract Form'}>Contract Form</Option> */}
              {/* </Select> */}
            </Form.Item>
          </Col>
          <Col span={!(uploadType === "reciept") ? 6 : 12}>
            <Form.Item
              label="DOCUMENT NAME"
              name="documentName"
              rules={[
                { required: true, message: 'Please input your DOCUMENT NAME!' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {!(uploadType === "reciept") && <Col span={6}>
      
          <Form.Item
            label="IDENTIFICATION NUMBER"
            name="registerationNumber"
            rules={[
              {
                required: true,
                message: 'Please input your REGISTRATION NUMBER!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          
        </Col>}
        {!(uploadType === "reciept") &&  <Col span={6}>
         
            <Form.Item
              label="ISSUE DATE"
              name="issueDate"
              rules={[
                { required: true, message: 'Please input your ISSUE DATE!' }
              ]}
            >
              <DatePicker
                format={dateFormat}
                getPopupContainer={(node) => node.parentNode}
                disabledDate={(current) => {
                  //  return current && current > moment().add(1,'day');
                  return current && current > moment().startOf(1, 'day');
                }}
              />
            </Form.Item>
            
          </Col>}
        </Row>
        <Row>
        {!(uploadType === "reciept") && <Col span={6}>
       
            <Form.Item
              label="EXPIRY DATE"
              name="expiryDate"
              rules={[
                { required: true, message: 'Please input your EXPIRY DATE!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      Date.parse(getFieldValue('issueDate')) < Date.parse(value)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('End Date Should be Greater then issue date')
                    );
                  }
                })
              ]}
            >
              <DatePicker
                format={dateFormat}
                getPopupContainer={(node) => node.parentNode}
                disabledDate={(current) => {
                  return current && current < moment().startOf('day');
                }}

              // disabledDate={disabledDate}
              />
            </Form.Item>
            
          </Col>}
          <Col span={!(uploadType === "reciept") ? 6 : 12}>
            <Form.Item
              label="ISSUE PLACE"
              name="issuePlace"          
            >
             <Input defaultValue={config?.dev?.server?.ISSUE_PLACE} disabled />
              {/* <Select
                getPopupContainer={(node) => node.parentNode}
                placeholder="Select Type"
              >
                <Option value={'Kuwait'}>Kuwait</Option>
              </Select> */}
            </Form.Item>
          </Col>
          <Col span={!(uploadType === "reciept") ? 6 : 12}>
            <Form.Item
              label="ISSUED BY"
              name="issueBy"            
            >
               <Input defaultValue= {config?.dev?.server?.ISSUED_BY} disabled />
            </Form.Item>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row justify="end" style={{gap:'10px'}}>
        <Col>
            {' '}
            <Button
              variant="contained"
              color="primary"
              type="button"
              disabled={isDisabled}
              onClick={onReset}
              //  endIcon={<NavigateNext />}
            >
              Reset
            </Button>{' '}
          </Col>
          <Col>
            {' '}
            <Button
              variant="contained"
              color="primary"
              disabled={isDisabled}
              type="submit"
            // endIcon={<NavigateNext />}
            >
              {loading ? <CircularProgress size={25} style={{ color: 'green' }} /> : 'Submit'}
            </Button>{' '}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FormUploadDrawer;
