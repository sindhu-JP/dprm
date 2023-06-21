import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import SvgIcon from './SvgIcon';

const styles = (theme) => ({
  active: {
    display: 'block'
  },
  inActive: {
    display: 'none'
  },
  animate: {
    animation: `$myEffect 1000ms`,
    opacity: 1
  },
  '@keyframes myEffect': {
    '0%': {
      opacity: 0
    },
    '50%': {
      opacity: 0.5
    },
    '100%': {
      opacity: 1
    }
  },
  icon: {
    height: theme.spacing(12),
    width: theme.spacing(12),
    padding: theme.spacing(2, 1.5, 0, 2),
    cursor: 'pointer',
    background: `${theme.palette.secondary.contrastText} 0% 0% no-repeat padding-box`,
    boxShadow: `0 ${theme.spacing(1)} ${theme.spacing(2)} ${
      theme.palette.common.grayShadow
    }`,
    borderRadius: theme.spacing(30)
  }
});

/**
 * This function used to get the exact child element count
 * @param {*} children
 */
const getElementCount = (children) => {
  const elements = children.filter((child) => child || null);
  return elements.length;
};

/**
 * This function used to get the actual child elements
 * @param {*} children
 */
const getElements = (children) => {
  return children.filter((child) => child || null);
};

class Slick extends Component {
  constructor(props) {
    super(props);
    const counts = getElementCount(props.children);
    this.state = {
      activeIndex: new Array(counts).fill().map((a, i) => i),
      totalCount: counts,
      enableNext: true,
      enablePrev: false
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    if (getElementCount(props.children) !== prevState.totalCount) {
      const counts = getElementCount(props.children);
      return {
        totalCount: counts,
        activeIndex: new Array(counts).fill().map((a, i) => i)
      };
    }
    return prevState;
  }

  /**
   * Trigger when click the next arrow item
   */
  next = () => {
    let { enableNext, enablePrev } = this.state;
    const { maxCount = 2 } = this.props;
    const { activeIndex, totalCount = 1 } = this.state;

    if (!enableNext) {
      return;
    }
    const active = [...activeIndex];
    if (activeIndex[maxCount - 2] === totalCount - maxCount) {
      enableNext = false;
    }
    enablePrev = true;
    active.push(active.shift());
    this.setState({
      activeIndex: [...active],
      enableNext,
      enablePrev
    });
  };

  /**
   * Trigger when click the previous arrow
   */
  prev = () => {
    let { enableNext, enablePrev } = this.state;
    const { activeIndex } = this.state;
    if (!enablePrev) {
      return;
    }
    let active = [...activeIndex];
    if (activeIndex[0] === 1) {
      enablePrev = false;
    }
    enableNext = true;
    active = [active[active.length - 1], ...active.slice(0, active.length - 1)];
    this.setState({
      activeIndex: [...active],
      enableNext,
      enablePrev
    });
  };

  /**
   * Render method of slick
   */
  render() {
    const { activeIndex, enableNext, enablePrev, totalCount } = this.state;
    const { classes, children, maxCount = 2, customClasses = {} } = this.props;
    if (totalCount <= maxCount) {
      return children;
    }
    const active = activeIndex.slice(0, maxCount);
    const childs = getElements(children);
    return (
      <>
        {enablePrev || totalCount > maxCount ? (
          <div
            onClick={this.prev}
            className={classNames(classes.icon, customClasses.icon)}
          >
            <SvgIcon iconName={enablePrev ? 'Slick-Prev' : 'Prev-Inactive'} />
          </div>
        ) : null}
        {Array(totalCount)
          .fill('')
          .map((v, i) => {
            return (
              <Grid
                key={i}
                item
                className={
                  active.indexOf(i) > -1
                    ? `${classes.active} ${classes.animate}`
                    : classes.inActive
                }
              >
                {childs[i]}
              </Grid>
            );
          })}
        <div
          onClick={this.next}
          className={classNames(classes.icon, customClasses.icon)}
        >
          <SvgIcon iconName={enableNext ? 'Slick-Next' : 'Next-Inactive'} />
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Slick);
