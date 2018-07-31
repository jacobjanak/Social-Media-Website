/*
  This file is large partly because there is functionality for optional
  steps that is currently not being utilized but may be usefule in the future.
*/

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// steps
import Details from './Details';

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  step: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 4 * theme.spacing.unit,
  }
});

class BusinessBuilder extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return <Details user={this.props.user} />;
      default:
        return "Nothing here yet";
    }
  };

  getSteps = () => ([
    'Details',
    'Overview',
    'Finances',
    'Timeline',
    'Strategy'
  ]);

  isStepOptional = step => false;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({ activeStep: activeStep - 1 })
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // should never occur unless they're hacking
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 })
  };

  isStepSkipped = (step) => {
    return this.state.skipped.has(step);
  };

  render() {
    const { classes, user } = this.props;
    const { activeStep } = this.state;
    const steps = this.getSteps();

    return (
      <div className={classes.root}>
        <Stepper
          className={classes.stepper}
          activeStep={activeStep}
        >
          {steps.map((label, i) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(i)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (this.isStepSkipped(i)) {
              props.completed = false;
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                { "All steps completed - you're finished" }
              </Typography>
              <Button className={classes.button} onClick={this.handleReset}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Grid
                className={classes.step}
                justify="center"
                container
              >
                {/* each step gets rendered here */}
                { this.getStepContent(activeStep) }
              </Grid>
              <Grid container justify="center">
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {this.isStepOptional(activeStep) && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSkip}
                      className={classes.button}
                    >
                      Skip
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
              </Grid>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BusinessBuilder);
