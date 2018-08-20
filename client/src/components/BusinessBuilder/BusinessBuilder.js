/*
  This file is large partly because there is functionality for optional
  steps that is currently not being utilized but may be useful in the future.
*/

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
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
    width: '100%',
  },
  paper: {
    paddingTop: 4 * theme.spacing.unit,
    paddingLeft: 8 * theme.spacing.unit,
    paddingRight: 8 * theme.spacing.unit,
    paddingBottom: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
      borderRadius: 0,
    },
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  stepper: {
    backgroundColor: 'transparent',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 8 * theme.spacing.unit,
      paddingRight: 8 * theme.spacing.unit,
    },
  },
  step: {
    marginBottom: 4 * theme.spacing.unit,
  },
  mobileStepper: {
    boxShadow: 'none',
  },
  mobileBack: {
    paddingRight: 2 * theme.spacing.unit,
  },
  mobileNext: {
    paddingLeft: 2 * theme.spacing.unit,
  },
  controlsContainer: {
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
      paddingRight: 24
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
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
      // stuff for step counter
      activeStep: 0,
      skipped: new Set(),
      steps: [
        'Public Info',
        'Overview',
        'Finances',
        'Timeline & Traction',
        'Final Strategy'
      ],
      // responsiveness
      isDesktop: true,
      isTablet: true,
      // form data
      owner: id,
      name: props.business.name || companyName,
      logo: '',
      logoPreview: props.business.logo || '',
      fundStage: props.business.fundStage || null,
      businessStage: props.business.businessStage || null,
      product: props.business.product || false,
      service: props.business.service || false,
      industries: props.business.industries || [],
      city: props.business.city || '',
      zip: props.business.zip || '',
      bio: props.business.bio || '',
      description: props.business.description || '',
      problem: props.business.problem || '',
      benefits: props.business.benefits || '',
      solution: props.business.solution || '',
      market1: props.business.market1 || '',
      market2: props.business.market2 || '',
      market3: props.business.market3 || '',
      market4: props.business.market4 || '',
      competitor1: props.business.competitor1 || '',
      competitor2: props.business.competitor2 || '',
      competitor3: props.business.competitor3 || '',
      competitor4: props.business.competitor4 || '',
      tested: props.business.tested || '',
      currency: props.business.currency || 'USD',
      forecast: props.business.forecast || '',
      salesPlan: props.business.salesPlan || '',
      salesPlanLength: props.business.salesPlanLength || '',
      marketingPlan: props.business.marketingPlan || '',
      marketingPlanLength: props.business.marketingPlanLength || '',
      website: props.business.website || '',
      team: props.business.team || [],
      stream1: props.business.stream1 || '',
      stream2: props.business.stream2 || '',
      stream3: props.business.stream3 || '',
      costOfStream1: props.business.costOfStream1 || 0,
      costOfStream2: props.business.costOfStream2 || 0,
      costOfStream3: props.business.costOfStream3 || 0,
      startOfStream1: props.business.startOfStream1 || '',
      startOfStream2: props.business.startOfStream2 || '',
      startOfStream3: props.business.startOfStream3 || '',
      rent: props.business.rent || 0,
      utilities: props.business.utilities || 0,
      directCost: props.business.directCost || 0,
      personnel: props.business.personnel || 0,
      expenses: props.business.expenses || 0,
      assets: props.business.assets || 0,
      taxes: props.business.taxes || 0,
      dividends: props.business.dividends || 0,
      cashFlow: props.business.cashFlow || 0,
      financials: props.business.financials || 0,
      milestone1: props.business.milestone1 || '',
      milestone2: props.business.milestone2 || '',
      milestone3: props.business.milestone3 || '',
      milestoneDate1: props.business.milestoneDate1 || '',
      milestoneDate2: props.business.milestoneDate2 || '',
      milestoneDate3: props.business.milestoneDate3 || '',
      country: {
        value: props.business.country || 'United States',
        label: props.business.country || 'United States',
      },
    };
  }

  // componentWillMount() {
  //   // // example: site.com/business-builder/4 takes user to step 4
  //   // const { step } = this.props.match.params;
  //   // const num = Number(step);
  //   //
  //   // if (num && Number.isInteger(num) && (
  //   //   // validate the size of the number
  //   //   0 < num && num <= this.state.steps.length
  //   // )) {
  //   //   this.setState({ activeStep: num - 1 })
  //   // } else {
  //   //   // default to step 1
  //   //   this.updateURL()
  //   // }
  // }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  static getDerivedStateFromProps(props, state) {
    // example: site.com/business-builder/4 takes user to step 4
    const { step } = props.match.params;
    console.log(step)
    console.log(props)
    const num = Number(step);

    if (num && Number.isInteger(num) && (
      // validate the size of the number
      0 < num && num <= state.steps.length

      // fires when next button is clicked
    )) {
      return { activeStep: num - 1 };
    }
    // } else {
    //   // default to step 1
    //   this.updateURL()
    // }
  }

  updateDimensions = () => {
    this.setState(state => {
      if (window.innerWidth >= 960) {
        state.isDesktop = true;
      } else {
        state.isDesktop = false;
      }
      if (window.innerWidth >= 600) {
        state.isTablet = true;
      } else {
        state.isTablet = false;
      }

      return state;
    })
  };

  updateURL = step => {
    if (step || step === 0) step++;
    const url = `/business-builder/${step || this.state.activeStep + 1}`;
    this.props.history.push(url)
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Details
            { ...this.state }
            handleChange={this.handleChange}
            handleCheck={this.handleCheck}
            handleUpload={this.handleUpload}
            industrySelect={this.industrySelect}
            countrySelect={this.countrySelect}
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
            addTeamMember={this.addTeamMember}
          />
        );
      default:
        return null;
    }
  };

  isStepOptional = step => false;

  handleNext = () => {
    let { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    activeStep++
    this.updateURL(activeStep)
    this.setState({ activeStep, skipped })
  };

  handleBack = () => {
    let { activeStep } = this.state;
    activeStep--;
    this.updateURL(activeStep)
    this.setState({ activeStep })
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
      logo: this.state.logo,
      fundStage: this.state.fundStage,
      businessStage: this.state.businessStage,
      product: this.state.product,
      service: this.state.service,
      industries: this.state.industries,
      city: this.state.city,
      zip: this.state.zip,
      country: this.state.country.value,
      bio: this.state.bio,
      description: this.state.description,
      problem: this.state.problem,
      benefits: this.state.benefits,
      solution: this.state.solution,
      market1: this.state.market1,
      market2: this.state.market2,
      market3: this.state.market3,
      market4: this.state.market4,
      competitor1: this.state.competitor1,
      competitor2: this.state.competitor2,
      competitor3: this.state.competitor3,
      competitor4: this.state.competitor4,
      tested: this.state.tested,
      currency: this.state.currency,
      salesPlan: this.state.salesPlan,
      salesPlanLength: this.state.salesPlanLength,
      marketingPlan: this.state.marketingPlan,
      marketingPlanLength: this.state.marketingPlanLength,
      website: this.state.website,
      team: this.state.team,
      stream1: this.state.stream1,
      stream2: this.state.stream2,
      stream3: this.state.stream3,
      costOfStream1: this.state.costOfStream1,
      costOfStream2: this.state.costOfStream2,
      costOfStream3: this.state.costOfStream3,
      startOfStream1: this.state.startOfStream1,
      startOfStream2: this.state.startOfStream2,
      startOfStream3: this.state.startOfStream3,
      rent: this.state.rent,
      utilities: this.state.utilities,
      directCost: this.state.directCost,
      personnel: this.state.personnel,
      expenses: this.state.expenses,
      assets: this.state.assets,
      taxes: this.state.taxes,
      dividends: this.state.dividends,
      cashFlow: this.state.cashFlow,
      financials: this.state.financials,
      milestone1: this.state.milestone1,
      milestone2: this.state.milestone2,
      milestone3: this.state.milestone3,
      milestoneDate1: this.state.milestoneDate1,
      milestoneDate2: this.state.milestoneDate2,
      milestoneDate3: this.state.milestoneDate3,
    })
    .then(business => {
      this.props.history.push('/dashboard')
    })
    .catch(err => alert(err.message))
  };

  isStepSkipped = step => this.state.skipped.has(step);

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

  handleUpload = event => {
    const { name, files } = event.target;
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        logo: files[0],
        logoPreview: reader.result
      });
    }
    reader.readAsDataURL(files[0])
  };

  handleCheck = event => {
    // for when a checkbox is checked
    const { name, checked } = event.target;
    this.setState({ [name]: checked })
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    const { classes, user } = this.props;
    const { isDesktop, isTablet, steps, activeStep } = this.state;

    return (
      <div className={classes.root}>

        {/* Steppers */}
        { isTablet ? (
          <Stepper
            className={classes.stepper}
            activeStep={activeStep}
            alternativeLabel={!isDesktop}
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
        ) : (
          <MobileStepper
            steps={steps.length}
            position="static"
            component={Paper}
            activeStep={activeStep}
            className={classes.mobileStepper}
            nextButton={
              <Button
                className={classes.mobileNext}
                size="small"
                onClick={this.handleNext}
                disabled={activeStep === steps.length - 1}
              >
                Next <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                className={classes.mobileBack}
                size="small"
                onClick={this.handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft /> Back
              </Button>
            }
          />
        )}
        {/* End steppers */}

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
            <Grid item xs={12} sm={12} md={10} lg={7} xl={6}>
              <Paper className={classes.paper}>

                {/* Next/back buttons */}
                { isTablet && (
                  <Grid container justify="flex-end">
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
                )}
                {/* End next/back buttons */}

                <Typography variant="display1" align="center" color="primary">
                  {steps[activeStep]}
                </Typography>

                <Spacer half={true} />

                {/* each step gets rendered here */}
                { this.getStepContent(activeStep) }
                <Spacer />

                {/* Next/back buttons */}
                <Grid container justify="flex-end">
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
                {/* End next/back buttons */}

              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(BusinessBuilder);
