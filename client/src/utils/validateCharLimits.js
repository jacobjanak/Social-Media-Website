import userCharLimits from '../data/userCharLimits.json';

const validateCharLimits = {
  user: (obj, useMin = false) => {
    let key;

    for (key in obj) {
      const limit = userCharLimits[key];

      if (limit) {
        const val = obj[key];

        if (useMin) {
          if (limit.min && val.length < limit.min) {
            return false;
          }
        }

        if (limit.max && val.length > limit.max) {
          return false;
        }
      }
    }

    return true;
  }
}

export default validateCharLimits;
