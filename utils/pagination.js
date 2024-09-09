export const pagination = (data, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {
    totalItems: data.length,
    totalPages: Math.ceil(data.length / limit),
    currentPage: page,
    limit,
    data: data.slice(startIndex, endIndex),
  };

  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }
  return results;
};
