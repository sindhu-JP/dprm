import React, { useState } from 'react';
import { DatePicker, Input, Select, Row, Col, Form } from 'antd';
import { Button } from '@material-ui/core';
import moment from 'moment';
import config from 'config';
const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 22 }
};

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

const FormUploadDrawer = ({ onSubmitDocument }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('sss');
    setIsDisabled(true);
    onSubmitDocument(values);
    // window.location.reload();
    values.issueBy = config?.dev?.server?.ISSUED_BY;
    values.issuePlace = config?.dev?.server?.ISSUE_PLACE;
    setTimeout(() => {
      onSubmitDocument(values);
    }, 800);
    setLoading(true);
  };

  const onReset = () => {
    form.resetFields();
  };

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
          <Col span={6}>
            <Form.Item
              label="DOCUMENT TYPE"
              name="documentype"
              rules={[
                { required: true, message: 'Please input your DOCUMENT TYPE!' }
              ]}
            >
              <Select
                getPopupContainer={(node) => node.parentNode}
                placeholder="Select Type"
              >
                <Option value={'ID Proof'}>Id Proof</Option>
                <Option value={'Product Broucher'}>Product Broucher</Option>
                <Option value={'Signoff Document'}>Signoff Document</Option>
                {/* <Option value={'Company registration'}>
                  Company Registration
                </Option>
                <Option value={'Product brochure'}>Product Brochure</Option>
                <Option value={'Contract Form'}>Contract Form</Option> */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
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
          <Col span={6}>
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
          </Col>
          <Col span={6}>
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
          </Col>
        </Row>
        <Row>
          <Col span={6}>
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
          </Col>
          <Col span={6}>
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
          <Col span={6}>
            <Form.Item
              label="ISSUED BY"
              name="issueBy"          
            >
              <Input defaultValue={config?.dev?.server?.ISSUED_BY} disabled />
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
              Submit
            </Button>{' '}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default FormUploadDrawer;
