export const buildPagination = (
  page = 1,

  limit = 10,
) => {
  const skip = (page - 1) * limit;

  return {
    page,

    limit,

    skip,
  };
};
