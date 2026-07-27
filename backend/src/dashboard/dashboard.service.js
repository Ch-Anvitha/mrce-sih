import DashboardRepository from "./dashboard.repository.js";

class DashboardService {
  async getStatistics() {
    const result =
      await DashboardRepository.getDashboardStatistics();

    return {
      overview: result.overview[0] ?? {
        totalRegistrations: 0,
        paymentPending: 0,
        approved: 0,
        rejected: 0,
        unlocked: 0,
        locked: 0,
      },

      departments:
        result.departments.map((item) => ({
          department: item._id,
          count: item.count,
        })),

      years:
        result.years.map((item) => ({
          year: item._id,
          count: item.count,
        })),

      dailyRegistrations:
        result.dailyRegistrations.map((item) => ({
          date: item._id,
          count: item.count,
        })),
    };
  }
}

export default new DashboardService();