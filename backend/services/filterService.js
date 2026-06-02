function applyFilters(
  rows,
  filters
) {

  if (
    !filters ||
    !filters.length
  ) {

    return rows;

  }

  return rows.filter(row => {

    return filters.every(filter => {

      const value =
        row[filter.column];

      switch (
        filter.operator
      ) {

        case "equals":

          return (
            String(value) ===
            String(filter.value)
          );

        case "contains":

          return String(value)
            .toLowerCase()
            .includes(
              String(filter.value)
                .toLowerCase()
            );

        case "greaterThan":

          return (
            Number(value) >
            Number(filter.value)
          );

        case "lessThan":

          return (
            Number(value) <
            Number(filter.value)
          );

        case "between":

          return (
            Number(value) >=
              Number(filter.min) &&
            Number(value) <=
              Number(filter.max)
          );

        default:

          return true;

      }

    });

  });

}

module.exports = {
  applyFilters
};