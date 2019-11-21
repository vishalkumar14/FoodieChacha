var stripe = Stripe("pk_test_jJZOIwA9fdlQImG7DKVqnCvX00LsndzLFW");

const login = document.querySelector(".login-form");
const signup = document.querySelector(".signup-form");
const forget = document.querySelector(".forget-form");
const reset = document.querySelector(".reset-form");
const addplan = document.querySelector(".addPlan-form");
const buybutton = document.querySelectorAll(".buy-btn");
const detailbtn = document.querySelectorAll(".btn-detail");
const address = document.querySelector(".updateAddress-form");
const updatePass = document.querySelector(".updatePass-form");
const deleteplan = document.querySelector(".deleteplan-btn");
const updateplan = document.querySelector(".updatePlan-form");

async function mylogin(uname, password) {
  const result = await axios.post("/api/user/login", {
    uname,
    password
  });
  if (result.data.success) {
    alert("User Logged in");
    location.assign("/userPage");
  } else {
    alert("Wrong Email or Password");
  }
}
async function mysignup(inputs) {
  const name = inputs[0].value;
  const email = inputs[1].value;
  const uname = inputs[2].value;
  const password = inputs[3].value;
  const confirmpassword = inputs[4].value;

  const result = await axios.post("/api/user/signup", {
    name,
    email,
    uname,
    password,
    confirmpassword
  });
  if (result.data.success) {
    alert("User SignUp Successfully");
    location.assign("/userPage");
  } else {
    alert("Please Correctly Fill All Fields");
  }
}
async function myaddress(userAddress, userid) {
  if (userAddress.length > 0) {
    const result = await axios.post(`/api/user/${userid}`, {
      _id: userid,
      address: userAddress
    });
    if (result.data.success) {
      alert("User Address Updated Successfully");
      location.assign("/userPage");
    } else {
      alert("Please Correctly Fill All Fields");
    }
  } else {
    location.assign("/userPage");
  }
}
async function myupdateplan(inputs, planid) {
  const result = await axios.post(`/api/plan/${planid}`, {
    _id: planid,
    name: inputs[0].value,
    planprice: inputs[1].value,
    price: inputs[2].value,
    access: inputs[3].value,
    packageType: inputs[4].value,
    mealFreq: inputs[5].value,
    OrderType: inputs[6].value,
    description: inputs[7].value
  });
  if (result.data.success) {
    alert(`${inputs[0].value} Updated Successfully`);
    location.assign(`/productPage/${planid}`);
  } else {
    alert("Please Correctly Fill All Fields");
  }
}
async function myforget(email) {
  const result = await axios.post("/api/user/forgetpassword", {
    email
  });
  if (result.data.success) {
    alert("Reset Password Link Send to the Email");
    location.assign("/");
  } else {
    alert("Email is Invaild");
  }
}
async function myreset(token, password, confirmpassword) {
  const result = await axios.post("/api/user/resetpassword", {
    token,
    password,
    confirmpassword
  });
  if (result.data.success) {
    alert("Password Reset Successfully");
    location.assign("/login");
  } else {
    alert(`${result.data.failure}`);
  }
}
async function myupdatepassword(oldpassword, newpassword, confirmpassword) {
  const result = await axios.post("/api/user/updatepassword", {
    oldpassword,
    newpassword,
    confirmpassword
  });
  if (result.data.success) {
    alert("Password Updated Successfully");
    location.assign("/userPage");
  } else {
    alert("Please Enter Correct Passwords");
  }
}
async function myplan(inputs) {
  const name = inputs[0].value;
  const planprice = inputs[1].value;
  const price = inputs[2].value;
  const access = inputs[3].value;
  const packageType = inputs[4].value;
  const mealFreq = inputs[5].value;
  const OrderType = inputs[6].value;
  const description = inputs[7].value;
  const result = await axios.post("/api/plan/", {
    name,
    planprice,
    price,
    packageType,
    mealFreq,
    OrderType,
    access,
    description
  });
  if (result.data.success) {
    alert("Plan Created Successfully");
    location.assign("/userPage");
  } else {
    alert("Please Enter All The Fields Correctly");
  }
}
async function myplandetails(plandata) {
  const result = await axios.post("/productPage/:id", {
    plandata
  });
  if(result.data.data === "User is Not Logged In"){
    location.assign("/login");
  }
}
async function bookings(planid, userid) {
  const result = await axios.post("/api/booking/checkout", { planid, userid });
  if (result.data.success) {
    const plandata = result.data.session.display_items[0];
    const addorderhistory = await axios.post("/api/booking/addorderhistory", {
      planid,
      userid,
      plandata
    });
    await stripe.redirectToCheckout({
      sessionId: result.data.session.id
    });
  } else {
    console.log("Payment Fail");
  }
}
async function mydeleteplan(planid) {
  const result = await axios.delete(`/api/plan/${planid}`);
  if (result.data.success) {
    alert("Plan Delete Successfully");
    location.assign("/allplans");
  } else {
    alert("Plan cannot be deleted");
  }
}

if (login) {
  login.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputs = document.getElementsByTagName("input");
    console.log(inputs);
    const uname = inputs[0].value;
    const password = inputs[1].value;
    mylogin(uname, password);
  });
}
if (signup) {
  signup.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputs = document.getElementsByTagName("input");
    mysignup(inputs);
  });
}
if (forget) {
  forget.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputs = document.getElementsByTagName("input");
    const email = inputs[0].value;
    myforget(email);
  });
}
if (reset) {
  reset.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputs = document.getElementsByTagName("input");
    const token = inputs[0].value;
    const password = inputs[1].value;
    const confirmpassword = inputs[2].value;
    myreset(token, password, confirmpassword);
  });
}
if (addplan) {
  addplan.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputs = addplan.getElementsByTagName("input");
    myplan(inputs);
  });
}
if (buybutton) {
  for (var i = 0; i < buybutton.length; i++) {
    buybutton[i].addEventListener("click", function(event) {
      bookings(event.target.getAttribute("plan-id"), event.target.getAttribute("user-id"));
    });
  }
}
// if (detailbtn) {
//   for (let i = 0; i < detailbtn.length; i++) {
//     detailbtn[i].addEventListener("click", function(event) {
//       const plandata = event.target.getAttribute("plandata");
//       myplandetails(plandata);
//     });
//   }
// }
if (address) {
  address.addEventListener("submit", function(event) {
    event.preventDefault();
    const userAddress = address.getElementsByTagName("textarea")[0].value;
    const userid = event.target.getAttribute("user-id");
    myaddress(userAddress, userid);
  });
}
if (updatePass) {
  updatePass.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputs = updatePass.getElementsByTagName("input");
    const oldpassword = inputs[0].value;
    const newpassword = inputs[1].value;
    const confirmpassword = inputs[2].value;
    myupdatepassword(oldpassword, newpassword, confirmpassword);
  });
}
if (deleteplan) {
  deleteplan.addEventListener("click", function(event) {
    event.preventDefault();
    const planid = event.target.getAttribute("plan-id");
    mydeleteplan(planid);
  });
}
if (updateplan) {
  updateplan.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputs = updateplan.getElementsByTagName("input");
    const planid = event.target.getAttribute("plan-id");
    myupdateplan(inputs, planid);
  });
}
