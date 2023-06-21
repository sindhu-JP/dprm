const vars = {
  palette: {
    primaryMain: '#56a1a2',
    secondaryMain: '#5DB3B4',
    // secondaryMain: '#008789',
    // textPrimary: '#FF375E',
    textPrimary: '#FFFFFF',
    draftColor: '#E5E5E5',
    primaryMainLite: '#2D8F90',
    // primaryDark: '#008789', // old-#120084
    contrastText: '#000000',
    filterBtn: '#008789',
    lightBlack: '#333333',
    lightPurple: '#5DB3B4',
    headerIconColor: '#008789',
    bottomHeader: '#008789',

    // dropDown new theme color changes
    paperBackColor: '#000000',
    dropDownSelected: '#000000',
    selectedFont: '#111111'
  },
  fontSize: {
    h1: 24,
    h2: 20,

    button: 15,
    subtitle1: 15,
    subtitle2: 15,
    caption: 12
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 600
  },
  button: {
    //  . borderRadius: '10rem'
  },
  labelOpacity: {
    opacity: '0.5'
  }
};
export default {
  palette: {
    //...vars.palette,
    primaryMain: '#56a1a2', 
    /// old --#4F008C,
    secondaryMain: '#5DB3B4',
    bottomHeader: '#008789',
    headerIconColor: '#444444',

    // dropDown new theme color changes
    paperBackColor: '#008789',
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
      contained: {
        backgroundColor: '#2D8F90', 
        //'#236F70',
        '&:hover': {
          backgroundColor: vars.palette.primaryMain
        }
      },
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
