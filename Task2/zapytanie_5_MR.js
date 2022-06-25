printjson(
  db.people.mapReduce(
    function () {
      this.credit.forEach((c) =>
        emit(c.currency, { balance: parseFloat(c.balance), sum: 0, avg: 0 })
      );
    },
    function (keys, values) {
      let balances = values.map((v) => v.balance);

      return {
        sum: balances.reduce((a, b) => a + b),
        avg: balances.reduce((a, b) => a + b) / balances.length,
        balance: 0,
      };
    },
    {
      out: { inline: 1 },
      query: { sex: "Female", nationality: "Poland" },
      finalize: function (x, y) {
        return {
          WALUTA: x,
          SUMA: y.sum,
          SREDNIA: y.avg,
        };
      },
    }
  )
);