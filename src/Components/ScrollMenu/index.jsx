import React, { Component } from "react";
import {
  Grid,
  makeStyles,
  Box, Paper, Typography
} from "@material-ui/core";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "./styles.css";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Chicklets from "Components/Chicklets";

const MenuItem = ({ text, selected }) => {
  return <div className={`menu-item ${selected ? "active" : ""}`}>
      {/* <Grid container direction="row" spacing={2}>
          <Grid item> */}
          <Chicklets card ={text} />
          {/* </Grid>
      </Grid> */}
    
  </div>;
};

export const Menu = (ProductResponse, selected) =>
  ProductResponse?.map((el, i) => {

    return <MenuItem text={el} key={i} selected={selected} />;
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

export const ArrowLeft = Arrow({ text: <KeyboardArrowLeft />, className: "arrow-prev" });
export const ArrowRight = Arrow({ text: <KeyboardArrowRight />, className: "arrow-next" });

const ScrollingMenu = ({options}) => {
//   const [ProductResponse, setProductResponse] = React.useState([]);
  return (
    // <Paper elevation={0} >
      <Box py={2} px={4} >
        <Grid container direction="row" spacing={4} alignItems="center">
        </Grid>
        <ScrollMenu
        //   alignCenter={true}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          clickWhenDrag={false}
          data={Menu(options?.slice(0, options.length || []))}
          hideSingleArrow={true}
        />

      </Box>
    // </Paper>
  );

}

export default ScrollingMenu;
