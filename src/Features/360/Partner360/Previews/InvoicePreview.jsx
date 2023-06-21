import Buttonsheet from 'Components/ButtonSheets/Buttonsheet';
import React from 'react';

import { Grid, Typography, Box } from '@material-ui/core';

import InvoiceDetails from 'Components/Details/InvoiceDetails';
import OfferDetails from 'Components/Details/OfferDetails';
import SettlementDetails from 'Components/Details/SettlementDetails';
import _ from 'lodash';
import BillingAdjustmentsDetails from 'Components/Details/BillingAdjustmentsDetails';

export default function InvoicePreview({
  open,
  onClose,
  modalcontext,
  user,
  InvoicePreviewDetails,
  orderRowdetails,
  getOrderdetails,
  OrderProductlist,
  orderPayload,
  billingAdjustmentRow,
  balance
}) {
  React.useEffect(() => {
    getOrderdetails({ id: _.get(modalcontext, 'details.columns.id', '') });
  }, []);

  return (
    <div>
      <Buttonsheet open={open} onClose={onClose} header={''}>
        <Box px={18}>
          <Grid
            container
            spacing={2}
            style={{ display: 'flex', alignItems: 'center' }}
            // y={1}
          >
            <Grid>
              <Grid item>
                <Typography variant="h2">
                  {_.get(modalcontext, 'partner.mainlist.partnerName', '--')}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="caption">
                  Partner ID:{' '}
                  {_.get(modalcontext, 'partner.mainlist.partnerId', '--')} |
                  Products:
                  {_.get(modalcontext, 'partner.mainlist.productCount', 0)} |
                  Contracts:{' '}
                  {_.get(modalcontext, 'partner.mainlist.contractCount', 0)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            spacing={3}
            style={{ marginTop: '1rem' }}
          >
            {modalcontext.component === 'invoice' ? (
              <Grid item>
                <InvoiceDetails
                  invoicedetails={modalcontext?.details?.rowlist}
                  balance={balance}
                />
              </Grid>
            ) : modalcontext.component === 'Settlement' ? (
              <Grid item>
                <SettlementDetails
                  Settlementedetails={modalcontext?.details?.rowlist}
                  balance={balance}
                />
              </Grid>
            ) : (
              ''
            )}

            <Grid item>
              <OfferDetails
                InvoicePreviewDetails={InvoicePreviewDetails}
                orderRowdetails={orderRowdetails}
                orderPayload={orderPayload}
                OrderProductlist={OrderProductlist}
                balance={balance}
              />
            </Grid>
            <Grid item>
              <BillingAdjustmentsDetails
                InvoicePreviewDetails={InvoicePreviewDetails}
                orderRowdetails={orderRowdetails}
                orderPayload={orderPayload}
                OrderProductlist={OrderProductlist}
                billingAdjustmentRow={billingAdjustmentRow}
              />
            </Grid>
          </Grid>
        </Box>
      </Buttonsheet>
    </div>
  );
}
