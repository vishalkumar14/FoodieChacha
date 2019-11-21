const planModel = require("../model/planModel");
const userModel = require("../model/userModel");
const bookingModel = require("../model/bookingModel");
const stripe = require("stripe")("sk_test_khusjp7XosmhByy6DNXSPb2800mShedEug");

module.exports.checkout = async function(req, res) {
  try {
    const planid = req.body.planid;
    const plan = await planModel.findById(planid);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          name: plan.name,
          description: plan.packageType,
          amount: plan.planprice * 100,
          currency: "inr",
          quantity: 1
        }
      ],

      success_url: `${req.protocol}://${req.get("host")}/userPage`,
      cancel_url: `${req.protocol}://${req.get("host")}/`
    });
    return res.status(201).json({
      success: "Payement Object Send",
      session
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      failure: "Payement Fail"
    });
  }
};

module.exports.addorderhistory = async function(req, res) {
  try {
    const userid = req.body.userid;
    const plandata = req.body.plandata;
    const planid = req.body.planid;
    const user = await userModel.findById(userid);
    if (user.orderid === undefined) {
      const orderObj = {
        userid: userid,
        orders: [
          {
            name: plandata.custom.name,
            planprice: plandata.amount / 100,
            packageType: plandata.custom.description,
            planid: planid
          }
        ]
      };

      const neworder = await bookingModel.create(orderObj);
      user.orderid = neworder["_id"];
      await userModel.findOneAndUpdate({ _id: { $eq: userid } }, user, {
        new: true,
        upsert: false
      });
    } else {
      const userorders = await bookingModel.findById(user.orderid);
      userorders.orders.push({
        name: plandata.custom.name,
        planprice: plandata.amount / 100,
        packageType: plandata.custom.description,
        planid: planid
      });

      await bookingModel.findOneAndUpdate({ _id: { $eq: user.orderid } }, userorders, {
        new: true,
        upsert: false
      });
    }

    return res.status(201).json({
      success: "Order Added to History"
    });
  } catch (err) {
    return res.status(403).json({
      success: "Cannot Add Order to History"
    });
  }
};
