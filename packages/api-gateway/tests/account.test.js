
const tap = require('tap')
const { Id } = require('../id')
const validator = require('validator')
const { buildAccount } = require('../accounts/account')


let makeAccount = buildAccount({
  Id,
  validator,
  makeHash: (passCode) => passCode
})


tap.test('account entity', (t) => {
  t.test('should create an account correctly', assert => {
    const data = {
      name: 'test',
      email: 'john@doe.com',
      phone: '9284811111',
      password: 'ssh!!!'
    }
    const account = makeAccount(data)
    assert.equal(account.getName(), data.name)
    assert.ok(account.getId())
    assert.equal(account.getEmail(), data.email)
    assert.equal(account.getPhone(), data.phone)
    assert.equal(account.isEmailVerified(), false)
    assert.equal(account.isPhoneVerified(), false)
    assert.ok(account.getCreateDate())
    assert.ok(account.getModifiedDate())
    assert.end()
  })

  t.test('should mark account email and phone as verified', assert => {
    const data = {
      name: 'test',
      email: 'john@doe.com',
      phone: '9284811111',
      password: 'ssh!!!'
    }
    const account = makeAccount(data)
    assert.notOk(account.isEmailVerified())
    assert.notOk(account.isPhoneVerified())
    account.markEmailVerified()
    account.markPhoneVerified()
    assert.equal(account.isEmailVerified(), true)
    assert.equal(account.isPhoneVerified(), true)
    assert.end()
  })

  t.end();
})