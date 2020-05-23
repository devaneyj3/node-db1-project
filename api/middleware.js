const helper = require('./helperFunctions');

const db = require("../data/dbConfig.js");


//custom middleware

// validates the user id on every request that expects a user id parameter

async function validateAccountId(req, res, next) {
// if the id parameter is valid, store that user object as req.user
  const id = helper.paramsId(req)
  const getAllAccounts = await db('accounts');
  const checkIdArray = helper.IDnotInDatabase(id, getAllAccounts);
  // if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" } 
  if(checkIdArray === 0 ) {
      res.status(400).json({message: "Invalid user ID"})
    } else {
      next()
    }

}

//  validates the body on a request to create a new user

function validateAccount(req, res, next) {
// if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
  if(Object.keys(req.body) < 2) {
    res.status(400).json({ message: 'missing account data'})
  }
    // if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }
   else if (req.body.name === ''  || req.body.account === '') {
    res.status(400).json({ message: "missing required name field or budget field"})
  } else {
    next()
  }
}
module.exports = {
    validateAccountId,
    validateAccount
}