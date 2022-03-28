
const tap = require('tap')
const { Id } = require('../id')
const validator = require('validator')
const { buildAccount, makeHash } = require('../accounts')


let makeAccount = buildAccount({
  Id,
  validator,
  makeHash: async (passCode) => Promise.resolve(passCode)
})


tap.test('account entity', (t) => {
  t.test('should create an account correctly', async (assert) => {
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
    const passCode = await account.getPassword()
    assert.ok(passCode)
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

  t.test('should hash the password', async assert => {
    let makeAccount = buildAccount({
      Id,
      validator,
      makeHash
    })
    const data = {
      name: 'test',
      email: 'john@doe.com',
      phone: '9284811111',
      password: 'ssh!!!'
    }
    const account = makeAccount(data)
    assert.notMatch(await account.getPassword(), data.password)
    assert.end()
  })

  t.end();
})
