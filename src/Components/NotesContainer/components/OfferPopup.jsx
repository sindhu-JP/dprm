import React, { useEffect, useState } from "react";
import "./offerPopup.css";
import { pendingCount } from "Http/axios";
import {  useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
const OfferPopup = () => {
    const [count, setCount] = useState(0);
    const history = useHistory()
    const { loginUser } = useSelector((storedata) => storedata.auth)
    const fetchPendingCount = async () => {
        try {
            const { data } = await pendingCount.get(`/productPromotion/promotionCount/${loginUser.email}`);
            setCount(data.pendingCount)
        } catch (err) {
            console.log(err);
        }
    }



    const fetchPendingProduct = async () => {

            history.push('/digital-prm-web-ui/PopupTables')
    }
    useEffect(() => {
        fetchPendingCount()
    }, [])

    return (
        <div className="popup-container flex-row">
            <div className="yellow-strip "></div>
            <div
                className="flex-row"
                style={{
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "1rem 0",
                }}
            >
                <div className="img-container">
                    <div data-count={count || 0} className="offer-img" style={{
                        background: `url("/assets/images/offerpopup.png")`, backgroundPosition: "center",
                        backgroundSize: "100%",
                        width:"100%",
                        height:"100%",
                        padding:"1rem",
                        backgroundRepeat: "no-repeat",
                    }} ></div>
                    <p className="offer-text">Launch</p>
                    <p className="offer-text">Promotions</p>
                </div>
                <div className="click-container">
                    <p onClick={fetchPendingProduct} className="offer-link">Click here</p>
                    <p className="offer-text2">To Launch Product</p>
                </div>
            </div>
        </div>
    );
};

export default OfferPopup;
