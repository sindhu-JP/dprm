import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';

function UploadHistoryTable() {
  return (
    <Table style={{backgroundColor: 'white'}}>
      <TableHead>
        <TableRow>
          <TableCell style={{fontSize: '14px', color: 'grey'}}>Processed Date</TableCell>
          <TableCell style={{fontSize: '14px', color: 'grey'}}>Request ID</TableCell>
          <TableCell style={{fontSize: '14px', color: 'grey'}}>Request Type</TableCell>
          <TableCell style={{fontSize: '14px', color: 'grey'}}>Uploaded By</TableCell>
          <TableCell style={{fontSize: '14px', color: 'grey'}}>Uploaded</TableCell>
          <TableCell style={{fontSize: '14px', color: 'grey'}}>Processed</TableCell>
          <TableCell style={{fontSize: '14px', color: 'grey'}}>Rejected</TableCell>
          <TableCell style={{fontSize: '14px', color: 'grey'}}>Status</TableCell>
          <TableCell style={{fontSize: '14px', color: 'grey'}}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow style={{border: '1px solid red', margin: '1.5rem 0', padding: '0.6rem' }}>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>3rd Mar 2023 11:00 AM</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>BJQ326661</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>MannualCommissioning</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>dclmappuser200</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>10</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>10</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>1</TableCell>
          <TableCell> <Button style={{ backgroundColor: '#2ED573', color: 'white', fontSize: '12px' }} variant="contained" >Completed</Button></TableCell>
          <TableCell> <Button style={{ backgroundColor: '#F2F2F2', color: 'primary' , fontSize: '12px'}} variant="contained" >View more</Button></TableCell>
        </TableRow>
        <TableRow style={{border: '1px solid red', margin: '1.5rem 0', padding: '0.6rem' }}>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>3rd Mar 2023 11:00 AM</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>BJQ326661</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>MannualCommissioning</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>dclmappuser200</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>10</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>10</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>1</TableCell>
          <TableCell> <Button style={{ backgroundColor: '#2ED573', color: 'white', fontSize: '12px' }} variant="contained" >Completed</Button></TableCell>
          <TableCell style={{ color: 'primary'}}> <Button style={{ backgroundColor: '#F2F2F2', color: 'primary' , fontSize: '12px'}} variant="contained" >View more</Button></TableCell>
        </TableRow>
        <TableRow style={{border: '1px solid red', margin: '1.5rem 0', padding: '0.6rem' }}>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>3rd Mar 2023 11:00 AM</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>BJQ326661</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>MannualCommissioning</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>dclmappuser200</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>10</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>10</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>1</TableCell>
          <TableCell> <Button style={{ backgroundColor: '#2ED573', color: 'white', fontSize: '12px' }} variant="contained" >Completed</Button></TableCell>
          <TableCell> <Button style={{ backgroundColor: '#F2F2F2', color: 'primary' , fontSize: '12px'}} variant="contained" >View more</Button></TableCell>
        </TableRow>
        <TableRow style={{border: '1px solid red', margin: '1.5rem 0', padding: '0.6rem' }}>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>3rd Mar 2023 11:00 AM</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>BJQ326661</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>MannualCommissioning</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>dclmappuser200</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>10</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>10</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>1</TableCell>
          <TableCell> <Button style={{ backgroundColor: '#2ED573', color: 'white', fontSize: '12px' }} variant="contained" >Completed</Button></TableCell>
          <TableCell> <Button style={{ backgroundColor: '#F2F2F2', color: 'primary' , fontSize: '12px'}} variant="contained" >View more</Button></TableCell>
        </TableRow>
        <TableRow style={{border: '1px solid red', margin: '1.5rem 0', padding: '0.6rem' }}>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>3rd Mar 2023 11:00 AM</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>BJQ326661</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>MannualCommissioning</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>dclmappuser200</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>10</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>10</TableCell>
          <TableCell style={{fontSize: '13px', color: 'grey'}}>1</TableCell>
          <TableCell> <Button style={{ backgroundColor: '#2ED573', color: 'white', fontSize: '12px' }} variant="contained" >Completed</Button></TableCell>
          <TableCell> <Button style={{ backgroundColor: '#F2F2F2', color: 'primary' , fontSize: '12px'}} variant="contained" >View more</Button></TableCell>
        </TableRow>
       
        
       
    
      </TableBody>
    </Table>
  );
}

export default UploadHistoryTable;
