import React, { useEffect, useState } from 'react';
import {
  Button,
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TablePagination,
  makeStyles
} from '@material-ui/core';
import { TecnotreedigitalSales } from '../../Http/axios';

import ContractBottomSheetForm from '../../Features/ManageHierarchy/ContractBottomSheetForm';
import { isEmpty } from 'lodash';
const useStyles = makeStyles((theme) => ({
  table: {
    backgroundColor: theme.palette.common.white,
    borderCollapse: 'collapse',
    width: '99%'
  },
  borderview: {
    // border:'1px solid red',
    borderTop: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    borderBottom: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    '&:first-child': {
      borderLeft: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    },
    '&:last-child': {
      borderRight: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    }
  },
  border: {
    // border: "1px solid #e2e2e2",
    borderTop: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    borderBottom: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`,
    '&:first-child': {
      borderLeft: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    },
    '&:last-child': {
      borderRight: `${theme.spacing(0.2)} solid ${theme.palette.common.mercury}`
    }
  },
  tableRow: {}
}));
const ContractTable = (props) => {
  const [productsList, setProductsList] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState({});
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();
  let separatedItem;
  let partnerId = props.data.id;
  let response;
  let rowData;
  const onClose = () => {
    setDrawer(false);
  };
  useEffect(() => {
    const getProductList = async (partnerId) => {
      setIsLoading(true);
      await TecnotreedigitalSales.get(
        `/search/Add_Product?AddProduct.ProductDetails.Partner_ID=${partnerId}`
      )
        .then((resp) => {
          response = resp.data;
          setProductsList(response);
          setIsLoading(false);
        })
        .catch((error) => {});
    };

    getProductList(partnerId);
  }, []);
  const approvedProductsCount = [];
  if (!isEmpty(productsList)) {
    productsList.map((item) => {
      if (item.AddProduct.status === 'Approved') {
        approvedProductsCount.push(item);
        // setApprovedProducts(approvedProductsCount);
      }
    });
  }

  return (
    <>
      {(() => {
        if (productsList !== 'undefined') {
          return (
            <>
              <h1>Select Product</h1>
              <TableContainer>
                <MuiTable stickyHeader className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-headers">
                        PARTNER ID
                      </TableCell>
                      <TableCell className="table-headers">
                        PRODUCT ID
                      </TableCell>
                      <TableCell className="table-headers">
                        PRODUCT NAME
                      </TableCell>

                      <TableCell className="table-headers">ACTION</TableCell>
                    </TableRow>
                  </TableHead>
                  {isLoading ? (
                    <p>Just a sec..</p>
                  ) : (
                    <TableBody>
                      {productsList.map((item, index) => {
                        if (item.AddProduct.status === 'Approved') {
                          return (
                            <TableRow>
                              <TableCell>
                                {item.AddProduct.ProductDetails.Partner_ID}
                              </TableCell>
                              <TableCell>
                                {item.AddProduct.ProductDetails.PRODUCT_ID}
                              </TableCell>
                              <TableCell>
                                {item.AddProduct.ProductDetails.PRODUCT_NAME}
                              </TableCell>

                              <TableCell>
                                {(() => {
                                  if (
                                    item.AddProduct.ProductDetails
                                      .Contract_Added === 'yes'
                                  ) {
                                    return (
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={() => {
                                          setDrawer(true);
                                          rowData = item;
                                          setSelectedRowDetails(item);
                                        }}
                                      >
                                        Create
                                      </Button>
                                    );
                                  } else {
                                    return (
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        disabled
                                        // onClick={() => {
                                        //   // props.onClick(item);
                                        //   setDrawer(true);
                                        //   rowData = item;
                                        //   setSelectedRowDetails(item);
                                        // }}
                                      >
                                        Contract Added
                                      </Button>
                                    );
                                  }
                                })()}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  )}
                </MuiTable>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={approvedProductsCount.length}
                rowsPerPage={rowsPerPage}
                page={page}
              />
              <ContractBottomSheetForm
                open={drawer}
                formIdentity="Add_contract"
                onClose={onClose}
                row={rowData}
                masterData={props}
                rowData={selectedRowDetails}
              />
            </>
          );
        }

        return <h1>Null</h1>;
      })()}
    </>
  );
};

export default ContractTable;
