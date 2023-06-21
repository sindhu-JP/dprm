import React from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Tabs,
  Tab,
  AppBar,
  Toolbar
} from '@material-ui/core';
import { Trans } from '@lingui/react';

const useStyles = makeStyles((theme) => ({
  customTabs: {
    '& .MuiTab-root': {},
    '& .Mui-selected': {
      backgroundColor:theme.palette.type === 'dark' ?`${theme.palette.primary.main} !important`: `${theme.palette.secondary.lite}!important`,
      color:theme.palette.type === 'dark' ? `${
        theme.palette.common.white} !important`:  `${
          theme.palette.primary.black} !important`
    },

    '& .MuiTabs-indicator': {
      height: 0
    },
    '& .MuiTabScrollButton-root': {
      '& .MuiSvgIcon-root': {
        fontSize: '2rem',
        color: '#000000'
      }
    }
  },
  NavigationBar: {
    // minHeight: 36
  },
  toolBar: {
    minHeight: '30px !important'
  }
}));

const TabsGroup = ({ handleChangeTabs, tabsName }) => {
  const classes = useStyles();
  const tabs = [
    {
      name: 'Tasks',
      label: <Trans id="Tasks"></Trans>
    },
    {
      name: 'Users',
      label: <Trans id="Users"></Trans>
    }
  ];
  const handleTabs = (event, value) => {
    handleChangeTabs(value);
  };
  return (
    <Box px={4}>
      <AppBar
        position="static"
        className={classes.NavigationBar}
        elevation={0}
        // minWidth={12}
        // md={12}
      >
        <Toolbar className={classes.toolBar} color="primary">
          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
          >
            <Tabs
              value={tabsName}
              onChange={handleTabs}
              classes={{ root: classes.customTabs }}
              textColor="#000000"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {tabs.map((item, index) => {
                return <Tab value={item.name} label={item.label}></Tab>;
              })}
            </Tabs>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default TabsGroup;

// import React from 'react';
// import {
//   Box,
//   Grid,
//   makeStyles,
//   Tabs,
//   Tab,
//   AppBar,
//   Toolbar
// } from '@material-ui/core';
// import { Trans } from '@lingui/react';

// const useStyles = makeStyles((theme) => ({
//   customTabs: {
//     '& .MuiTab-root': {},
//     '& .Mui-selected': {
//       background:`${theme.palette.primary.main} !important`,
//       color:`${
//         theme.palette.common.white} !important`
//     },

//     '& .MuiTabs-indicator': {
//       height: 0
//     },
//     '& .MuiTabScrollButton-root': {
//       '& .MuiSvgIcon-root': {
//         fontSize: '2rem',
//         color: '#000000'
//       }
//     }
//   },
//   NavigationBar: {
//     // minHeight: 36
//   },
//   toolBar: {
//     minHeight: '30px !important'
//   }
// }));

// const TabsGroup = ({ handleChangeTabs, tabsName }) => {
//   const classes = useStyles();
//   const tabs = [
//     {
//       name: 'Tasks',
//       label: <Trans id="Tasks"></Trans>
//     },
//     {
//       name: 'Users',
//       label: <Trans id="Users"></Trans>
//     }
//   ];
//   const handleTabs = (event, value) => {
//     handleChangeTabs(value);
//   };
//   return (
//     <Box px={4}>
//       <AppBar
//         position="static"
//         className={classes.NavigationBar}
//         elevation={0}
//         // minWidth={12}
//         // md={12}
//       >
//         <Toolbar className={classes.toolBar} color="primary">
//           <Grid
//             container
//             spacing={0}
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Tabs
//               value={tabsName}
//               onChange={handleTabs}
//               classes={{ root: classes.customTabs }}
//               textColor="#000000"
//               variant="scrollable"
//               scrollButtons="auto"
//               aria-label="scrollable auto tabs example"
//             >
//               {tabs.map((item, index) => {
//                 return <Tab value={item.name} label={item.label}></Tab>;
//               })}
//             </Tabs>
//           </Grid>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };
// export default TabsGroup;

