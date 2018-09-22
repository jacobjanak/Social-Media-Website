const userCharLimits = {
  firstName: {
    label: "First name",
    max: 20,
    min: 1,
  },
  lastName: {
    label: "Last name",
    max: 40,
    min: 1,
  },
  bio: {
    label: "Headline",
    max: 120,
    min: 1,
  },
  summary: {
    label: "Summary",
    max: 1000,
  },
  city: {
    label: "City",
    max: 40,
  },
};

const getError = (val, limit, useMin) => {
  if (useMin) {
    if (limit.min && (!val || val.length < limit.min)) {
      return `${limit.label} must be at least ${limit.min} character(s).`;
    }
  }

  if (val) {
    if (limit.max && val.length > limit.max) {
      return `${limit.label} must not be longer than ${limit.max} characters.`;
    }
  }

  return false;
}

const validateCharLimits = {
  user: (user, useMin = false) => {
    const errors = [];

    // user obj can be 1 key to quickly validate as someone types letters
    if (Object.keys(user).length === 1) {
      for (let key in user) {
        const limit = userCharLimits[key];

        if (limit) {
          const val = user[key];

          if (val) {
            const err = getError(val, limit, useMin);
            if (err) errors.push(err);
          }
        }
      }
    } else {
      for (let key in userCharLimits) {
        const err = getError(user[key], userCharLimits[key], useMin);
        if (err) errors.push(err);
      }
    }

    return errors;
  }
}

export default validateCharLimits;
