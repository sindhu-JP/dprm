const vars = {
  palette: {
    primaryMain: '#1c00c8', 
    //'#FFCC00',
    secondaryMain: '#FFF',
    contrastText: '#ddd',
    textPrimary: '#000000',
    textSecondary: '#777777',
    // backgroundMain: '#E5E5E5',
    draftColor: '#E5E5E5',
    // primaryMainLite: '#1c00c8', //'#FFE479',
    primaryMainLite: '#2CFCE8',
    hyperLinkColor: '#4c4c4c',
    headerIconColor: '#7F7F7F',
    lightPurple: '#7664DE',
    warning: 'FFA502',
    primaryDark: '#843DD0',
    bottomHeader: '#1c00c8',

    // dropDown new theme color changes
    paperBackColor: '#000000',
    dropDownSelected: '#1c00c8',
    selectedFont: '#111111',
    onHover: '#1c00c8'
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
    ...vars.palette,
    defaultTextPrimary: vars.palette.contrastText,
    // dropDown new theme color changes
    onHover: vars.palette.primaryMain
  },
  typography: {
    // fontFamily: 'BrighterSansRegular',
    fontFamily: [
      'Arial',
      'Helvetica Neue'

      //   'MTNFont'
    ].join(','),
    fontSize: {
      ...vars.fontSize
    },
    body1: {
      textTransform: 'capitalize'
    },
    caption: {
      textTransform: 'uppercase'
    }
  },
  button: {
    color: vars.palette.textPrimary
    // borderRadius: '5rem'
  },
  themeCompatability: {
    drawerPaper: vars.palette.secondaryMain,
    moreActionButtonDim: '100%',
    moreActionButtonColor: vars.palette.secondaryMain,
    listItem: vars.palette.contrastText,
    proceedBtn: vars.palette.primaryMain
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
    MuiRadio: {
      root: {
        color: vars.palette.textSecondary
      },
      colorSecondary: {
        '&$checked': {
          color: vars.palette.textPrimary
        }
      }
    },
    MuiTab: {
      root: {
        color: vars.palette.contrastText,
        '&.Mui-selected': {
          color: vars.palette.textPrimary
        }
      }

      // '&.MuiTab-root': {
      //   '&.Mui-selected': {
      //     color: vars.palette.textPrimary
      //   }
      // }
    },

    MuiButton: {
      root: {
        color: vars.palette.contrastText,
        '&.MuiButton-outlinedSecondary': {
          color: vars.palette.primaryMain,
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }
      },
      // label: {
      //   color: `${vars.palette.textPrimary} !important`
      // },
      textSecondary: {
        color: vars.palette.primaryMain
      },
      contained: {
        backgroundColor: '#e0e0e0',
        '&:hover': {
          backgroundColor: vars.palette.primaryMain
          // paddingLeft: '15px',
          // paddingRight: '20px'
        }
      },
      containedPrimary: {
        color: vars.palette.contrastText,
        // backgroundColor: vars.palette.primaryDark,
        // borderRadius: '5rem',
        '&:hover': {
          backgroundColor: vars.palette.primaryMain
          // paddingLeft: '15px',
          // paddingRight: '20px'
        }
      },
      containedSecondary: {
        color: vars.palette.textPrimary,
        // backgroundColor: vars.palette.draftColor
        backgroundColor: vars.palette.primaryMainLite
      },
      endIcon: {
        display: 'none'
      },
      label: {
        paddingLeft: '15px',
        paddingRight: '20px'
      }
    },
    // MuiButton: {
    // //   label: {
    // //     color: vars.palette.contrastText
    // //   },
    //   contained: {
    //     borderRadius: '5rem',
    //     backgroundColor: vars.palette.primaryMainLite
    //   },
    //   containedPrimary: {
    //     color: vars.palette.textPrimary,
    //     backgroundColor: vars.palette.primaryMainLite,
    //     // borderRadius: '5rem',
    //     '&:hover': {
    //       backgroundColor: vars.palette.draftColor
    //     }
    //   },
    //   containedSecondary: {
    //     '&.MuiButton-label': {
    //       color: vars.palette.textPrimary
    //     },
    //     backgroundColor: vars.palette.draftColor,
    //     '&:hover': {
    //       backgroundColor: vars.palette.draftColor
    //     }
    //   }
    // },
    MuiToggleButton: {
      root: {
        borderRadius: '5rem',
        minWidth: '7rem',
        height: '3rem',
        color: vars.palette.textPrimary,
        fontSize: '1.5rem',
        // backgroundColor: 'red',
        '&$selected': {
          color: vars.palette.secondaryMain,
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
    MuiMenuItem: {
      root: {
        color: 'white',
        '&:hover': {
          color: 'black',
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
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: vars.palette.textPrimary
      },
      toolbarBtnSelected: {
        color: vars.palette.textPrimary
      }
    },

    MuiTypography: {
      button: {
        color: vars.palette.textPrimary,
        fontWeight: vars.fontWeight.medium
      },

      fontFamily: [
        'Arial',
        'Helvetica Neue'

        //   'MTNFont'
      ].join(','),
      h1: {
        fontWeight: vars.fontWeight.medium
      },
      colorPrimary: {
        color: vars.palette.textPrimary
      },
      body1: {
        textTransform: 'capitalize',
        color: vars.palette.textPrimary
      },
      body2: {
        textTransform: 'capitalize',
        color: `${vars.palette.textPrimary} !important`,
        fontSize:'1.20rem'
      },
      colorPrimary: {
        color: vars.palette.textPrimary
      },

      caption: {
        color: vars.palette.textPrimary,
        textTransform: 'uppercase'
      }
    },
    // MuiAppBar: {
    //   colorPrimary: {
    //     backgroundColor: 'red'
    //   }
    // },
    MuiExpansionPanel: {
      root: {
        color: vars.palette.textPrimary
      }
    },
    MuiIconButton: {
      label: {
        color: vars.palette.textPrimary
      }
    },
    MuiChip: {
      label: {
        color: vars.palette.textPrimary
      },
      outlinedPrimary: {
        backgroundColor: vars.palette.contrastText
      }
    },
    MuiChip: {
      label: {
        color: vars.palette.textPrimary
      },
      outlinedPrimary: {
        backgroundColor: vars.palette.contrastText
      }
    },
    MuiDrawer: {
      paperAnchorBottom: {
        paddingBottom: '30px'
      }
    }
  }
};
