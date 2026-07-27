const parseMultipartJson = (req, res, next) => {
  try {
    if (typeof req.body.leader === "string") {
      req.body.leader = JSON.parse(req.body.leader);
    }

    if (typeof req.body.members === "string") {
      req.body.members = JSON.parse(req.body.members);
    }

    if (typeof req.body.payment === "string") {
      req.body.payment = JSON.parse(req.body.payment);
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in multipart form data.",
      data: null,
      meta: null,
    });
  }
};

export default parseMultipartJson;