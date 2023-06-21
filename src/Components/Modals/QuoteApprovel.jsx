import React from "react";
import { useStateful } from "react-hanger";
import StringUtils from "lib/utils/strings";
import {
  Grid,
  Box,
  Button,
  Typography,
  makeStyles,
  TextareaAutosize,
} from "@material-ui/core";

const QuoteApprove = ({
  context,
  user,
  onCancel,
  onSubmit,
  modalId,
  title,
  type,
  loading,
  error,
  parent
}) => {
  const classes = useStyles();
  const description = useStateful("");

  const handleSubmit = () => {
    onSubmit({
      status: "QUOTE_APPROVAL",
      statusChangeReason: description.value,
      id: context.lead.id,
      statusChangeBy: context.user?.sub,
      modalId,
      quoteId: context.quoteId,
      oppId:context?.opportuntiData?.id,
      
      user: context?.user,
      contractId:context?.opportuntiData?.contract?.id,
       parent:parent

    });
  };

  const getTitle = () =>
    ` Approved By ${StringUtils.capitalizeFirst(context?.user?.sub)}`;

  return (
    <Box className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        spacing={6}
        className={classes.inner}
      >
        <Grid item>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4">  Quote & Contract Approval</Typography>
            </Grid>
            {error && (
              <Grid item>
                <Typography className={classes.error} variant="body">
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="h6" className={classes.subtitle}>
            {getTitle()}
          </Typography>
        </Grid>

        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="subtitle2">Description</Typography>
            </Grid>
            <Grid item>
              <TextareaAutosize
                rowsMin={4}
                rowsMAx={6}
                placeholder="Your Description Here"
                className={classes.textarea}
                onChange={(e) => description.setValue(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
            spacing={4}
          >
            <Grid item>
              <Button
                onClick={onCancel}
                size="large"
                variant="text"
                color="secondary"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                size="large"
              >
                {loading ? "Approving ..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
  },

  error: {
    color: theme.palette.error.main,
  },

  inner: {
    width: theme.spacing(100),
    padding: theme.spacing(6),
    height: "auto",
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(4),
  },

  subtitle: {
    fontWeight: theme.typography.fontWeightMedium,
  },

  textarea: {
    width: "100%",
    minWidth: "100%",
    maxWidth: theme.spacing(92),
    maxHeight: theme.spacing(104),
    border: `none`,
    color: theme.palette.text.primary,
    fontFamily: "inherit",
  },

  mtop50: {
    marginTop: "50px",
  },

  submitBtn: {
    background: "#2626C0",
    width: "93px",
    color: "white",
    borderRadius: "8px",
    fontSize: "16px",
    "&:hover": {
      background: "#2626C0",
    },
  },

  titleColor: {
    color: "#CECECE",
  },
}));

QuoteApprove.defaultProps = {
  context: {},
  type: "Lead",
};
export default QuoteApprove;
