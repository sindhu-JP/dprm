import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MinimizeIcon from '@material-ui/icons/Minimize';
import MaximizeIcon from '@material-ui/icons/Maximize';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
// import SVGIcon from 'lib/components/SvgIcon';
// import SvgIcon from 'common/components/SvgIcon';
import SvgFile from 'lib/components/SvgFile'

const boxShadow = '0 5px 8px 0 rgba(0,0,0,0.2)';
const styles = (theme) => ({
  dialog: {
    position: 'fixed',
    bottom: 10,
    right: 0,
    marginRight: 20,
    minHeight: theme.spacing(160),
    width: '40%',
    backgroundColor: theme.palette.common.white,
    boxShadow,
    borderRadius: theme.spacing(8),
    zIndex: 1202
  },
  fullscreen: {
    position: 'absolute',
    zIndex: 1202,
    top: 0,
    left: 0,
    width: '100%',
    // height: '1600px',
    backgroundColor: theme.palette.background.highlight
  },
  minimized: {
    position: 'fixed',
    bottom: 10,
    right: 0,
    paddingRight: 20,
    minHeight: '0',
    height: '50px',
    width: '50%',
    zIndex: 1202,
    // overflow: 'hidden',
    boxShadow,
    borderRadius: theme.spacing(0, 0, 2, 2)
  },
  header: {
    width: '100%',
    padding: '0 0 0 15px',
    background: theme.palette.common.gray,
    color: theme.palette.common.white,
    borderRadius: theme.spacing(6, 6, 0, 0),
    height: 50
  },
  callLogHeader: {
    width: '100%',
    padding: '0 0 0 15px',
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
    borderRadius: theme.spacing(6, 6, 0, 0),
    height: 50
  },
  content: {
    // padding: '10px',
    width: '100%'
  },
  minWidth: {
    position: 'fixed',
    bottom: 10,
    right: 0,
    marginRight: 20,
    minHeight: theme.spacing(160),
    width: '50%',
    backgroundColor: theme.palette.common.white,
    boxShadow,
    borderRadius: theme.spacing(8),
    zIndex: 1202
  }
});
class TicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'max'
    };
  }

  render() {
    const {
      headerText,
      children,
      fullscreen,
      classes,
      logTicket,
      troubleTicketMaximize,
      showLogTicketUI,
      callLogId
    } = this.props;
    return (
      <Grid
        container
        alignItems="stretch"
        direction="column"
        justifyContent="flex-start"
        className={
          !fullscreen && logTicket && this.state.mode !== 'min'
            ? classes.minWidth
            : fullscreen
            ? classes.fullscreen
            : this.state.mode === 'max'
            ? classes.dialog
            : classes.minimized

        // classes.fullscreen
        }
      >
        {!fullscreen && (
          <Grid item style={{ width: '100%' }}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              className={
                showLogTicketUI ? classes.header : classes.callLogHeader
              }
            >
              {showLogTicketUI ? (
                <Grid item>{headerText}</Grid>
              ) : (
                <Grid item>{`CALL LOG ID: ${callLogId}`}</Grid>
              )}
              <Grid item>
                {this.state.mode === 'max' && (
                  <IconButton
                    aria-label="Minimize"
                    onClick={() => {
                      this.props.Min_mode()
                      this.setState({ mode: 'min' });
                    }}
                  >
                    <MinimizeIcon fontSize="small" style={{ color: '#fff' }} />
                  </IconButton>
                )}
                {this.state.mode === 'min' && troubleTicketMaximize && (
                  <IconButton
                    aria-label="Maximize"
                    onClick={() => {
                      this.props.max_mode()
                      this.setState({ mode: 'max' });
                    }}
                  >
                    <MaximizeIcon fontSize="small" style={{ color: '#fff' }} />
                  </IconButton>
                )}

                {troubleTicketMaximize && (
                  <IconButton
                    aria-label="fullscreen_enter"
                    onClick={() => {
                      this.props.onEnterFullscreen();
                    }}
                  >
                    <SvgFile iconName="maximizenew" iconWidth={15} />
                  </IconButton>
                )}

                <IconButton
                  aria-label="Close"
                  onClick={() => {
                    this.props.onClose();
                  }}
                >
                  <SvgFile iconName="close" iconWidth={15} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item className={classes.content}>
          {children}
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(TicketModal);

/*
//usage
<Dialog onFullscreen={} headerText="">
  <children/>
</Dialog>
*/
