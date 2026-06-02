function aggregateData(
  rows,
  operation,
  column
) {

  const values = rows
    .map(row => Number(row[column]))
    .filter(value => !isNaN(value));

  if (!values.length) {
    return 0;
  }

  switch (operation) {

    case "SUM":

      return values.reduce(
        (a, b) => a + b,
        0
      );

    case "AVG":

      return (
        values.reduce(
          (a, b) => a + b,
          0
        ) / values.length
      );

    case "COUNT":

      return values.length;

    case "MIN":

      return Math.min(...values);

    case "MAX":

      return Math.max(...values);

    case "MEDIAN":

      values.sort((a, b) => a - b);

      const middle =
        Math.floor(values.length / 2);

      return values.length % 2
        ? values[middle]
        : (
            values[middle - 1] +
            values[middle]
          ) / 2;

    case "STDDEV":

      const avg =
        values.reduce(
          (a, b) => a + b,
          0
        ) / values.length;

      const variance =
        values.reduce(
          (sum, value) =>
            sum +
            Math.pow(
              value - avg,
              2
            ),
          0
        ) / values.length;

      return Math.sqrt(
        variance
      );

    default:

      return 0;

  }

}

module.exports = {
  aggregateData
};