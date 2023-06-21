import { Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Trans } from '@lingui/macro';

const useStyles = makeStyles((theme) => ({
  chipBackground: {
    backgroundColor: theme.palette.common.white,
    color:
      theme.palette.type === 'dark'
        ? `${theme.palette.common.black} !important`
        : ``
  }
}));
const FilterChips = (props) => {
  const { filterData, setFilterCount, partnerdetails, Load_filter_tickets } =
    props;
  const classes = useStyles();
  const handleDelete = (key) => {
    let dynamicURL = '';
    let obj = filterData.content;
    if (delete obj[key]) {
      let count = Object.keys(obj).length;
      setFilterCount({ count, content: obj });
      Object.keys(obj).map((itm) => {
        if (itm?.includes('Date')) {
          dynamicURL += `&sort=-modifiedDate&${itm}%3E${obj[itm]}`;
        } else if (itm === 'category') {
          dynamicURL += `&${itm}*=${obj[itm]?.parentCategory?.id},${obj[itm]?.subCategory?.id}`;
        } else {
          dynamicURL += `&${itm}=${obj[itm]}`;
        }
      });
    }
    dynamicURL = dynamicURL.substring(1);
    Load_filter_tickets({ id: partnerdetails.mainlist.partnerId, dynamicURL });
  };
  if (filterData.count <= 0) return null;
  return (
    <>
      {filterData.count >= 0 ? (
        <Grid container direction="row" spacing={1} alignItems="center">
          <Grid item>
            <Typography>
              <Trans>Filtered By: </Trans>
            </Typography>
          </Grid>
          {Object.keys(filterData.content || {}).map((key) => (
            <Grid item>
              <Chip
                className={classes.chipBackground}
                key={key + 'chip'}
                // label={`${filteredLabels.status}`}
                label={`${key} : ${
                  key === 'category'
                    ? `${
                        (filterData.content[key]?.parentCategory?.id,
                        filterData.content[key]?.subCategory?.id)
                      }`
                    : `${filterData.content[key]}`
                }`}
                variant="outlined"
                onDelete={() => handleDelete(key)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        ''
      )}
    </>
  );
};
export default FilterChips;
