import { createTheme } from '@material-ui/core/styles';
import defaultVars from '../styles/defaultVariables';
import yellowVars from '../styles/yellowTheme';
import stcVars from '../styles/stcTheme';
import mtnVars from '../styles/mtnTheme';
import zbahrainVars from '../styles/zbahrainTheme';
import momentsVars from '../styles/momentsTheme';
import _merge from 'lodash/merge';
import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';
import config from 'config';

const THEME_VARS = {
  tecnotree: {
    default: defaultVars,
    yellow: yellowVars
  },
  mtn: {
    default: mtnVars
  },
  stc: {
    default: stcVars
  },
  zbahrain: {
    default: zbahrainVars
  },
  moments: {
    default: momentsVars
  }
};

export const themeVariants = () => {
  return _get(THEME_VARS, config.appTheme, _get(THEME_VARS, 'tecnotree'));
};

const muiTheme = (direction, themeVariantName) => {
  const newVars = _cloneDeep(defaultVars);
  const appTheme = themeVariants();

  const vars = _merge(newVars, appTheme[themeVariantName || 'default'] || {});

  return createTheme({
    palette: {
      primary: {
        main: vars.palette.primaryMain,
        bottomHeader: vars.palette.bottomHeader,
        dark: vars.palette.primaryDark,
        light: vars.palette.primaryLight,
        black: vars.palette.black,
        contrastText: vars.palette.contrastText,
        primaryMainContrast:
          vars.palette.defaultTextPrimary || vars.palette.contrastText,
        primaryMainInverse:
          vars.palette.defaultTextPrimary || vars.palette.primaryMain,

        // dropDown new theme color changes
        paperBackColor: vars.palette.paperBackColor,
        dropDownSelected: vars.palette.dropDownSelected,
        selectedFont: vars.palette.selectedFont,
        onHover: vars.palette.onHover
      },
      secondary: {
        main: vars.palette.secondaryMain,
        lite: vars.palette.primaryMainLite,
        contrastText: vars.palette.white
      },
      error: {
        main: vars.palette.errorMain,
        contrastText: vars.palette.white,
        dark: vars.palette.errorDark,
        secondary: vars.palette.errorSecondary
      },
      warning: {
        main: vars.palette.warningMain,
        contrastText: vars.palette.black
      },
      info: {
        main: vars.palette.primaryMain
      },
      success: {
        main: vars.palette.successMain,
        dark: vars.palette.successDark
      },
      text: {
        primary: vars.palette.textPrimary,
        secondary: vars.palette.textSecondary
      },
      background: {
        main: vars.palette.backgroundMain,
        paper: vars.palette.white,
        inactive: vars.palette.backgroundInactive,
        highlight: vars.palette.backgroundHighlight,
        light: vars.palette.backgroundLight
      },
      icon: {
        main: vars.palette.primaryMain,
        filled: vars.palette.mercury,
        stroke: vars.palette.textPrimary,
        background: vars.palette.backgroundHighlight,
        menuBackgroundInactive: vars.palette.iconMenuBackgroundInactive
      },
      common: {
        black: vars.palette.black,
        white: vars.palette.white,
        gold: vars.palette.gold,
        platinum: vars.palette.platinum,
        silver: vars.palette.silver,
        quickSilver: vars.palette.quickSilver,
        lightSilver: vars.palette.lightSilver,
        heliotrope: vars.palette.heliotrope,
        manhattan: vars.palette.manhattan,
        vividTangerine: vars.palette.vividTangerine,
        illusion: vars.palette.illusion,
        indigo: vars.palette.indigo,
        turquoise: vars.palette.turquoise,
        malibu: vars.palette.malibu,
        doveGray: vars.palette.doveGray,
        selectedGray: vars.palette.selectedGray,
        gray: vars.palette.gray,
        grayShadow: vars.palette.grayShadow,
        mercury: vars.palette.mercury,
        prussianBlue: vars.palette.prussianBlue,
        backdrop: vars.palette.backdrop,
        draftColor: vars.palette.draftColor || vars.palette.textSecondary,
        switchSecondaryPrimaryText:
          vars.palette.textPrimary || vars.palette.textSecondary,
        headerIconColor:
          vars.palette.headerIconColor || vars.palette.primaryMain,
        lightPurple: vars.palette.lightPurple || vars.palette.secondaryMain,
        hyperLinkColor: vars.palette.hyperLinkColor || vars.palette.primaryMain,
        darkGray: vars.palette.darkGray,
        errorMain: vars.palette.errorMain,
        ghostWhite: vars.palette.ghostWhite,
        gainsboro: vars.palette.gainsboro,
        footerGray: vars.palette.footerGray
      }
    },
    themeCompatability: _merge(
      {
        drawerPaper: vars.palette.gray,
        moreActionButtonDim: vars.dimensions.borderRadiusZero,
        moreActionButtonColor: 'transparent',
        listItem: vars.palette.textSecondary,
        proceedBtn: vars.palette.successMain
      },
      vars.themeCompatability || {}
    ),
    typography: {
      fontFamily: vars.typography.fontFamily,
      fontWeightLight: vars.typography.fontWeight.light,
      fontWeightRegular: vars.typography.fontWeight.regular,
      fontWeightMedium: vars.typography.fontWeight.medium,
      fontWeightBold: vars.typography.fontWeight.bold,
      h1: {
        fontSize: vars.typography.fontSize.h1,
        fontWeight: vars.typography.fontWeight.regular,
        color: vars.palette.textPrimary
      },
      h2: {
        fontSize: vars.typography.fontSize.h2,
        fontWeight: vars.typography.fontWeight.bold,
        color: vars.palette.textPrimary
      },
      h3: {
        fontSize: vars.typography.fontSize.h3,
        fontWeight: vars.typography.fontWeight.medium,
        color: vars.palette.textPrimary
      },
      h4: {
        fontSize: vars.typography.fontSize.h4,
        fontWeight: vars.typography.fontWeight.regular,
        color: vars.palette.textPrimary
      },
      //not used
      h5: {
        fontSize: vars.typography.fontSize.h5,
        fontWeight: vars.typography.fontWeight.regular,
        color: vars.palette.textPrimary
      },
      h6: {
        fontSize: vars.typography.fontSize.h6,
        fontWeight: vars.typography.fontWeight.regular,
        color: vars.palette.textPrimary
      },
      subtitle1: {
        fontSize: vars.typography.fontSize.subtitle1,
        fontWeight: vars.typography.fontWeight.medium,
        color: vars.palette.textPrimary
      },
      subtitle2: {
        fontSize: vars.typography.fontSize.subtitle2,
        fontWeight: vars.typography.fontWeight.regular,
        color: vars.palette.textSecondary
      },
      body1: {
        fontSize: vars.typography.fontSize.body1,
        fontWeight: vars.typography.fontWeight.regular,
        color: vars.palette.textPrimary
      },
      caption: {
        fontSize: vars.typography.fontSize.caption,
        fontWeight: vars.typography.fontWeight.regular,
        textTransform: 'uppercase',
        color: vars.palette.textSecondary
      },
      button: {
        fontSize: vars.typography.fontSize.button,
        fontWeight: vars.typography.fontWeight.regular,
        textTransform: 'none',
        boxShadow: 'none',
        color: vars.button.color,
        borderRadius: vars.button.borderRadius
      },
      buttonActive: {
        color: vars.palette.primaryMain || vars.palette.secondaryMain
      },
      hyperLink: {
        color:
          _get(vars, 'palette.hyperLinkColor', '') || vars.palette.primaryMain
      }
    },
    spacing: (factor) => `${0.25 * factor}rem`,
    transitions: {
      speed: 0.7,
      ease: 0.1,
      fastSpeed: 0.4
    },
    overrides: _merge(
      {
        // Name of the component :atom_symbol: / style sheet
        MuiButton: {
          // Name of the rule
          text: {
            boxShadow: 'none'
          },
          contained: {
            boxShadow: 'none'
          },
          outlinedPrimary: {
            borderRadius: 8,
            fontWeight: vars.typography.fontWeight.medium,
            borderWidth: '1px'
          }
        },
        MuiIconButton: {
          label: {
            color: vars.palette.primaryMain
          }
        },
        MuiBadge: {
          root: {
            borderRadius: 50
          }
        },
        MuiTooltip: {
          tooltip: {
            fontSize: 14
          }
        },
        MuiTypography: {
          caption: {
            fontSize: vars.typography.fontSize.caption
          }
        },
        MuiDialog: {
          paperScrollPaper: {
            maxHeight: 'calc(100% - 50px)'
          }
        },
        // MuiDialogpaper: {
        //   maxWidth: '100%'
        // },
        MuiPaper: {
          rounded: {
            borderRadius: 16,
            padding: 20
          }
        },
        MuiTable: {
          root: {
            background: vars.palette.backgroundMain,
            borderSpacing: '0 8px',
            borderCollapse: 'separate',
            overflowX: 'auto'
            // padding: '0 1em'
          }
        },
        MuiMenu: {
          paper: {
            padding: 10,
            marginTop: '4rem'
          }
        },
        MuiMenuItem: {
          root: {
            fontSize: '18px'
          }
        },
        MuiTab: {
          root: {
            margin: '6px 12px',
            padding: 0
          }
        },

        MuiTableCell: {
          root: {
            borderBottom: 'none',
            padding: '4px 12px'
          },
          head: {
            fontSize: 14,
            color: vars.palette.textPrimary
          },
          body: {
            fontSize: vars.typography.fontSize.body1,
            color: vars.palette.textPrimary,
            backgroundColor: vars.palette.white,
            '&:first-child': {
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5
            },
            '&:last-child': {
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5
            }
          }
        },
        MuiTableRow: {
          root: {
            height: 60
          }
        },
        MuiTablePagination: {
          spacer: '1em',
          caption: {
            textTransform: 'none',
            color: vars.palette.grayOne
          },
          select: {
            paddingLeft: 0,
            paddingTop: '12px',
            fontSize: '14px'
          },
          actions: {
            '& .Mui-disabled': {
              '& svg': {
                color: vars.lightSilver
              }
            },
            button: {
              backgroundColor: vars.palette.backgroundHighlight,
              borderRadius: '30%'
            }
          }
        },
        MuiExpansionPanel: {
          rounded: {
            padding: 5,
            marginBottom: 10,
            '&:first-child': {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16
            },
            '&:last-child': {
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16
            },
            '&:not(:first-child)': {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16
            },
            '&:not(:last-child)': {
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16
            }
          },
          root: {
            '&$expanded': {
              '&:last-child': {
                marginBottom: 10
              }
            },
            '&:before': {
              height: 0
            }
          }
        },
        MuiTabs: {
          root: {
            borderBottom: `1px solid ${vars.palette.lightGray}`
          },
          indicator: {
            height: 4
          }
        },
        MuiBackdrop: {
          root: {
            background: '#000 0% 0% no-repeat padding-box',
            backgroundColor: '#000 0% 0% no-repeat padding-box',
            opacity: '0.34 !important',
            backdropFilter: 'blur(19px)'
          }
        },

        // old theme items
        MuiStepper: {
          horizontal: {
            backgroundColor: 'transparent'
          }
        },
        MuiStepLabel: {
          label: {
            color: vars.palette.textSecondary,
            fontSize: '12px'
          }
        },
        MuiInput: {
          input: {
            fontSize: 16
          },
          root: {
            '&$disabled': {
              color: vars.palette.darkGray,
              cursor: 'not-allowed',
              '& svg': {
                display: 'none'
              }
            }
          }
        },
        MuiSelect: {
          selectMenu: {
            height: '1.1876em'
          }
        },
        MuiInputLabel: {
          formControl: {
            fontSize: 14,
            color: vars.palette.textPrimary,
            textTransform: 'uppercase'
          },
          shrink: {
            fontSize: 16,
            color: vars.palette.textPrimary,
            textTransform: 'uppercase'
          }
        },
        MuiFormLabel: {
          root: {
            display: 'block',
            marginBottom: 5,
            color: vars.palette.darkGray
          },
          asterisk: {
            color: vars.palette.errorMain
          }
        },
        MuiSnackbarContent: {
          root: {
            backgroundColor: vars.palette.white
          }
        },
        // MuiExpansionPanelDetails: {  commented this out as it was breaking ui for customer 360 expansion panel
        //   root: {
        //     borderTop: '1px solid #ECECEC'
        //   }
        // },
        MUIDataTableToolbar: {
          titleText: {
            fontSize: 16,
            fontWeight: 600
          }
        },
        MUIDataTableSelectCell: {
          fixedHeader: {
            paddingLeft: 24
          }
        },
        MUIDataTableHeadCell: {
          fixedHeader: {
            zIndex: 0
          }
        },
        MuiSlider: {
          track: {
            height: 5,
            borderRadius: 5
          }
        },
        MuiChip: {
          deleteIconColorPrimary: {
            color: vars.palette.black
          }
        }
      },
      vars.overrides
    ),
    direction,
    shape: {
      borderRadius: 3
    },
    shadows: [
      'none',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)',
      '0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)'
    ]
  });
};

export default muiTheme;
