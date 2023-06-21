import React from 'react';
import { Typography, Grid, withStyles, Box } from '@material-ui/core';
import classNames from 'classnames';

const styles = (theme) => ({
  card: {
    minWidth: theme.spacing(60),
    minHeight: theme.spacing(30),
    borderRadius: theme.spacing(3),
    color: theme.palette.common.white
  },
  colorWhite: {
    color: theme.palette.type === 'dark'
    ? `${theme.palette.primary.black} !important`
    : theme.palette.common.white
    // fontSize: '20px'
  },
  cardGrid: {
    flexBasis: theme.spacing(50),
    flexShrink: 1,
    flexGrow: 0,
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(10)
  },
  card1: {
    background: theme.palette.type === 'dark' ? `linear-gradient(90deg, #33337D 0%, ${theme.palette.common.heliotrope} 100%) !important` : `linear-gradient(90deg, ${theme.palette.common.lightPurple} 0%, ${theme.palette.common.heliotrope} 100%)!important`
  },
  card2: {
    background: `linear-gradient(90deg, ${theme.palette.common.manhattan} 0%, ${theme.palette.common.vividTangerine} 100%)`
  },
  card3: {
    background: `linear-gradient(90deg, ${theme.palette.common.illusion} 0%, ${theme.palette.common.indigo} 100%)`
  },
  card4: {
    background: `linear-gradient(90deg, ${theme.palette.common.turquoise} 0%, ${theme.palette.common.malibu} 100%)`
  },
  card5: {
    background: `linear-gradient(90deg, ${'#DC84FC'} 0%, ${'#6A41BF'} 100%)`
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
  options
}) => {
  let i = 1;

  const getId = () => {
    if (i > 4) {
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
      wrap="nowrap"
      justifyContent={'flex-start'}
      spacing={4}
    >
      {/* <Slick maxCount={window.innerWidth < 1400 ? 3 : 4}> */}
      {options.map((item, index) => {
        return (
          <Grid key={index} item className={classes.cardGrid}>
            <Box
              px={4}
              py={5}
              textAlign="center"
              className={classNames(classes.card, classes[`card${index + 1}`])}
            >
              <Grid
                container
                direction="column"
                className="textCenter"
                justifyContent="center"
                spacing={1}
              >
                <Grid item>
                  <Typography variant="body1" className={classes.colorWhite}>
                    {item.titile}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h1" className={classes.colorWhite}>
                    {/* {card.countToday} */}
                    {item.value}
                  </Typography>
                </Grid>
                {showYesterdayCount ? (
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      className={classes.colorWhite}
                    >
                      {/* <Trans>Yesterday</Trans> : {card.countYesterday} */}
                      {/* Yesterday: {item.day} */}
                    </Typography>
                  </Grid>
                ) : null}
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
