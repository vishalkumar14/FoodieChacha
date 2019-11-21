const planModel = require("../model/planModel");

module.exports.addqueryParams = async (req, res, next) => {
  req.query.sort = "-averagerating";
  req.query.limit = "5";
  req.query.price = { gt: "300" };
  req.query.select = "name%price%averagerating";
  next();
};

module.exports.getAllPlans = async (req, res, next) => {
  try {
    let wholeQuery = { ...req.query };

    // localhost:3000/api/plan?duration[gt]=7&sort=averagerating&select=name%duration&page=2&limit=4

    //http://localhost:3000/api/plan?price[gt]=200&averagerating[gte]=2&sort=averagerating&select=name%price%averagerating&skip=5

    let excludeQuery = ["select", "sort", "limit", "page"];
    for (let i = 0; i < excludeQuery.length; ++i) {
      delete wholeQuery[excludeQuery[i]];
    }

    let stringQuery = JSON.stringify(wholeQuery);
    stringQuery = stringQuery.replace(/gt|lt|lte|gte/g, function(match) {
      return "$" + match;
    });

    let Query = JSON.parse(stringQuery);

    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 4);
    const tpSkip = limit * (page - 1);

    let allPlan = planModel
      .find(Query)
      .skip(tpSkip)
      .limit(limit);

    if (req.query.sort) {
      allPlan = allPlan.sort(req.query.sort);
    }

    if (req.query.select) {
      let selectingCriteria = req.query.select.split("%").join(" ");
      allPlan = allPlan.select(selectingCriteria);
    }

    let FinalResult = await allPlan;

    console.log(allPlan);

    res.status(200).json({
      success: "All Plan Send",
      data: FinalResult
    });
  } catch (err) {
    res.status(401).json({
      success: "No Plan Send",
      data: err
    });
  }
};

module.exports.getPlan = async (req, res, next) => {
  try {
    const plan = await planModel.findById(req.params["id"]);
    res.status(200).json({
      success: "Get Plan",
      plan
    });
  } catch (err) {
    res.status(401).json({
      success: "Plan Could not be get",
      data: err
    });
  }
};

module.exports.createPlan = async (req, res, next) => {
  try {
    console.log(req.body);
    const plan = await planModel.create(req.body);
    return res.status(200).json({
      success: "A Plan is Created"
    });
  } catch (err) {
    return res.status(401).json({
      failure: "Plan Could not be Created"
    });
  }
};

module.exports.updatePlan = async (req, res, next) => {
  try {
    const id = req.params["_id"] || req.body["_id"];
    await planModel.findOneAndUpdate({ _id: { $eq: id } }, req.body, { new: true, upsert: false });
    return res.status(201).json({
      success: "A Plan is Updated or Created"
    });
  } catch (err) {
    return res.status(403).json({
      failure: "Error, ID is Invaild"
    });
  }
};

module.exports.deletePlan = async (req, res, next) => {
  try {
    await planModel.findOneAndDelete({ _id: { $eq: req.params["id"] } }, function(err, doc) {
      return res.status(201).json({
        success: "A Plan is Removed"
      });
    });
  } catch (err) {
    return res.status(403).json({
      failure: "Error, ID is Invaild"
    });
  }
};
