import { createMuiTheme } from '@material-ui/core/styles';

export const UsageTableConfig = theme =>
  createMuiTheme({
    ...theme,
    overrides: {
      MuiTable: {
        root: {
          borderSpacing: '0 8px',
          borderCollapse: 'separate'
        }
      },
      MuiTableCell: {
        root: {
          borderBottom: 'none',
          padding: '4px 24px'
        },
        head: {
          fontSize: 14,
          letterSpacing: 0,
          textTransform: 'uppercase',
          color: theme.palette.text.primary
        },
        body: {
          fontSize: 16,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.common.white
        }
      },
      MuiTableRow: {
        root: {
          height: 62
        }
      }
    }
  });
