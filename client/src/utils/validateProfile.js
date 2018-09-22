import validateCharLimits from './validateCharLimits';
import genders from '../data/genders.json';
import educations from '../data/educations.json';
import ethnicities from '../data/ethnicities.json';
import countries from '../data/countries.json';
import states from '../data/states.json';
import incomes from '../data/incomes.json';
import maritalStatuses from '../data/maritalStatuses.json';
import children from '../data/children.json';

const validateProfile = user => {
  const errors = validateCharLimits.user(user, true);

  if (user.firstName && user.firstName.length > 20) {
    errors.push("First name cannot be longer than 20 characters.")
  }

  if (user.lastName && user.lastName.length > 40) {
    errors.push("Last name cannot be longer than 40 characters.")
  }

  if (user.headline && user.headline.length > 40) {
    errors.push("Last name cannot be longer than 40 characters.")
  }

  // what happens if they move from america to a country without states?
  // if (user.state && !states.includes(user.state)) {
  //   errors.push("Invalid state")
  // }

  if (user.country && !countries.includes(user.country)) {
    errors.push("Invalid country: " + user.country)
  }

  if (user.gender && !genders.includes(user.gender)) {
    errors.push("Invalid gender: " + user.gender)
  }

  if (user.linkedin && !user.linkedin.includes('linkedin.com')) {
    errors.push("LinkedIn URL is invalid: " + user.linkedin)
  }
  if (user.twitter && !user.twitter.includes('twitter.com')) {
    errors.push("Twitter URL is invalid: " + user.twitter)
  }
  if (user.facebook && !user.facebook.includes('facebook.com')) {
    errors.push("Facebook URL is invalid: " + user.facebook)
  }
  if (user.instagram && !user.instagram.includes('instagram.com')) {
    errors.push("Instagram URL is invalid: " + user.instagram)
  }

  if (user.education && !educations.includes(user.education)) {
    errors.push("Invalid education: " + user.education)
  }

  if (user.ethnicity && !ethnicities.includes(user.ethnicity)) {
    errors.push("Invalid race/ethnicity: " + user.ethnicity)
  }

  if (user.income && !incomes.includes(user.income)) {
    errors.push("Invalid income: " + user.income)
  }

  if (user.maritalStatus && !maritalStatuses.includes(user.maritalStatus)) {
    errors.push("Invalid marital status: " + user.maritalStatus)
  }

  if (user.children && !children.includes(user.children)) {
    errors.push("Invalid children selection: " + user.children)
  }

  // if (!Number(user.zip) || user.zip.indexOf('e') >= 0) {
  //   errors.push("Zip code must only contain numbers")
  // }
  // if (user.zip.length !== 5) {
  //   errors.push("Zip code must be exactly 5 numbers")
  // }

  return errors;
};

export default validateProfile;
