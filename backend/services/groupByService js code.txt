const {
  aggregateData
} = require(
  "./aggregationService"
);

function groupData(
  rows,
  groupColumn,
  operation,
  targetColumn
) {

  const groups = {};

  rows.forEach(row => {

    const key =
      row[groupColumn];

    if (!groups[key]) {

      groups[key] = [];

    }

    groups[key].push(row);

  });

  const result = [];

  Object.keys(groups)
    .forEach(key => {

      result.push({

        [groupColumn]:
          key,

        value:
          aggregateData(
            groups[key],
            operation,
            targetColumn
          )

      });

    });

  return result;

}

module.exports = {
  groupData
};