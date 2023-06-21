import { Box, Grid } from '@material-ui/core';
import Bottonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';
import { useStateful } from 'react-hanger';
import OtherSpecification from './OtherSpecification';
import ProductDetails from './ProductDetails';
import ProductLaunch from './ProductLaunch';
import ProductOffering from './ProductOffering';
import ProductSpecification from './ProductSpecification';
import StatusCard from './StatusCard';

export default function DcmSpecification({
  onClose,
  modalContext,
  open,
  LaunchDCM
}) {
  const DcmList = useStateful({});

  const selectedValue = useStateful({});
  React.useEffect(() => {
    if (modalContext) {
      DcmList.setValue(modalContext);
    }
  }, [modalContext]);

  const handleTag = (value) => {
    if (value) {
      selectedValue.setValue(value.code);
    }
  };

  return (
    <div>
      <Bottonsheet open={open} onClose={onClose}>
        <Box py={9} px={10}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <StatusCard DcmStatus={DcmList.value?.columns} />
            </Grid>
            <Grid item>
              <ProductDetails productDetails={DcmList.value} />
            </Grid>

            <Grid item>
              <ProductOffering handleTag={handleTag} />
            </Grid>

            {selectedValue.value === 'SimpleProduct' && (
              <>
                <Grid item>
                  <ProductSpecification />
                </Grid>

                <Grid item>
                  <OtherSpecification />
                </Grid>
              </>
            )}

            {selectedValue.value === 'ComplexProduct' && (
              <Grid item>
                <ProductLaunch LaunchDCM={LaunchDCM} />
              </Grid>
            )}
          </Grid>
        </Box>
      </Bottonsheet>
    </div>
  );
}
