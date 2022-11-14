const { host } = require("../config.env");

const whitelist = [host, "http://example.com.testing"];
const corsOptions = {
  origin: function (origin, callback) {
    //first if condition allows postman and browser to make api calls
    if (!origin) {
      //for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback("Error request not Allowed!"); //message in browser when someone is trying to access api without permission
    }
  },
};

module.exports = corsOptions;
