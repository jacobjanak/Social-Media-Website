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
import API from '../../utils/API';

// steps
import Details from './Details';
import Overview from './Overview';
import Finances from './Finances';
import Timeline from './Timeline';
import Strategy from './Strategy';

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
    paddingTop: 0,
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
    const { id, firstName, lastName } = props.user;

    const companyName = firstName && lastName
      ? `${firstName} ${lastName}'s Company`
      : '';

    this.state = {
      owner: id,
      activeStep: 0,
      skipped: new Set(),
      name: companyName,
      fundStage: null,
      businessStage: null,
      product: false,
      service: false,
      industries: [],
      city: '',
      zip: '',
      country: {
        value: 'United States',
        label: 'United States',
      },
      bio: '',
      description: '',
      problem: '',
      benefits: '',
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
      marketingPlan: '',
      website: '',
      team: [],
    };
  }

  componentWillMount() {
    // example: site.com/business-builder/4 takes user to step 4
    const { step } = this.props.match.params;
    const num = Number(step);

    if (num && Number.isInteger(num) && (
      // validate the size of the number
      0 < num && num <= this.getSteps().length
    )) {
      this.setState({ activeStep: num - 1 })
    } else {
      // default to step 1
      this.updateURL()
    }
  }

  updateURL = step => {
    const url = `/business-builder/${this.state.activeStep + 1}`;
    this.props.history.push(url)
  };

  getSteps = () => ([
    'Company Details',
    'Overview',
    'Finances',
    'Timeline & Traction',
    'Final Strategy'
  ]);

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Details
            { ...this.state }
            handleChange={this.handleChange}
            handleCheck={this.handleCheck}
            industrySelect={this.industrySelect}
            countrySelect={this.countrySelect}
            addTeamMember={this.addTeamMember}
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
      case 3:
        return (
          <Timeline
            { ...this.state }
            handleChange={this.handleChange}
          />
        );
      case 4:
        return (
          <Strategy
            { ...this.state }
            handleChange={this.handleChange}
          />
        );
      default:
        return null;
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
      skipped
    }, this.updateURL)
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
    }, this.updateURL)
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

  handleSubmit = () => {
    // this.setState({ activeStep: 0 })
    API.createBusiness({
      owner: this.state.owner,
      name: this.state.name,
      bio: this.state.bio
    })
    .then(business => {
      this.props.history.push('/dashboard')
    })
    .catch(err => alert(err.message))
  };

  isStepSkipped = step => {
    return this.state.skipped.has(step);
  };

  industrySelect = value => {
    // value is an array of objects, not strings
    this.setState({ industries: value })
  };

  countrySelect = value => {
    // value is an object, not string
    this.setState({ country: value })
  };

  addTeamMember = person => {
    this.setState(prevState => {
      prevState.team.push(person)
      return prevState;
    })
  };

  handleCheck = event => {
    // for when a checkbox is checked
    this.setState({ [event.target.name]: event.target.checked })
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
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

        <Grid container justify="flex-end" style={{ paddingRight: 24 }}>
          <Button
            disabled={activeStep === 0}
            onClick={this.handleBack}
          >
            Back
          </Button>

          {/* Skip button */}
          {this.isStepOptional(activeStep) && (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSkip}
            >
              Skip
            </Button>
          )}

          {activeStep !== steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Finish
            </Button>
          )}
        </Grid>

        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              { "All steps completed - you're finished" }
            </Typography>
            <Button className={classes.button} onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        ) : (
          <Grid
            className={classes.step}
            justify="center"
            container
          >
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Typography variant="display1" align="center" color="primary">
                {steps[activeStep]}
              </Typography>
              <Spacer half={true} />

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
