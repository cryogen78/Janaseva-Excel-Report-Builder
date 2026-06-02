function generatePivot(
  rows,
  groupColumn,
  valueColumn
) {

  const result = {};

  rows.forEach((row) => {

    const group =
      row[groupColumn];

    const value =
      Number(row[valueColumn]) || 0;

    if (!result[group]) {
      result[group] = 0;
    }

    result[group] += value;

  });

  return Object.keys(result)
    .map((key) => ({
      category: key,
      total: result[key]
    }));

}

module.exports =
  generatePivot;