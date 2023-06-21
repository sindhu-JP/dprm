import React from 'react';
import { Typography, Grid, withStyles, Box } from '@material-ui/core';
import classNames from 'classnames';

import SvgFile from 'lib/components/SvgFile';
// import Slick from 'trouble-ticket-management/common/components/Slick';

const styles = (theme) => ({
  card: {
    minWidth: theme.spacing(80),
    borderRadius: theme.spacing(3),
    height: '8.5rem',
    color: theme.palette.common.white
  },
  colorWhite: {
    color: theme.palette.type === 'dark'
    ? `${theme.palette.primary.black} !important`
    : theme.palette.common.white
    // fontSize: '20px'
  },
  cardGrid: {
    // flexBasis: theme.spacing(60),
    // flexShrink: 1,
    // flexGrow: 0,
    // padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(5)
  },
  card1: {
    background: `linear-gradient(90deg, ${theme.palette.common.turquoise} 0%, ${theme.palette.common.malibu} 100%)`
  },
  card2: {
    background: theme.palette.type === 'dark' ? `linear-gradient(90deg, #333380  0%, ${theme.palette.common.heliotrope} 100%) !important` : `linear-gradient(90deg, ${theme.palette.common.lightPurple} 0%, ${theme.palette.common.heliotrope} 100%) !important`
  },
  card3: {
    background: `linear-gradient(90deg, ${theme.palette.common.manhattan} 0%, ${theme.palette.common.vividTangerine} 100%)`
  },
  card4: {
    background: `linear-gradient(90deg, ${theme.palette.common.illusion} 0%, ${theme.palette.common.indigo} 100%)`
  },
  card5: {
    background: `linear-gradient(90deg, ${theme.palette.common.turquoise} 0%, ${theme.palette.common.malibu} 100%)`
  },
  ctaText: {
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  noBackground: {
    background: 'none'
  },
  noPadding: {
    padding: 0
  }
});

const Chicklets = ({
  classes,
  cards,
  noBackground,
  noPadding,
  showYesterdayCount,
  options,
  breakPoint
}) => {
  let i = 1;

  const getId = () => {
    if (i > 5) {
      i = 1;
    }
    return i++;
  };
  const cardKeys = Object.keys(cards);
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      //  wrap="nowrap"
      justify={
        breakPoint ? '' : cardKeys.length > 4 ? 'space-between' : 'flex-start'
      }
      spacing={2}
    >
      {/* <Slick maxCount={window.innerWidth > 1400 ? 4 : 5}>. */}
      {options.map((card, index) => {
        //   const card = cards[key];
        return (
          <Grid key={index} item className={classes.cardGrid}>
            <Box
              px={4}
              py={8}
              textAlign="center"
              className={classNames(classes.card, classes[`card${getId()}`])}
            >
              <Grid
                container
                direction="row"
                className="textCenter"
                // justify="center"
                alignItems="center"
                justifyContent="space-around"
                spacing={4}
              >
                {card.icon && (
                  <Grid item>
                    <SvgFile iconName={card.icon} iconWidth={35} />
                  </Grid>
                )}
                <Grid item>
                  {/* <Grid item style={{ textOverflow: 'ellipsis' }}> */}
                  <Grid item>
                    <Typography variant="h4" className={classes.colorWhite}>
                      {card.title}
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginTop: '5px' }}>
                    <Typography variant="h1" className={classes.colorWhite}>
                      {card.value}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        );
      })}
      {/* </Slick> */}
    </Grid>
  );
};

Chicklets.defaultProps = {
  performance: {
    closed: {
      total: '00',
      yesterday: '00'
    },
    held: {
      total: '00',
      yesterday: '00'
    }
  },
  showYesterdayCount: true
};

export default withStyles(styles)(Chicklets);
