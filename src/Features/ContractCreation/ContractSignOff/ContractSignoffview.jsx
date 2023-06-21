// import React from "react";
// import { useWatch } from "react-hook-form";
// import { useStateful } from "react-hanger";
// import {
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   InputAdornment,
//   Chip,
// } from "@material-ui/core";
// import SearchIcon from "@material-ui/icons/Search";

// import { SvgIcon } from "lib/components";

// import Autocomplete from "lib/components/Autocomplete";
// import ContractInformation from "./ContractInformation";
// import UploadDocments from "./UploadDocments";


// const ContractSignoffview = ({
//   lead,
//   control,
//   details,
//   updateForm,
//   formOptions,
//   productSearch,
//   cart,
//   products,
//   updateVas,
//   selectedVas,
//   reloadProducts,
//   updateProducts,
//   selectedProducts,
//   selecttedItems,
//   lobkey,
//   submitFeasibilityCheck,
//   checkstatus,
//   Checkfeacibility,
//   unseleteditem,
//   installationAddress,
//   leadsState,
//   selecttedVasItems,
//   unseletedvasitem,
//   updatedvasProducts,
//   masterdata,
//   constractId,
//   createContract,
//   opendrawer,
//   openModal,
//   openleadview,
//   open,
//   onclose,
//   submitting,
//   error,
//   data,
//   showbutton,
//   counter,
//   bindSubmitForm,
//   oppQuote,
//   handleSubmit,
//   user,
//   attachment,
//   updatedetail,
//   isExist
// }) => {
//   const selectedLobs = useStateful({});
//   const lobSelection = useWatch({ control, name: "lob" });
//   const [Lobsection, setlob] = React.useState("");
//   const feasibilityCheckRequired = useStateful(false);

//   const unselectLob = (lob) => {
//     let temp = { ...selectedLobs.value };
//     delete temp[lob.code];
//     reloadProducts(temp);
//     selectedLobs.setValue(temp);
//   };
//   // React.useEffect(() => {
//   //   if (selectedLobs.value) {
//   //     reloadProducts(selectedLobs.value);
//   //     // isFeasibilityCheckRequired(selectedLobs.value);
//   //   }
//   // }, [selectedLobs.value]);

//   React.useEffect(() => {
//     if (details && details.assignment && details.classification) {
//       selectedLobs.setValue({
//         ...selectedLobs.value,
//         ...details.selectedLobs,
//       });
//       updateForm("leadClassification", details.classification);
//       updateForm("leadAssignment", details.assignment);
//     }
//   }, [details]);

//   const handleDelete = () => {};
  
//   return (
//     <Grid container direction="column" spacing={6}>
//       <Grid item xs={12}>
//         <Paper elevation={0}>
//           <Grid container alignItems="center" justify="space-between">
//             <Grid itemxs={4}>
//               <Grid container alignItems="center" spacing={4}>
//                 <Grid item>
//                   <SvgIcon iconName="company" />
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="h2">
//                     {`${details.companyName} - ${details.registrationNumber}`}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={4}>
//               <Grid container spacing={6}>
//                 <Grid item xs={6}>
//                   <Autocomplete
//                     error={false}
//                     name="leadAssignment"
//                     controllerProps={{
//                       defaultValue: details.assignment,
//                     }}
//                     options={formOptions.accountManagers}
//                     label="Lead Assigned"
//                     variant="standard"
//                     control={control}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Autocomplete
//                     error={false}
//                     controllerProps={{
//                       defaultValue: details.classification,
//                     }}
//                     name="leadClassification"
//                     options={formOptions.leadClassifications}
//                     label="Lead Classification"
//                     variant="standard"
//                     control={control}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Grid>
//       {data?
//       <>
//       <Grid item xs={12}>
       
      
//        <ContractInformation
//        bindSubmitForm={bindSubmitForm}
//        handleSubmit={handleSubmit}
//        openleadview={openleadview}

//         oppQuote={oppQuote}
//          lead={lead}
//          user={user}
//          data={data}
//          contractdetails={updatedetail}
//          isExist={isExist}
//        />
//       </Grid>
//       <Grid  item xs={12}>
//       <UploadDocments
//       attachment={attachment}
//        data={data}
//       />
//       </Grid>
//       </>:
//        <Grid
//        container
//        direction="column"
//        alignItems="center"
//        justify="center"
//      >
//        <Grid item> Loading ... </Grid>
//      </Grid>}
//     </Grid>
//   );
// };

// ContractSignoffview.defaultProps = {
//   feasibilityCheckRequired: false,
// };

// export default ContractSignoffview;

