printjson(
  db.people.mapReduce(
    function () {
      emit(
        this.nationality,
        parseFloat(this.weight) / Math.pow(parseFloat(this.height) / 100, 2)
      );
    },
    function (keys, values) {
      return values.reduce((a, b) => a + b) / values.length;
    },
    {
      out: { inline: 1 },
      finalize: function (k, rv) {
        return { avg: rv };
      },
    }
  )
);

printjson(
  db.people.mapReduce(
    function () {
      emit(
        this.nationality,
        parseFloat(this.weight) / Math.pow(parseFloat(this.height) / 100, 2)
      );
    },
    function (keys, values) {
      return Math.min(...values);
    },
    {
      out: { inline: 1 },
      finalize: function (k, rv) {
        return { min: rv };
      },
    }
  )
);

printjson(
  db.people.mapReduce(
    function () {
      emit(
        this.nationality,
        parseFloat(this.weight) / Math.pow(parseFloat(this.height) / 100, 2)
      );
    },
    function (keys, values) {
      return Math.max(...values);
    },
    {
      out: { inline: 1 },
      finalize: function (k, rv) {
        return { max: rv };
      },
    }
  )
);