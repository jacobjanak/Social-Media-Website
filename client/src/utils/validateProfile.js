import genders from '../data/genders.json';
import educations from '../data/educations.json';
import ethnicities from '../data/ethnicities.json';

import countries from '../data/countries.json';
import states from '../data/states.json';
import incomes from '../data/incomes.json';
import maritalStatuses from '../data/maritalStatuses.json';
import children from '../data/children.json';

const validateProfile = (user, returnBool = true) => {
  const errors = [];

  if (!user.firstName
    || user.firstName.length < 0
    || user.firstName.length > 20) {
    errors.push("First name is not between 1 and 20 characters.")
  }

  if (!user.lastName
    || user.lastName.length < 0
    || user.lastName.length > 40) {
    errors.push("Last name is not between 1 and 40 characters.")
  }

  if (!user.gender
    || !genders.includes(user.gender)) {
    errors.push("Invalid gender")
  }

  if (!user.birthday) {
    errors.push("Birthday is required")
  }

  if (!user.education
    || !educations.includes(user.education)) {
    errors.push("Invalid education")
  }

  if (!user.ethnicity
    || !ethnicities.includes(user.ethnicity)) {
    errors.push("Invalid race/ethnicity")
  }

  if (!user.country
    || !countries.includes(user.country)) {
    errors.push("Invalid country")
  }

  if (!user.state
    || !states.includes(user.state)) {
    errors.push("Invalid state")
  }

  if (!user.income
    || !incomes.includes(user.income)) {
    errors.push("Invalid income level")
  }

  if (!user.maritalStatus
    || !maritalStatuses.includes(user.maritalStatus)) {
    errors.push("Invalid marital status")
  }

  if (!user.children
    || !children.includes(user.children)) {
    errors.push("Invalid children selections")
  }

  // if (!Number(user.zip) || user.zip.indexOf('e') >= 0) {
  //   errors.push("Zip code must only contain numbers")
  // }
  // if (user.zip.length !== 5) {
  //   errors.push("Zip code must be exactly 5 numbers")
  // }

  if (errors.length > 0) return false;
  else return true;
};

export default validateProfile;