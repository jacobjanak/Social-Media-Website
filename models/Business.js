const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  },
  bio: {
    type: String
  },
  logo: {
    type: String
  },
  fundStage: {
    type: String
  },
  businessStage: {
    type: String
  },
  product: {
    type: String
  },
  service: {
    type: String
  },
  industries: {
    type: String
  },
  city: {
    type: String
  },
  zip: {
    type: Number
  },
  country: {
    type: String
  },
  description: {
    type: String
  },
  problem: {
    type: String
  },
  solution: {
    type: String
  },
  benefits: {
    type: String
  },
  market1: {
    type: String
  },
  market2: {
    type: String
  },
  market3: {
    type: String
  },
  market4: {
    type: String
  },
  competitor1: {
    type: String
  },
  competitor2: {
    type: String
  },
  competitor3: {
    type: String
  },
  competitor4: {
    type: String
  },
  tested: {
    type: String
  },
  currency: {
    type: String
  },
  salesPlan: {
    type: String
  },
  salesPlanLength: {
    type: Number
  },
  marketingPlan: {
    type: String
  },
  marketingPlanLength: {
    type: Number
  },
  website: {
    type: String
  },
  // team: {
  //   type: String
  // },
  stream1: {
    type: String
  },
  stream2: {
    type: String
  },
  stream3: {
    type: String
  },
  costOfStream1: {
    type: Number
  },
  costOfStream2: {
    type: Number
  },
  costOfStream3: {
    type: Number
  },
  startOfStream1: {
    // should be date
    type: String
  },
  startOfStream2: {
    // should be date
    type: String
  },
  startOfStream3: {
    // should be date
    type: String
  },
  rent: {
    type: Number
  },
  utilities: {
    type: Number
  },
  directCost: {
    type: Number
  },
  personnel: {
    type: Number
  },
  expenses: {
    type: Number
  },
  assets: {
    type: Number
  },
  taxes: {
    type: Number
  },
  dividends: {
    type: Number
  },
  cashFlow: {
    type: Number
  },
  financials: {
    type: Number
  },
  milestone1: {
    type: String
  },
  milestone2: {
    type: String
  },
  milestone3: {
    type: String
  },
  milestoneDate1: {
    // should be date
    type: String
  },
  milestoneDate2: {
    // should be date
    type: String
  },
  milestoneDate3: {
    // should be date
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Business', BusinessSchema);
