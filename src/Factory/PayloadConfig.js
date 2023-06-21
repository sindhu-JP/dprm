const genarateOtp = (data) => {
    return {
        "Values": {
            "accessToken": localStorage.getItem('ACCESS_TOKEN'),
            "customerEmail":data?.EMAIL_ID||data?.email,
            "customerMobile": data?.MOBILE_NUMBER||data?.phoneNumber
        },
        "async": false,
        "executionModeStatus": false,
        "userId": null,
        "userRole": null,
        "workflowId": "1640601264599"
    }
}

export default { genarateOtp }