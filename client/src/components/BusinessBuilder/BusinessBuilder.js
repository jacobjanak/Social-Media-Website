/*
  This file is large partly because there is functionality for optional
  steps that is currently not being utilized but may be useful in the future.
*/

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Spacer from '../Spacer'

// steps
import Details from './Details';
import Overview from './Overview';
import Finances from './Finances';

const styles = theme => ({
  root: {
    width: '90%',
  },
  // if I want spacing between buttons
  leftButton: {
    marginRight: theme.spacing.unit,
  },
  rightButton: {
    marginLeft: theme.spacing.unit,
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
  constructor(props) {
    super()
    const { firstName, lastName } = props.user;

    this.state = {
      activeStep: 0,
      skipped: new Set(),
      name: `${firstName || ''} ${lastName || 'User'}'s Company`,
      fundStage: null,
      businessStage: null,
      product: false,
      service: false,
      industries: [],
      city: '',
      zip: '',
      bio: '',
      description: '',
      problem: '',
      solution: '',
      market1: '',
      market2: '',
      market3: '',
      market4: '',
      competitor1: '',
      competitor2: '',
      competitor3: '',
      competitor4: '',
      tested: '',
      currency: 'USD',
      forecast: '',
      salesPlan: '',
      marketingPlan: ''
    };
  }

  getSteps = () => ([
    'Details',
    'Overview',
    'Finances',
    'Timeline & Traction',
    'Strategy'
  ]);

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Details
            { ...this.state }
            handleChange={this.handleChange}
            handleCheck={this.handleCheck}
            handleMultiSelect={this.handleMultiSelect}
          />
        );
      case 1:
        return (
          <Overview
            { ...this.state }
            handleChange={this.handleChange}
          />
        );
      case 2:
        return (
          <Finances
            { ...this.state }
            handleChange={this.handleChange}
          />
        );
      default:
        return "Nothing here yet";
    }
  };

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

  isStepSkipped = step => {
    return this.state.skipped.has(step);
  };

  handleMultiSelect = value => {
    // value is an array of objects, not strings
    this.setState({ industries: value })
  }

  handleCheck = event => {
    // for when a checkbox is checked
    this.setState({ [event.target.name]: event.target.checked })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

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

        <Grid container justify="flex-end" style={{ paddingRight: 24 }}>
          <Button
            disabled={activeStep === 0}
            onClick={this.handleBack}
          >
            Back
          </Button>
          {this.isStepOptional(activeStep) && (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSkip}
            >
              Skip
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleNext}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Grid>

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
          <Grid
            className={classes.step}
            justify="center"
            container
          >
            <Grid item xs={12} sm={10} md={8} lg={6}>
              {/* each step gets rendered here */}
              { this.getStepContent(activeStep) }

              <Grid container justify="flex-end">
                <Spacer />
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                >
                  Back
                </Button>
                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                  >
                    Skip
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(BusinessBuilder);
