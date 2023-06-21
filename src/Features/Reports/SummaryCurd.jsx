import React from 'react';

import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';

import classNames from 'classnames';
// import constants from 'trouble-ticket-management/common/constants/constants';

// import appRoutes from 'trouble-ticket-management/common/constants/appRoutes';

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    padding: '24px',
    backgroundColor: theme.palette.background.highlight,
    boxShadow: 'none',
    marginBottom: '16px',
    maxWidth: '99%',
    cursor: 'pointer'
  },
  cardWrapper: {
    margin: '0',
    height: '100%',
    paddingTop: '0',
    paddingBottom: '0'
  },
  statusSection: {
    flex: '0.1'
  },
  headerTitle: {
    width: 190,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  contentSection: {
    flex: '2'
  },
  leftContent: {
    justifyContent: 'space-evenly'
  },
  statusSpan: {
    width: '4px',
    background: `${theme.palette.common.white} 0% 0% no-repeat padding-box`,
    borderRadius: '50px',
    height: '100%',
    marginRight: '12px'
  },
  redStatus: {
    backgroundColor: theme.palette.error.main
  },
  orangeStatus: {
    backgroundColor: theme.palette.warning.main
  },
  captureStatus: {
    backgroundColor: theme.palette.secondary.main
  },
  greenStatus: {
    backgroundColor: theme.palette.success.main
  },
  greyStatus: {
    backgroundColor: theme.palette.common.lightSilver
  },
  subTitle: {
    marginRight: '0.2em'
  },
  typeCss: {
    color: theme.palette.text.primary,
    paddingTop: '0.7em'
  },
  activeCard: {
    backgroundColor: theme.palette.common.white,
    height: 'auto',
    marginRight: -6,
    maxWidth: '100%'
  },
  warningIcon: {
    color: theme.palette.warning.main
  },
  ticketID: {
    color: '#999999',
    fontWeight: 300,
    fontSize: '12px'
  },
  associateHeading: {
    marginLeft: '-2px'
  }
}));

// const onOptionSelected = async ({ option }) => {
//   switch (option) {
//     case 'Cancel':
//       this.handleModalOpen('isCancelOrderModalOpen');
//       break;
//     case 'Modify':
//       console.log('modify clicked')
//     default:
//       break;
//   }
// };

const SummaryCard = ({
  item,

  index,
  onCardClick,
  selectedCardValue
}) => {
  const classes = styles();
  return (
    <Paper
      className={classNames(
        classes.root,
        index === selectedCardValue ? classes.activeCard : ''
      )}
      rounded="true"
      elevation={0}
      onClick={() => onCardClick(item, index)}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h2">{item?.name}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2">{item?.subtitle}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SummaryCard;
