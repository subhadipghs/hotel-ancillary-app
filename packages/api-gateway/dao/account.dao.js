/**
* Abstract data access object for persisting account details
*/

function buildAccountDao({ daoImplementation } = {}) {
  return Object.freeze({
    /**
    * Insert an account details into the database
    *
    * @param {object} account - account details to persist
    */
    insert: async (account) => daoImplementation.insert(account),
    /**
    * Find an account by email
    * @param {string} email - email id
    */
    findByEmailId: async (email) => daoImplementation.findByEmailId(email)
  })
}

module.exports = Object.freeze({
  buildAccountDao
})
