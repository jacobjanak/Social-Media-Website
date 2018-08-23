const router = require('express').Router()
const exjwt = require('express-jwt');
const db = require('../models');
const upload = require('../utils/upload');

const isAuthenticated = exjwt({ secret: 'swag' });

router.post('/create', isAuthenticated, upload.single('logo'), (req, res) => {
  if (req.file) {
    req.body.logo = req.file.filename;
  }

  db.Business.create({
    owner: req.body.owner,
    name: req.body.name,
    logo: req.body.logo,
    fundStage: req.body.fundStage,
    businessStage: req.body.businessStage,
    product: req.body.product,
    service: req.body.service,
    industries: req.body.industries,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country.value,
    bio: req.body.bio,
    description: req.body.description,
    problem: req.body.problem,
    benefits: req.body.benefits,
    solution: req.body.solution,
    market1: req.body.market1,
    market2: req.body.market2,
    market3: req.body.market3,
    market4: req.body.market4,
    competitor1: req.body.competitor1,
    competitor2: req.body.competitor2,
    competitor3: req.body.competitor3,
    competitor4: req.body.competitor4,
    tested: req.body.tested,
    currency: req.body.currency,
    salesPlan: req.body.salesPlan,
    salesPlanLength: req.body.salesPlanLength,
    marketingPlan: req.body.marketingPlan,
    marketingPlanLength: req.body.marketingPlanLength,
    website: req.body.website,
    team: req.body.team || [],
    stream1: req.body.stream1,
    stream2: req.body.stream2,
    stream3: req.body.stream3,
    costOfStream1: req.body.costOfStream1,
    costOfStream2: req.body.costOfStream2,
    costOfStream3: req.body.costOfStream3,
    startOfStream1: req.body.startOfStream1,
    startOfStream2: req.body.startOfStream2,
    startOfStream3: req.body.startOfStream3,
    rent: req.body.rent,
    utilities: req.body.utilities,
    directCost: req.body.directCost,
    personnel: req.body.personnel,
    expenses: req.body.expenses,
    assets: req.body.assets,
    taxes: req.body.taxes,
    dividends: req.body.dividends,
    cashFlow: req.body.cashFlow,
    financials: req.body.financials,
    milestone1: req.body.milestone1,
    milestone2: req.body.milestone2,
    milestone3: req.body.milestone3,
    milestoneDate1: req.body.milestoneDate1,
    milestoneDate2: req.body.milestoneDate2,
    milestoneDate3: req.body.milestoneDate3,
  })
  .then(data => res.json(data))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
})

router.post('/api/user/businesses', (req, res) => {
  db.Business.find({ owner: req.body.userID })
  .then(businesses => res.json(businesses))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
})

module.exports = router;
