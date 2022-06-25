printjson(
  db.people.mapReduce(
    function () {
      emit(this.sex, {
        weight: parseFloat(this.weight),
        height: parseFloat(this.height),
      });
    },
    function (keys, values) {
      let weights = values.map((v) => v.weight);
      let heights = values.map((v) => v.height);

      const avg = (arr) => arr.reduce((a, b) => a + b) / arr.length;

      return {
        weight: avg(weights),
        height: avg(heights),
      };
    },
    {
      out: { inline: 1 },
    }
  )
);
