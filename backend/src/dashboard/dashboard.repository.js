import Registration from "../models/Registration.js";

class DashboardRepository {
  async getDashboardStatistics() {
    const [result] = await Registration.aggregate([
      {
        $match: {
          isArchived: false,
        },
      },
      {
        $facet: {
          overview: [
            {
              $group: {
                _id: null,

                totalRegistrations: {
                  $sum: 1,
                },

                paymentPending: {
                  $sum: {
                    $cond: [
                      {
                        $eq: [
                          "$status",
                          "PAYMENT_PENDING",
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },

                approved: {
                  $sum: {
                    $cond: [
                      {
                        $eq: [
                          "$status",
                          "APPROVED",
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },

                rejected: {
                  $sum: {
                    $cond: [
                      {
                        $eq: [
                          "$status",
                          "REJECTED",
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },

                unlocked: {
                  $sum: {
                    $cond: ["$isUnlocked", 1, 0],
                  },
                },

                locked: {
                  $sum: {
                    $cond: ["$isUnlocked", 0, 1],
                  },
                },
              },
            },
          ],

          departments: [
            {
              $group: {
                _id: "$leader.department",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
          ],

          years: [
            {
              $group: {
                _id: "$leader.year",
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],

          dailyRegistrations: [
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt",
                  },
                },

                count: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                _id: 1,
              },
            },
          ],
        },
      },
    ]);

    return result;
  }
}

export default new DashboardRepository();