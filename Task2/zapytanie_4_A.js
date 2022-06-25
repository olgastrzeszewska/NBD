printjson(
  db.people
    .aggregate([
      {
        $group: {
          _id: "$nationality",
          "Minimalne BMI": {
            $min: {
              $divide: [
                { $toDouble: "$weight" },
                { $pow: [{ $divide: [{ $toDouble: "$height" }, 100] }, 2] },
              ],
            },
          },
          "Maxymalne BMI": {
            $max: {
              $divide: [
                { $toDouble: "$weight" },
                { $pow: [{ $divide: [{ $toDouble: "$height" }, 100] }, 2] },
              ],
            },
          },
          "Srednie BMI": {
            $avg: {
              $divide: [
                { $toDouble: "$weight" },
                { $pow: [{ $divide: [{ $toDouble: "$height" }, 100] }, 2] },
              ],
            },
          },
        },
      },
    ])
    .toArray()
);
