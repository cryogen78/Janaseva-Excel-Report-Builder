class BankingFormulaService {

  static totalDeposits(rows, column) {

    return rows.reduce(
      (sum, row) =>
        sum + Number(row[column] || 0),
      0
    );

  }

  static totalLoans(rows, column) {

    return rows.reduce(
      (sum, row) =>
        sum + Number(row[column] || 0),
      0
    );

  }

  static averageBalance(rows, column) {

    if (!rows.length) return 0;

    return (
      rows.reduce(
        (sum, row) =>
          sum + Number(row[column] || 0),
        0
      ) / rows.length
    );

  }

  static casaRatio(
    savingsDeposits,
    currentDeposits,
    totalDeposits
  ) {

    if (!totalDeposits) return 0;

    return (
      (
        (
          savingsDeposits +
          currentDeposits
        ) /
        totalDeposits
      ) * 100
    ).toFixed(2);

  }

  static ldr(
    totalLoans,
    totalDeposits
  ) {

    if (!totalDeposits) return 0;

    return (
      (
        totalLoans /
        totalDeposits
      ) * 100
    ).toFixed(2);

  }

  static npaPercentage(
    npaAmount,
    totalAdvances
  ) {

    if (!totalAdvances) return 0;

    return (
      (
        npaAmount /
        totalAdvances
      ) * 100
    ).toFixed(2);

  }

  static depositGrowth(
    current,
    previous
  ) {

    if (!previous) return 0;

    return (
      (
        (
          current -
          previous
        ) /
        previous
      ) * 100
    ).toFixed(2);

  }

}

module.exports =
  BankingFormulaService;