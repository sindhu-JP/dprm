import React from "react";
import { Paper, Box, Grid } from "@material-ui/core";
import Table from 'Components/Table/RenderTable';

const PopupTable = ({data,columns,loading,handlePageChange=()=>{},page=0,rowsTaskPerPage=10}) => {

  const handleTaskAction=()=>{}
  const handleTaskRowClick=()=>{}
  
  console.log("heyxxx", data)
  return (
    <Grid item xs={12}>
      <Paper elevation={0}>
        <Box>
          <Table
            page={page}
            rowsPerPage={rowsTaskPerPage}
            handleChangePage={handlePageChange}
            // handleChangeRowsPerPage={
            //   handleTaskChangeRowsPerPage
            // }
            // role={props.user?.role?.roleName}
            // rows={leads.value?.table?.rows || []}
            // rows={props.dashboardData.myTasks}
            rows={(data||[]).map(({ AddProduct }) => ({
              columns: {
                id: AddProduct.ProductDetails.PRODUCT_ID,
                productName: AddProduct.ProductDetails.PRODUCT_NAME,
                otCharge: AddProduct.PromotionDetails.ONE_TIME_CHARGE,
                recurringCharge: AddProduct.PromotionDetails.RECURRING_CHARGE,
                recurringDuration: AddProduct.PromotionDetails.RECURRING_DURATION,
                status: AddProduct.ProductDetails.PROMOTION_STATUS,
                taskId: AddProduct.ProductDetails.PROMOTION_REQUEST_ID,
                timeLeft: AddProduct.PromotionDetails?.OFFER_END_DATE||'2023-06-13T18:33:24.986Z'
              },
            }))}
            columns={columns}
            onRowAction={handleTaskAction}
            onRowClick={handleTaskRowClick}
            BreackRowPoint={true}
            totalCount={500}
            loading={loading}

            // handleBottomClick={handleBottomsheet}
          />
        </Box>
      </Paper>
    </Grid>
  );
};


export default PopupTable;