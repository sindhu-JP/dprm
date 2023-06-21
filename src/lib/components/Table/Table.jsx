import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiTable from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: 'inherit'
  },
  row: {
    borderColor: 'red',
    '& td': {
      paddingLeft: '2rem',
      paddingRight: '2rem'
    }
  }
});

const Table = ({ data }) => {
  const [open, setOpen] = React.useState('');
  const classes = useStyles();

  return (
    <TableContainer component={Box}>
      <MuiTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">NAME/VAS</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">QTY</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">UPFRONT CHARGES</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">DISCOUNT</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">TOTAL</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">RENTALS</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">DISCOUNT</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">NO.OF MONTHS</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle2">TOTAL</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.rows?.map((row) => (
            <TableRow key={row.name} className={classes.row}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{`$${row.upfront}.00`}</TableCell>
              <TableCell align="right">{`$${row.discount1}.00`}</TableCell>
              <TableCell align="right">{`$${row.total1}.00`}</TableCell>
              <TableCell align="right">{`$${row.rentals}.00`}</TableCell>
              <TableCell align="right">{`$${row.discount2}.00`}</TableCell>
              <TableCell align="right">{row.months}</TableCell>
              <TableCell align="right">{`$${row.total2}.00`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
