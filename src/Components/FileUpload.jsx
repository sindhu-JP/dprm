import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(50),
    height: 'auto',
    border: `1px solid #e2e2e2`,
    borderRadius: theme.spacing(1),
    backgroundColor: '#ffffff'
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#e2e2e2',
    borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    color: theme.palette.common.textSecondary,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    textAlign: 'center',
    cursor: 'pointer',
    '& span': {
      color: theme.palette.primary.main,
      fontSize: '16px',
      fontWeight: theme.typography.fontWeightBold
    }
  },
  controls: {
    color: theme.palette.primary.main
  }
}));
const FileUpload = (props) => {
  const classes = useStyles();

  const onDrop = React.useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box px={6} py={4} className={classes.root}>
      <Grid container direction="column">
        <Grid style={{ textAlign: 'center' }} item>
          <Typography textAlign="center" variant="h6" className={classes.title}>
            {props.label}
          </Typography>
        </Grid>
        <Grid item>
          <Box {...getRootProps()} my={4} className={classes.inputWrapper}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <Grid container direction="column">
                <Grid item>
                  <FileCopyIcon />
                </Grid>
                <Grid item>
                  <p>
                    Drag 'n' drop some files here, or click to{' '}
                    <span>Select files</span>
                  </p>
                </Grid>
              </Grid>
            )}
          </Box>
        </Grid>
        <Grid item>
          <Grid
            className={classes.controls}
            container
            direction="row"
            alignItem="center"
            justify="flex-end"
          >
            <Grid item>
              <DescriptionOutlinedIcon />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

FileUpload.defaultProps = {};
FileUpload.propTypes = {};

export default FileUpload;
