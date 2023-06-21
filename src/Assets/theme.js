import { createMuiTheme } from "@material-ui/core/styles";
import vars from "./colors";

const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 600,
};

const THEME_VARS = {
  // yellow: yellowVars,
};

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: vars.primaryMain,
      dark: vars.primaryDark,
      light: vars.primaryLight,
      contrastText: vars.contrastText,
    },
    secondary: {
      main: vars.secondaryMain,
      contrastText: vars.white,
    },
    error: {
      main: vars.errorMain,
      light: vars.errorLight,
      contrastText: vars.white,
    },
    warning: {
      main: vars.warningMain,
      contrastText: vars.black,
    },
    info: {
      main: vars.primaryMain,
    },
    success: {
      main: vars.successMain,
      dark: vars.successDark,
    },
    text: {
      primary: vars.textPrimary,
      secondary: vars.textSecondary,
    },
    background: {
      main: vars.backgroundMain,
      paper: vars.white,
      inactive: vars.backgroundInactive,
      highlight: vars.backgroundHighlight,
      light: vars.backgroundLight,
    },
    icon: {
      main: vars.primaryMain,
      filled: vars.mercury,
      stroke: vars.textPrimary,
      background: vars.backgroundHighlight,
      menuBackgroundInactive: vars.iconMenuBackgroundInactive,
    },
    common: {
      black: vars.black,
      white: vars.white,
      gold: vars.gold,
      platinum: vars.platinum,
      silver: vars.silver,
      lightSilver: vars.lightSilver,
      heliotrope: vars.heliotrope,
      manhattan: vars.manhattan,
      vividTangerine: vars.vividTangerine,
      illusion: vars.illusion,
      indigo: vars.indigo,
      turquoise: vars.turquoise,
      malibu: vars.malibu,
      doveGray: vars.doveGray,
      selectedGray: vars.selectedGray,
      gray: vars.gray,
      grayShadow: vars.grayShadow,
      mercury: vars.mercury,
      prussianBlue: vars.prussianBlue,
      backdrop: vars.backdrop,
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Roboto", sans-serif',
    ].join(","),
    fontWeightLight: fontWeight.light,
    fontWeightRegular: fontWeight.regular,
    fontWeightMedium: fontWeight.medium,
    fontWeightBold: fontWeight.bold,
    h1: {
      fontSize: 34,
      fontWeight: fontWeight.light,
      color: vars.textPrimary,
    },
    h2: {
      fontSize: 24,
      fontWeight: fontWeight.regular,
      color: vars.textPrimary,
    },
    h3: {
      fontSize: 20,
      fontWeight: fontWeight.light,
      textTransform: "uppercase",
      color: vars.textPrimary,
    },
    h4: {
      fontSize: 20,
      fontWeight: fontWeight.bold,
      color: vars.textPrimary,
    },
    h5: {
      fontSize: 18,
      fontWeight: fontWeight.regular,
      // textTransform: 'uppercase',
      color: vars.textPrimary,
    },
    h6: {
      fontSize: 16,
      fontWeight: fontWeight.regular,
      color: vars.textPrimary,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: fontWeight.medium,
      color: vars.textPrimary,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: fontWeight.regular,
      color: vars.textSecondary,
    },
    body1: {
      fontSize: 14,
      fontWeight: fontWeight.regular,
      // textTransform: 'uppercase',
      // color: vars.textSecondary
      color: vars.textPrimary,
    },
    body2: {
      fontSize: 12,
      fontWeight: fontWeight.regular,
      color: vars.textSecondary,
    },
    caption: {
      fontSize: 12,
      fontWeight: fontWeight.regular,
      color: vars.textPrimary,
    },
    button: {
      fontSize: 12,
      fontWeight: fontWeight.regular,
      textTransform: "none",
      boxShadow: "none",
    },
    label1: {
      fontSize: 12,
      fontWeight: fontWeight.regular,
      textTransform: "uppercase",
      color: vars.textSecondary,
    },
  },
  spacing: (factor) => `${0.25 * factor}rem`,
  transitions: {
    speed: 0.7,
    ease: 0.1,
    fastSpeed: 0.4,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "0.25rem",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 0.375rem rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "#8F98A3",
          borderRadius: "4rem",
        },
      },
    },
    // Name of the component :atom_symbol: / style sheet
    MuiButton: {
      // Name of the rule
      text: {
        boxShadow: "none",
      },
      contained: {
        boxShadow: "none"
      }
      // label: {
      //   textTransform: 'uppercase'
      // }
    },
    MuiIconButton: {
      // label: {
      //   color: vars.primaryMain,
      // },
    },
    MuiBadge: {
      root: {
        borderRadius: 50,
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
      },
    },
    MuiTypography: {
      caption: {
        fontSize: 12,
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        maxHeight: "calc(100% - 50px)",
      },
    },
    MuiPickersModal: {
      dialogRoot: {
      padding: '0px !important'
    }},
    MuiPaper: {
      rounded: {
        borderRadius: 16,
        padding: 20,
      },
    },
    MuiTable: {
      root: {
        background: vars.backgroundMain,
        borderSpacing: "0 8px",
        borderCollapse: "separate",
        // padding: '0 1em'
      },
    },
    MuiMenu: {
      paper: {
        padding: 10,
        marginTop: "4rem",
      },
    },
    MuiTab: {
      root: {
        margin: "6px 12px",
        padding: 0,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "none",
        padding: "4px 12px",
      },
      head: {
        fontSize: 14,
        color: vars.textPrimary,
      },
      body: {
        fontSize: 16,
        color: vars.textPrimary,
        backgroundColor: vars.white,
        "&:first-child": {
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        },
        "&:last-child": {
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        },
      },
    },
    MuiTableRow: {
      root: {
        height: 60,
      },
    },
    MuiTablePagination: {
      spacer: "1em",
      caption: {
        textTransform: "none",
        color: vars.grayOne,
      },
      select: {
        paddingLeft: 0,
      },
      actions: {
        button: {
          backgroundColor: vars.backgroundHighlight,
          borderRadius: "30%",
        },
      },
    },
    MuiExpansionPanel: {
      rounded: {
        padding: 5,
        marginBottom: 10,
        "&:first-child": {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        "&:last-child": {
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        },
        "&:not(:first-child)": {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        "&:not(:last-child)": {
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        },
      },
      root: {
        "&$expanded": {
          "&:last-child": {
            marginBottom: 10,
          },
        },
        "&:before": {
          height: 0,
        },
      },
    },
    MuiTabs: {
      root: {
        borderBottom: `1px solid ${vars.lightGray}`,
      },
      indicator: {
        height: 4,
      },
    },
    MuiBackdrop: {
      root: {
        background: "#000 0% 0% no-repeat padding-box",
        backgroundColor: "#000 0% 0% no-repeat padding-box",
        opacity: "0.34 !important",
        backdropFilter: "blur(19px)",
      },
    },

    // old theme items
    MuiStepper: {
      horizontal: {
        backgroundColor: "transparent",
      },
    },
    MuiStepLabel: {
      label: {
        color: vars.textSecondary,
        fontSize:'12px'
      },
    },
    MuiInput: {
      input: {
        fontSize: 16,
      },
      root: {
        "&$disabled": {
          color: vars.darkGray,
          cursor: "not-allowed",
          "& svg": {
            display: "none",
          },
        },
      },
    },
    MuiSelect: {
      selectMenu: {
        height: "1.1876em",
      },
    },
    MuiInputLabel: {
      formControl: {
        fontSize: 14,
        color: vars.textPrimary,
      },
      shrink: {
        fontSize: 16,
        color: vars.textPrimary,
      },
    },
    MuiFormLabel: {
      root: {
        display: "block",
        marginBottom: 5,
        color: vars.darkGray,
      },
      asterisk: {
        color: vars.errorMain,
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: vars.white,
      },
    },
    // MuiExpansionPanelDetails: {  commented this out as it was breaking ui for customer 360 expansion panel
    //   root: {
    //     borderTop: '1px solid #ECECEC'
    //   }
    // },
    MUIDataTableToolbar: {
      titleText: {
        fontSize: 16,
        fontWeight: 600,
      },
    },
    MUIDataTableSelectCell: {
      fixedHeader: {
        paddingLeft: 24,
      },
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        zIndex: 0,
      },
    },
    MuiSlider: {
      track: {
        height: 5,
        borderRadius: 5,
      },
    },
  },
  // direction,
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 0px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
  ],
});

