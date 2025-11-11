const { NotImplementedError } = require('../lib');

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  if (date instanceof Date && !isNaN(date.getTime())) throw new Error('Invalid date!');
  const season = date.getMonth();
  switch(season) {
    case 0:
    case 1:
    case 2:
      return 'Winter';
      break;
    case 3:
    case 4:
    case 5:
      return 'Spring';
      break;
    case 6:
    case 7:
    case 8:
      return 'Summer';
      break;
    case 9:
    case 10:
    case 11:
      return 'Autumn';
      break;
    default:
      return 'Unable to determine the time of year!';
  }
}

module.exports = {
  getSeason
};
