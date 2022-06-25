printjson(
  db.people
    .aggregate([
      {
        $unwind: "$credit",
      },
      {
        $group: {
          _id: "$credit.currency",
          SUMA: { $sum: { $toDouble: "$credit.balance" } },
        },
      },
      {
        $project: {
          _id: 0,
          waluta: "$_id",
          SUMA: 1,
        },
      },
    ])
    .toArray()
);