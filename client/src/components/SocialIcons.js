import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  iconButton: {
    fontSize: 16,
    height: 32,
    width: 32,
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
      height: 48,
      width: 48,
    },
  },
});

class SocialIcons extends Component {
  render() {
    const { classes, links, color } = this.props;

    const style = color ? { color } : {};

    return (
      <React.Fragment>
        { links.linkedin && (
          <a href={links.linkedin} target="_blank">
            <IconButton
              className={classes.iconButton}
              aria-label="LinkedIn"
              style={style}
            >
              <span className="fa fa-linkedin"></span>
            </IconButton>
          </a>
        )}
        { links.twitter && (
          <a href={links.twitter} target="_blank">
            <IconButton
              className={classes.iconButton}
              aria-label="Twitter"
              style={style}
            >
              <span className="fa fa-twitter"></span>
            </IconButton>
          </a>
        )}
        { links.facebook && (
          <a href={links.facebook} target="_blank">
            <IconButton
              className={classes.iconButton}
              aria-label="Facebook"
              style={style}
            >
              <span className="fa fa-facebook"></span>
            </IconButton>
          </a>
        )}
        { links.instagram && (
          <a href={links.instagram} target="_blank">
            <IconButton
              className={classes.iconButton}
              aria-label="Instagram"
              style={style}
            >
              <span className="fa fa-instagram"></span>
            </IconButton>
          </a>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SocialIcons);
