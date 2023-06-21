import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';
import PartnerApi from 'Http/api/Partner';
import { useStateful } from 'react-hanger';

import { Grid } from '@material-ui/core';

import BottomSheetFormFields from 'Features/Forms/BottomSheetFormFields';

import { useDispatch } from 'react-redux';

const ModifyContract = ({
  open,
  onClose,
  modalcontext,
  getproductLists,
  productrowlist
}) => {
  const details = useStateful({});

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const ContractDetails = useStateful({});
  const getContractDetail = async (id) => {
    let Details = await PartnerApi.getContractDetails(
      _.get(
        modalcontext.details,
        'rowlist.AddProduct.ProductDetails.Contract_ID',
        ''
      ) || _.get(modalcontext.details, 'columns.id', '')
    );

    ContractDetails.setValue(_.get(Details, '[0]', ''));
  };
  React.useEffect(() => {
    getContractDetail();
  }, []);

  return (
    <div>
      <Buttonsheet open={true} onClose={onClose} header={'Modify Contract'}>
        {!_.isEmpty(ContractDetails.value) ? (
          <BottomSheetFormFields
            editable="true "
            prefilledData={ContractDetails.value}
            formIdentity="Add_Contract"
          />
        ) : (
          ''
        )}

        <Grid container direction="column" spacing={6}></Grid>
      </Buttonsheet>
    </div>
  );
};

export default ModifyContract;