export default muiTheme;

// import { createMuiTheme } from "@material-ui/core/styles";
// import { pxToRem } from "Utils";
// import colors from "./colors";

// const fonts = [
//   "Roboto",
//   "-apple-system",
//   "BlinkMacSystemFont",
//   '"Segoe UI"',
//   '"Helvetica Neue"',
//   "Arial",
//   "sans-serif",
//   '"Apple Color Emoji"',
//   '"Segoe UI Emoji"',
//   '"Segoe UI Symbol"',
//   '"Roboto", sans-serif',
// ].join(",");

// const weights = {
//   light: 300,
//   regular: 400,
//   medium: 500,
//   bold: 600,
// };

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: colors.primaryMain,
//     },
//     success: {
//       main: colors.successMain,
//       dark: colors.successDark,
//       light: colors.successLight,
//       contrastText: "#ffffff",
//     },
//     background: {
//       main: "#EDEDF5",
//       dark: "#333333",
//     },
//     common: {
//       white: "#ffffff",
//       textSecondary: colors.textSecondary,
//     },
//   },

//   typography: {
//     fontFamily: fonts,
//     fontWeightLight: weights.light,
//     fontWeightRegular: weights.regular,
//     fontWeightMedium: weights.medium,
//     fontWeightBold: weights.bold,

