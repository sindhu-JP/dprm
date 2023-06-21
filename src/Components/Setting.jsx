import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Brightness4Rounded, Brightness7 } from '@material-ui/icons';
import setThemeController from 'Store/Appearance';
const useStyles = makeStyles((theme) => ({
  //   typography: {
  //     padding: theme.spacing(2)
  //   },
  fontSize: {
    fontSize: theme.spacing(8.5),
    color:
      theme.palette.type === 'dark'
        ? theme.palette.common.black
        : theme.palette.primary.main,
    cursor: 'pointer'
  }
}));
const themeArray = [
  { color: '#fff', name: 'Light', key: 'light' },
  { color: '#000', name: 'Dark', key: 'dark' }
];
export default function Appearance() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { ThemeType } = useSelector((state) => state.Appearance);
  const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // const handleClick = (event) => {
  //   console.log('hhuiweif')
  //   dispatch({
  //     type: 'APPEARENCE_UPDATE',
  //     payload: { ThemeType: ThemeType === 'dark' ? 'light' : 'dark' }
  //   });
  // };
  const handleClick = () => {
    let data = ThemeType === 'dark' ? 'light' : 'dark';
    dispatch(setThemeController.setTheme({ ThemeType: data }));
    // setAnchorEl(null);
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        {ThemeType === 'dark' ? (
          <Brightness4Rounded className={classes.fontSize} />
        ) : (
          <Brightness7 className={classes.fontSize} />
        )}
      </IconButton>
      {/* <Settings
        color="primary"
        className={classes.fontSize}
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Typography variant="h4" className={classes.typography}>
          Appearence
        </Typography>
        <Grid container>
          {themeArray.map((item) => (
            <Grid item xs={12}>
              <IconButton
                key={item.key}
                onClick={() =>
                  dispatch({
                    type: 'APPEARENCE_UPDATE',
                    payload: { ThemeType: item.key }
                  })
                }
              >
                <Brightness7
                  style={{
                    fontSize: 30,
                    marginRight: '20px'
                    //   borderColor: ThemeType === item.key ? 'yellow' : ''
                  }}
                />
                <Typography
                  style={{ color: ThemeType === item.key ? 'black' : '' }}
                >
                  {item.name}
                </Typography>
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Popover> */}
    </div>
  );
}
