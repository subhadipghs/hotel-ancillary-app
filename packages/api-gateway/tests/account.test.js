
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
      password: 'ssh!!!'
    }
    const account = makeAccount(data)
    assert.equal(account.getName(), data.name)
    assert.ok(account.getId())
    assert.equal(account.getEmail(), data.email)
    assert.equal(account.isEmailVerified(), false)
    const passCode = await account.getPassword()
    assert.ok(passCode)
    assert.ok(account.getCreateDate())
    assert.ok(account.getModifiedDate())
    assert.end()
  })

  t.test('should mark account email as verified', assert => {
    const data = {
      name: 'test',
      email: 'john@doe.com',
      password: 'ssh!!!'
    }
    const account = makeAccount(data)
    assert.notOk(account.isEmailVerified())
    account.markEmailVerified()
    assert.equal(account.isEmailVerified(), true)
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
      password: 'ssh!!!'
    }
    const account = makeAccount(data)
    assert.notMatch(await account.getPassword(), data.password)
    assert.end()
  })

  t.end();
})
