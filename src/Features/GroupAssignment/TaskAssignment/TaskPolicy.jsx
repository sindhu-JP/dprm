import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { useStateful } from 'react-hanger';
import SelectDropDown from 'Components/Dropdown';
import MultiSelectDropDown from 'lib/components/MulitiSelectAutocomplete/Autocomplete';
import _ from 'lodash';
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize:'20px'
  }
}));
const TaskPolicy = ({
  values,
  userGroupsRow,
  onchangeDropdown,
  fechUserlist,
  showlist
}) => {
  const classes = useStyles();
  const masterdata = useSelector((state) => state.master.data);
  const address = useStateful({});
  const Options = useStateful([]);

  const handleChange = () => {};

  React.useEffect(() => {
    if (!_.isEmpty(userGroupsRow)) {
      scriptParser(userGroupsRow);
    }else{
      customParser(fechUserlist?.newList)
    }
  }, [userGroupsRow,fechUserlist?.newList]);
const customParser=(dt)=>{
  if(dt?.length > 0){
    let rows=[];
    dt.map(item=>{
      rows.push({
        list:{
          id:item.id,
          username:item.username
        },
        name:item.username,
        code:item.username,
        title:item.username        
      });
    });
    Options.setValue(rows)
  }
}
  const scriptParser = (data) => {
    if (data) {
      let rows = [];

      Object.values(data).map((row) => {
        rows.push({
          list: row.list,
          name: row.list?.username,
          code: row.list?.username,
          title: row.list?.username
        });
      });

      Options.setValue(rows);
    }
  };

  const defaultValueParser = (data) => {
    if (data) {
      // if(data?.taskUsers.length){
      return _.map(data?.taskUsers, (item) => {
        return {
          list: {
            id: item.userId,
            username: item.username
          },
          name: item.username,
          code: item.userId,
          title: item.username
        };
      });
    }
  //   else{
  //     return _.map(data?.newList, (item) => {
  //       return {
  //         list: {
  //           id: item.userId,
  //           username: item.username
  //         },
  //         name: item.username,
  //         code: item.userId,
  //         title: item.username
  //       };
  //     });
  //   }
  // }
  
  };

  return (
    <Paper elevation={1} style={{ borderRadius: '0px' }}>
      <Box p={4}>
        <Box mb={4}>
          <Typography variant="subtitle2" className={classes.title}>
            TASK ALLOCATION POLICY
          </Typography>
        </Box>

        <Grid container spacing={4} direction="row">
          <Grid item>
            <SelectDropDown
              label="Policy"
              handleChange={handleChange}
              options={[{ name: 'Round Robin', code: 'Round Robin' }]}
              value={'Round Robin'}
            />
          </Grid>
          <Grid item>
            {fechUserlist?.taskUsers?.length >= 0 && showlist && (
              <MultiSelectDropDown
                label="Add User"
                onchangeDropdown={onchangeDropdown}
                options={Options.value || []}
                defaultValue={defaultValueParser(fechUserlist)}
                value={'Round Robin'}
              />
            )}

            {!showlist && (
              <MultiSelectDropDown
                label="Add User"
                onchangeDropdown={onchangeDropdown}
                options={Options.value || []}
                value={'Round Robin'}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default TaskPolicy;
