import * as Yup from "yup";



const dcmYupValidate = Yup.object().shape({
    marketSegment: Yup.string().required("Customer Sub Category is required.").nullable(),
    channels: Yup.object().required("Customer Sub Category is required.").nullable(),
    category: Yup.object().required("Customer Sub Category is required.").nullable(),
    taxCategory: Yup.string().required("Customer Sub Category is required.").nullable(),
    priceType: Yup.string().required("Customer Sub Category is required.").nullable(),
    type: Yup.string().required("Customer Sub Category is required.").nullable(),
});



export default { dcmYupValidate, };



