const storeQuery = async (req, res) => {
  try {
    const { location, startDate, endDate, adults, children, budget } = req.body;
    const user = req.user;
    const query = {
      location,
      startDate,
      endDate,
      adults,
      children,
      budget,
    };
    user.queries.push(query);
    await user.save();
    res.status(201).json({
      message: "Query Stored",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  storeQuery,
};
