import React from 'react';
import config from 'config';
import {
  Grid,
  Box,
  Paper,
  Typography,
  IconButton,
  makeStyles
} from '@material-ui/core';
import LeadController from 'Controllers/Lead';
import { useStateful } from 'react-hanger';
import { SvgIcon } from 'lib/components';
import QualifiedLead from 'Assets/Icons/Qualified_Leads.svg';
import OpportunityCreated from 'Assets/Icons/opportunity_created.svg';
import TotalRevenue from 'Assets/Icons/total_revenue.svg';
import OpportunityWon from 'Assets/Icons/opportunity_won.svg';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { connect } from 'react-redux';

const Chicklet = ({ count, label, percent, icon }) => {
  const classes = useStyles({ change: count });

  return (
    <Paper elevation={0}>
      <Box py={2} px={4}>
        <Grid container alignItems="center" spacing={4}>
          {/* <Grid item>
            <Typography variant="subtitle2">{label}</Typography>

            <Grid container alignItems="baseline" spacing={2}>

              <Grid item>
                <Typography display="inline" className={classes.count}>
                  {count}
                </Typography>
              </Grid>
              <Grid item>
                <ArrowDownwardIcon className={classes.indicator} />
              </Grid>
              <Grid item>
                <Typography
                  className={classes.percentage}
                  display="inline"
                  variant="h6"
                >
                  {percent === "NIL" ? "No Data" : `${percent} %`}
                </Typography>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid item style={{ paddingRight: '35px' }}>
            <IconButton size={10} className={classes.icon} color="secondary">
              {typeof icon === 'string' ? (
                <SvgIcon basePath={config.basePath} iconName={icon} />
              ) : (
                icon
              )}
            </IconButton>
          </Grid>

          <Grid item style={{ paddingRight: '40px' }}>
            <Grid container alignItems="baseline" spacing={2}>
              <Typography display="inline" className={classes.count}>
                324
              </Typography>
              <Grid item>
                <ArrowDownwardIcon className={classes.indicator} />
              </Grid>
              <Grid item>
                <Typography
                  className={classes.percentage}
                  display="inline"
                  variant="h6"
                >
                  12%
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="subtitle2">KP12</Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

Chicklet.defaultProps = {
  label: '',
  count: '',
  percent: ''
};

const Chicklets = (props) => {
  const classes = useStyles();
  const data = useStateful({});
  const [totalRevenue, setTotalRevenue] = React.useState();
  const loadData = async (chicklets) => {
    if (chicklets) {
      let obj = {};
      //  const checkletvalue= JSON.parse(res.data)

      chicklets &&
        chicklets.map((data) => {
          if ('QualifiedLeadsper' in data) {
            obj['QualifiedLeadsper'] = data;
          }
          if ('OpportunityLeadsper' in data) {
            obj['OpportunityLeadsper'] = data;
          }
          if ('LeadsWonper' in data) {
            obj['LeadsWonper'] = data;
          }
        });
      data.setValue(obj);
    }
  };

  React.useEffect(() => {
    if (props.duration) {
      props.loadgetKpi({ duration: props.duration });
      // loadData(props.duration);
    }
  }, [props.duration, props.render]);

  React.useEffect(() => {
    if (props.leadsState?.Chicklet) {
      loadData(props.leadsState?.Chicklet);
    }
  }, [props.leadsState?.Chicklet]);

  React.useEffect(() => {
    for (var prop in props.totalRevenue) {
      if (props.totalRevenue.hasOwnProperty(prop)) {
        if (prop === 'totalRevenue') {
          setTotalRevenue(props.totalRevenue[prop]);
        }
      }
    }
  }, [props.totalRevenue]);
  return (
    <Box>
      <Grid container direction="row" justify="space-between" spacing={6}>
        <Grid item>
          <Chicklet
            label="Qualified Leads"
            percent={data.value['QualifiedLeadsper']?.QualifiedLeadsper}
            count={data.value['QualifiedLeadsper']?.QualifiedLeadsCount}
            icon={<img src={QualifiedLead} />}
          />
        </Grid>
        <Grid item>
          <Chicklet
            label="Opportunity Created"
            percent={data.value['OpportunityLeadsper']?.OpportunityLeadsper}
            count={data.value['OpportunityLeadsper']?.OpportunityLeadsCount}
            icon={<img src={OpportunityCreated} />}
          />
        </Grid>
        <Grid item>
          <Chicklet
            percent={data.value['LeadsWonper']?.LeadsWonper}
            count={data.value['LeadsWonper']?.LeadsWonTodayCount}
            icon={<img src={OpportunityWon} />}
            label="Opportunity Won"
          />
        </Grid>
        <Grid item>
          <Chicklet
            icon={<img src={TotalRevenue} />}
            //count={totalRevenue && totalRevenue}
            label="Total Revenue"
            // percent=""
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    backgroundColor: theme.palette.icon.filled,
    width: theme.spacing(16.2),
    height: theme.spacing(16.2),
    '& svg': {
      fill: theme.palette.text.primary,
      stroke: theme.palette.text.primary
    }
  },
  count: {
    fontSize: theme.spacing(7.25),
    fontWeight: theme.typography.fontWeightBold
  },
  indicator: {
    transform: ({ change }) => `rotateX(${change > 0 ? '180deg' : '0deg'})`,
    height: theme.spacing(5),
    color: ({ change }) =>
      change > 0 ? theme.palette.success.main : theme.palette.error.main
  },
  chicklet: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4)
  },
  percentage: {},

  sizeAlign: {
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    width: '305px',
    height: '126px',
    padding: '10px'
  },
  flipArrow: {
    transform: 'rotateX(180deg)',
    color: theme.palette.error.main
  },
  dot: {
    backgroundColor: '#E5E5E5',
    borderRadius: '50%',
    width: '66px',
    height: '66px',
    display: 'inline-block'
  },
  titleColor: {
    color: '#8392A5'
  },
  // percentage: {
  //   color: "#8392A5",
  //   fontSize: "18px",
  // },

  iconAlign: {
    marginLeft: '12px',
    marginTop: '10px'
  }
}));
export default connect(
  (state) => ({
    leadsState: state.leads
  }),
  {
    loadgetKpi: LeadController.loadgetKpi
  }
)(Chicklets);
