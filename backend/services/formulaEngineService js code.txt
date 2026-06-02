function executeFormula(
  formula,
  row,
  headers
) {

  let expression =
    formula;

  headers.forEach(
    (header, index) => {

      expression =
        expression.replaceAll(
          `{${header}}`,
          row[index]
        );

    }
  );

  try {

    return eval(expression);

  } catch {

    return 0;

  }

}

module.exports =
  executeFormula;