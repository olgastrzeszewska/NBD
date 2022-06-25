printjson(
  db.people
    .aggregate([
      {
        $match: { sex: "Female", nationality: "Poland" },
      },
      {
        $unwind: "$credit",
      },
      {
        $group: {
          _id: "$credit.currency",
          SUMA: { $sum: { $toDouble: "$credit.balance" } },
          SREDNIA: { $avg: { $toDouble: "$credit.balance" } },
        },
      },
      {
        $project: {
          _id: 0,
          waluta: "$_id",
          SREDNIA: 1,
          SUMA: 1,
        },
      },
    ])
    .toArray()
);