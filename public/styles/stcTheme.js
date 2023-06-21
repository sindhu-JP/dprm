const vars = {
  palette: {
    primaryMain: '#FF375E',
    secondaryMain: '#580082',
    textPrimary: '#FFFFFF',
    draftColor: '#E5E5E5',
    primaryMainLite: '#FFE479',
    primaryDark: '#843DD0', 
    // old-#120084,
    contrastText: '#000000',
    filterBtn: '#843DD0',
    lightBlack: '#333333',
    headerIconColor: '#7F7F7F',
    bottomHeader: '#580082',

    // dropDown new theme color changes
    paperBackColor: '#580082',
    dropDownSelected: '#843DD0',
    selectedFont: '#111111'
  }
};
export default {
  palette: {
    //...vars.palette,
    primaryMain: '#FF375E', 
    /// old --#4F008C,
    secondaryMain: '#580082',
    bottomHeader: '#580082',
    headerIconColor: '#444444',

    // dropDown new theme color changes
    paperBackColor: '#580082',
    dropDownSelected: vars.palette.primaryDark,
    selectedFont: vars.palette.textPrimary,
    onHover: vars.palette.primaryDark

    // lightBlack: '#333333'
  },
  typography: {
    fontFamily: 'StcForwordBrighterSansRegular'
    // fontSize: {
    //   ...vars.fontSize
    // },
    // body1: {
    //   textTransform: 'capitalize'
    // },
    // caption: {
    //   textTransform: 'uppercase'
    // }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '0.3rem'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 0.375rem rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#8F98A3',
          borderRadius: '4rem'
        }
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: vars.palette.secondaryMain
      }
    },
    MuiMenuItem: {
      root: {
        color: vars.palette.textPrimary,
        '&:hover': {
          color: vars.palette.paperBackColor,
          backgroundColor: vars.palette.primaryMain
        }
      }
    },
    MuiMenu: {
      paper: {
        padding: 0,
        backgroundColor: vars.palette.paperBackColor
      }
    },
    MuiToolbar: {
      root: {
        // backgroundColor: vars.palette.primaryMain
      },
      MuiButton: {
        containedPrimary: {
          backgroundColor: vars.palette.primaryDark
        }
      }
    },
    MuiButton: {
      root: {
        color: vars.palette.textPrimary
      },
      textSecondary: {
        color: vars.palette.primaryMain
      },
      // contained: {
      //   backgroundColor: '#e0e0e0',
      //   '&:hover': {
      //     backgroundColor: vars.palette.primaryMain
      //   }
      // },
      containedPrimary: {
        color: vars.palette.textPrimary,
        // backgroundColor: vars.palette.primaryDark,
        // borderRadius: '5rem',
        '&:hover': {
          backgroundColor: vars.palette.primaryMain
        }
      },
      containedSecondary: {
        color: vars.palette.textPrimary,
        backgroundColor: vars.palette.primaryDark
      },
      endIcon: {
        display: 'none'
      }
    },
    // MuiMenuItem: {
    //   root: {
    //     color: 'white',
    //     '&:hover': {
    //       color: 'black',
    //       backgroundColor: vars.palette.primaryMain
    //     }
    //   }
    // },
    MuiPickersToolbarText: {
      MuiPickersCalendar: {
        week: {
          backgroundColor: 'red',
          MuiTypography: {
            color: 'white'
          }
        }
      }
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: vars.palette.primaryMain,
        '& .MuiIconButton-label': {
          color: 'white'
        }
        // '&:hover': {
        //   backgroundColor: vars.palette.secondaryMain
        // }
      }
    },
    MuiToggleButton: {
      root: {
        minWidth: '7rem',
        height: '3rem',
        color: vars.palette.contrastText,
        fontSize: '1.5rem',
        '&$selected': {
          color: vars.palette.textPrimary,
          backgroundColor: vars.palette.primaryMain
        }
      },
      containedPrimary: {
        color: vars.palette.contrastText,
        backgroundColor: vars.palette.primaryMainLite,
        // borderRadius: '5rem',
        '&:hover': {
          backgroundColor: vars.palette.draftColor
        }
      }
    },
    MuiDrawer: {
      paperAnchorBottom: {
        paddingBottom: '30px'
      }
    }
  }
};