//     h1: {
//       fontSize: pxToRem(34),
//       fontWeight: weights.light,
//     },
//     h2: {
//       fontSize: pxToRem(24),
//       fontWeight: weights.regular,
//       color: colors.textPrimary,
//     },
//     h3: {
//       fontSize: pxToRem(20),
//       fontWeight: weights.light,
//       textTransform: "uppercase",
//     },
//     h4: {
//       fontSize: pxToRem(20),
//       fontWeight: weights.bold,
//     },
//     h5: {
//       fontSize: pxToRem(18),
//       fontWeight: weights.regular,
//     },
//     h6: {
//       fontSize: pxToRem(16),
//       fontWeight: weights.regular,
//     },

//     subtitle1: {
//       fontSize: pxToRem(14),
//       fontWeight: weights.medium,
//     },
//     subtitle2: {
//       fontSize: pxToRem(14),
//       fontWeight: weights.regular,
//     },

//     body1: {
//       fontSize: pxToRem(14),
//       fontWeight: weights.regular,
//     },
//     body2: {
//       fontSize: pxToRem(12),
//       fontWeight: weights.regular,
//     },

//     caption: {
//       fontSize: pxToRem(12),
//       fontWeight: weights.regular,
//     },
//     button: {
//       fontSize: pxToRem(12),
//       fontWeight: weights.regular,
//       textTransform: "none",
//       boxShadow: "none",
//     },
//     label1: {
//       fontSize: pxToRem(12),
//       fontWeight: weights.regular,
//       textTransform: "uppercase",
//     },
//   },

//   overrides: {
//     MuiPaper: {
//       // rounded: {
//       //   borderRadius: pxToRem(16),
//       //   padding: pxToRem(32),
//       // },
//     },
//     MuiButton: {
//       sizeLarge: {
//         borderRadius: pxToRem(8),
//         padding: `${pxToRem(8)} ${pxToRem(32)}`,
//       },
//       textSizeLarge: {
//         fontSize: pxToRem(14),
//         fontWeight: weights.medium,
//         padding: `${pxToRem(12)} ${pxToRem(32)}`,
//         borderRadius: pxToRem(8),
//       },
//       iconSizeLarge: {
//         width: pxToRem(24),
//       },
//     },
//   },

//   spacing: (factor) => `${0.25 * factor}rem`,
// });

// export default theme;
