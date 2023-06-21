import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { useStateful } from 'react-hanger';
import { connect } from 'react-redux';
import Documentcontroller from 'Controllers/Documents';

const ProductDetails = ({
  values,
  preview,
  title,
  partnerDetails,
  productData,
  maintitle,
  DownloadPreview,
  contractPreview,
  ticket
}) => {
  const classes = useStyles();
  //const [Product, setProduct] = React.useState();
  const Product = useStateful({});
  // to get commission
  // console.log(productData, 'productdata');
  React.useEffect(() => {
    // console.log(productData, 'assemble');
    // let primaryDetails = {
    //   MOBILE_NUMBER: productData?.PrimaryContactDetails?.EMAIL_ID,
    //   EMAIL: productData?.PrimaryContactDetails?.MOBILE_NUMBER
    // };

    // let obj = {
    //   PartnerDetails: productData?.PartnerDetails || productData?.TenantDetails,
    //   sections: [
    //     productData?.sections[
    //       productData.sections?.indexOf('PartnerDetails')
    //     ] ||
    //       productData?.sections[productData.sections?.indexOf('TenantDetails')]
    //   ]
    // };
    Product.setValue(productData);
    // console.log(Product.value, 'produxx');
  }, [productData]);

  // console.log(productData?.partnerName, 'proddduuuct');
  // console.log(values,'valkkkkkk')
  return (
    <>
      <Paper elevation={0}>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <Paper elevation={0} className={classes.border}>
              <Grid container direction="row" spacing={4}>
                <Grid item>
                  <Typography variant="h2" className={classes.title}>
                    {'Partner Information'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={4}>
                <Grid container spacing={12}>
                  <Grid item xs={12}>
                    <Grid container direction="row">
                      <Grid
                        item
                        xs={4}
                        style={{
                          padding: '0.5rem'
                        }}
                      >
                        <Typography variant="subtitle2">
                          {'PARTNER NAME'}
                        </Typography>
                        <Typography variant="subtitle2">
                          {productData?.partnerName}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          padding: '0.5rem'
                        }}
                      >
                        <Typography variant="subtitle2">{'EMAIL'}</Typography>
                        <Typography variant="subtitle1">
                          {productData?.partnerPrimaryContactEmail}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={4}
                        style={{
                          padding: '0.5rem'
                        }}
                      >
                        <Typography variant="subtitle2">
                          {'MOBILE NUMBER'}
                        </Typography>
                        <Typography variant="subtitle1">
                          {productData?.partnerPrimaryContactMobile}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={4}
                        style={{
                          padding: '0.5rem'
                        }}
                      >
                        <Typography variant="subtitle2">
                          {'REQUEST DATE'}
                        </Typography>
                        <Typography variant="subtitle1">
                          {productData?.requestedDate}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          padding: '0.5rem'
                        }}
                      >
                        <Typography variant="subtitle2">{'REASON'}</Typography>
                        <Typography variant="subtitle1">
                          {productData?.openReason}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          padding: '0.5rem',
                          wordBreak: 'break-word'
                        }}
                      >
                        <Typography variant="subtitle2">
                          {'DESCRIPTION'}
                        </Typography>
                        <Typography variant="subtitle1">
                          {productData?.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  border: {
    border: '1px solid #e2e2e2'
    //  borderRadius:"0px"
  },
  borderSecondary: {
    border: '1px solid #e2e2e2',
    width: '94%',
    marginLeft: '30px'
    //  borderRadius:"0px"
  },
  img: {
    height: '108px'
  },
  root: {
    width: theme.spacing(65),
    // height: "auto",
    display: 'flex',
    minHeight: '13rem',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    // overflow: "hidden",
    maxHeight: '20rem',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    // width: '90%',
    height: 'auto',
    overflow: 'hidden',
    display: 'flex'
    // "& img": {
    //   display: "block",
    //   width: "100%",
    //   backgroundSize: "contain",
    //   height: "auto",
    // },
  },

  img: {
    width: '180px',
    height: 100,

    overflow: 'hidden !important'
    // '&:hover': {
    //   transform: 'scale(1.5)',
    //   marginTop: '50px'
    // }
  },
  Img: {
    height: '150',
    overflow: 'hidden !important',
    '&:hover': {
      transform: 'scale(1.5)',
      marginLeft: '50px'
    }
  },
  pdfIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 40
    }
  },
  imageModal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  someBox: {
    backgroundColor: theme.palette.background.paper,

    marginTop: '30px',

    borderRadius: '16px'
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  contentBox1: {
    width: '180px',
    // height: '200px',
    backgroundColor:
      theme.palette.type === 'dark'
        ? `#aaaaaa !important`
        : `${theme.palette.background.paper} !important`,
    //  marginLeft: '20px',
    boxShadow: '0px 1px 5px #00000029',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '600px',
    height: '35px'
  },
  iconSpace: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10px'
  },
  iconSpace1: {
    width: '100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inner: {
    width: theme.spacing(150),
    padding: theme.spacing(6),
    height: 'auto',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  }
}));

export default connect(
  (state) => ({
    modalState: state.modals
  }),
  {
    DownloadPreview: Documentcontroller.DownloadPreview
  }
)(ProductDetails);
