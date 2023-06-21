import React from 'react';
import { Col, Row } from 'antd';
import Forms from './Forms';
import './FormFields.scss';
// import { DeleteOutlined } from '@ant-design/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Box,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  IconButton
} from '@material-ui/core';
import { CommonButton } from '@tt-dcpq/dcpq-common-libs';
import { ArrowForward } from '@material-ui/icons';
// import { Modal } from 'lib/components';
import { useDispatch } from 'react-redux';
import ModalsStore from "Store/Modals";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  icon: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '& svg': {
      fill: theme.palette.common.white,
      stroke: theme.palette.common.white
    }
  },
  loaderClr: {
    color:
      theme.palette.type === 'dark'
        ? `${theme.palette.common.black} !important`
        : 'primary'
  },
  footer: {
    position: 'fixed',
    padding: '10px',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    boxShadow: 'none',
    // backgroundColor: theme.palette.success.main,
    // color: theme.palette.common.white,
    minWidth: theme.spacing(30),
    '&:hover': {
      // backgroundColor: theme.palette.success.light
    }
  }
}));



const FreeStep = (props) => {
  const {
    stepList,
    loading,
    currentError,
    onInputChange,
    onDropDownChange,
    onSwitchTrigger,
    onSearchFetcher,
    fetching,
    searchOptions,
    onSearchSelected,
    searchResp,
    onRadioChange,
    onCheckBoxChange,
    onMultiDropDownChange,
    fieldStatus,
    statusId,
    onRegNumberClick,
    onDynamicBtnClick,
    onTrriggerBtnClick,
    type,
    onDeleteSection,
    disabledDate,
    formRef,
    docsInfo,
    buttonLoader,
    formStyle,
    modifyContract,
    agentForm,
    searchCommissionResp,
    searchSettelementResp,
    dmsPayload,
    contractModification,
    availableTo,
    availableFrom,
    partnerDetails,
    onClose
  } = props;

  const dispatch = useDispatch();

  const handleClose = () => {
    console.log('bug')
    onClose()
    dispatch(ModalsStore.close('createContract'));
    // dispatch(Modal.close('agentPreview'));
  }
  console.log('buttonLoader', buttonLoader)
  // useEffect(() => {
  //   formRef.setFieldsValue({
  //     ['creditDays']: riskCategory?.creditDays
  //   });
  // }, []);

  React.useEffect(() => {
    console.log('loading updated', loading)
  }, [loading])


  console.log(searchResp, "search response")
  console.log(stepList, "search response")
  const classes = useStyles();
  return (
    <>
      {stepList[0] &&
        stepList[0].sectionlist &&
        Object.keys(stepList[0].sectionlist).map((section, index) => (
          <Row key={index} gutter={[40, 60]}>
            <Col
              span={24}
              // className={formStyle ? 'tt-form-paper-col' : 'tt-form-paper-col'}
              className={'tt-form-paper-col'}
            >
              <Paper
                bordered={true}
                className={formStyle ? 'tt-form-paper' : 'tt-dashboard-card'}
                elevation={0}
              >

                <div className="section-heading">
                  {stepList[0].sectionlist[section].sectiontitle}
                  {Object.keys(currentError).length === 0 ? (
                    ''
                  ) : stepList[0].sectionlist[section].sectiontitle ===
                    currentError[
                    stepList[0].sectionlist[section].sectiontitle
                    ] ? (
                    <i className="fa fa-times-circle error-circle" />
                  ) : (
                    <i className="fa fa-check-circle check-icon" />
                  )}
                  {stepList[0].sectionlist[section]?.isDelete && (
                    <div style={{ float: 'right'}}>
                      
                      <IconButton 
                        onClick={() =>
                          onDeleteSection(
                            stepList[0].sectionlist[section].sectionName,
                            section
                          )
                        }
                      >
                        <DeleteIcon
                          style={{ position: 'relative' }}
                          color='primary'
                        />
                      </IconButton>

                    </div>
                  )}
                </div>

                <Forms
                  fieldData={stepList[0].sectionlist[section].arr}
                  onInputChange={onInputChange}
                  onDropDownChange={onDropDownChange}
                  onSwitchTrigger={onSwitchTrigger}
                  onRadioChange={onRadioChange}
                  onCheckBoxChange={onCheckBoxChange}
                  onMultiDropDownChange={onMultiDropDownChange}
                  validationStatus={fieldStatus}
                  statusId={statusId}
                  onRegNumberClick={onRegNumberClick}
                  onTrriggerBtnClick={onTrriggerBtnClick}
                  type={type ? type : ''}
                  sectionTitle={stepList[0].sectionlist[section].sectiontitle}
                  sectionIndex={section}
                  onSearchFetcher={onSearchFetcher}
                  fetching={fetching}
                  searchOptions={searchOptions}
                  onSearchSelected={onSearchSelected}
                  searchResp={searchResp}
                  searchCommissionResp={searchCommissionResp}
                  searchSettelementResp={searchSettelementResp}
                  disabledDate={disabledDate}
                  formRef={formRef}
                  docsInfo={docsInfo}
                  modifyContract={modifyContract}
                  agentForm={agentForm}
                  dmsPayload={dmsPayload}
                  contractModification={contractModification}
                  availableFrom={availableFrom}
                  availableTo={availableTo}
                  partnerDetails={props.partnerDetails}
                />
              </Paper>
              {/* )} */}
            </Col>
          </Row>
        ))}
      {stepList && stepList.length > 0 && (
        // <Box style={{ textAlign:'end`'}}>
        //   {stepList[0].stepFooter &&
        //     stepList[0].stepFooter.length > 0 &&
        //     stepList[0].stepFooter.map((btn, index) => (
        //       <Button
        //         key={index}
        //         // className={
        //         //   btn.style === 'Outlined'
        //         //     ? 'outline_btn'
        //         //     : btn.style === 'Text'
        //         //     ? 'text_btn'
        //         //     : 'contained_btn'
        //         // }
        //         variant='contained'

        //         onClick={() => onDynamicBtnClick(btn)}
        //         htmlType="submit"
        //         type={btn.style === 'Text' ? 'text' : ''}
        //         width={'300px'}
        //       >
        //         {btn.label}
        //       </Button>
        //     ))}

        // </Box>

        <Box px={8} className={classes.footer}>
          <Grid container justify="flex-end" spacing={5}>
          {/* <Grid item>
                      <CommonButton
                       
                        size="large"
                        variant="outlined"
                        color="primary"
                        // endIcon={!buttonLoader ? <ArrowForward /> : null}
                        className={classes.button}
                        onClick={handleClose}
                      // htmlType="submit"
                      >
                       
                        {"CLEAR"}
                      </CommonButton>
                    </Grid> */}
            {stepList[0].stepFooter &&
              stepList[0].stepFooter.length > 0 &&
              stepList[0].stepFooter?.map((btn, index) => {
                console.log(btn, "button")
                if (btn.buttonType === 'cancel') {

                  return (
                    <Grid item>
                      <CommonButton
                        key={index}
                        size="large"
                        variant="outlined"
                        color="primary"
                      
                        // endIcon={!buttonLoader ? <ArrowForward /> : null}
                        className={classes.button}
                        onClick={handleClose}
                      // htmlType="submit"
                      >
                        {
                          console.log('btn from Free Step 1', btn)

                        }
                        {btn.label}
                      </CommonButton>
                    </Grid>
                  );
                } else if (btn.buttonType === 'proceed') {
                  console.log('btn from Free Step 2', btn)
                  console.log('loading from freestep', loading)


                  return (
                    <Grid item>
                      <CommonButton
                        key={index}
                        size="large"
                        variant="contained"
                        color="primary"
                        // endIcon={!buttonLoader ? <ArrowForward /> : null}
                        className={classes.button}
                        onClick={() => onDynamicBtnClick(btn)}
                        htmlType={'submit'}
                        disabled={buttonLoader}
                        type={btn.style === 'Text' ? 'text' : ''}
                        endIcon={<ArrowForward />}
                      >
                        {loading ? (
                          <CircularProgress
                            size={25}
                            style={{ color: 'green' }}
                          />
                        ) : (
                          btn.label
                        )}
                        {/* {} */}
                      </CommonButton>
                    </Grid>
                  );
                } else if (btn.buttonType === 'save') {
                  console.log('loading in save button', loading)
                  return (
                    <Grid item>
                      <CommonButton
                        key={index}
                        size="large"
                        variant="contained"
                        color="primary"
                        // endIcon={!buttonLoader ? <ArrowForward /> : null}
                        className={classes.button}
                        onClick={() => onDynamicBtnClick(btn)}
                        htmlType={'submit'}
                        disabled={buttonLoader}
                        type={btn.style === 'Text' ? 'text' : ''}
                        endIcon={<ArrowForward />}
                      >
                        {loading ? (
                          <CircularProgress
                            size={25}
                            style={{ color: 'green' }}
                          />
                        ) : (
                          btn.label
                        )}
                        {/* {} */}
                      </CommonButton>
                    </Grid>
                  );
                }
                else {
                  return (
                    <Grid item>
                      <CommonButton
                        key={index}
                        size="large"
                        variant="contained"
                        color="primary"
                        // endIcon={!buttonLoader ? <ArrowForward /> : null}
                        className={classes.button}
                        onClick={() => onDynamicBtnClick(btn)}
                        htmlType={'submit'}
                        disabled={buttonLoader}
                        type={btn.style === 'Text' ? 'text' : ''}
                        endIcon={<ArrowForward />}
                      >
                        {
                          console.log('btn from Free Step from cancel', btn)

                        }
                        {loading ? (
                          <CircularProgress
                            size={25}
                            style={{ color: 'green' }}
                          />
                        ) : (
                          btn.label
                        )}
                        {/* {} */}
                      </CommonButton>
                    </Grid>
                  );
                }
              })}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default FreeStep;
