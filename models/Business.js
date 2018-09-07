const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('../utils/random');

const BusinessSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  url: {
    type: String,
    default: () => random.string(8),
  },
  name: {
    type: String
  },
  bio: {
    type: String
  },
  logo: {
    type: String,
    default: '/img/business/default.jpg'
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
  street: {
    type: String
  },
  city: {
    type: String
  },
  zip: {
    type: String
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
  markets: [{
    type: String
  }],
  competitors : [{
    type: String
  }],
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
  team: [{
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    title: {
      type: String
    },
    education: {
      type: String
    },
    bio: {
      type: String
    }
  }],
  streamsOfRevenue: [{
    type: String
  }],
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
  impact: {
    type: String
  },
  exitStrategy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Business', BusinessSchema);
