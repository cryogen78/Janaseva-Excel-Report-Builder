function applyFilters(rows, filters = []) {

  if (!filters.length) {
    return rows;
  }

  return rows.filter((row) => {

    return filters.every((filter) => {

      const value =
        row[filter.columnIndex];

      switch (filter.operator) {

        case "equals":
          return String(value) === String(filter.value);

        case "notEquals":
          return String(value) !== String(filter.value);

        case "contains":
          return String(value)
            .toLowerCase()
            .includes(
              String(filter.value).toLowerCase()
            );

        case "startsWith":
          return String(value)
            .toLowerCase()
            .startsWith(
              String(filter.value).toLowerCase()
            );

        case "endsWith":
          return String(value)
            .toLowerCase()
            .endsWith(
              String(filter.value).toLowerCase()
            );

        case "greaterThan":
          return Number(value) >
            Number(filter.value);

        case "lessThan":
          return Number(value) <
            Number(filter.value);

        case "between":
          return (
            Number(value) >= Number(filter.min)
            &&
            Number(value) <= Number(filter.max)
          );

        default:
          return true;
      }

    });

  });

}

module.exports =
  applyFilters;