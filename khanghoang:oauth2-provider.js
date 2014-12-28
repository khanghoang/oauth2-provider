Token = new Mongo.Collection('tokens')

KHOAuth2Provider = function(options) {
  options = options || {}
}

KHOAuth2Provider.prototype =  {
  exchange: function(username, password) {

    // verify user
    var user = this.verify(username, password)
    if(!user) throw new Error('There is no username/password')

    // crypto encryte
    var secondsInDay = 3600 * 24

    // we also need session id
    var sessionID = Meteor.uuid()

    var timeNow = Math.floor(Date.now()/1000)
    var expire = timeNow + secondsInDay

    // random
    var random = Math.floor(Math.random() * 99999)

    // data string
    var dataString = "session_id" + sessionID + "&create_time=" + timeNow + '&expire_time=' + expire

    var hmac = Npm.require('crypto-js').HmacSHA1(dataString, 'username')

    // return Npm.require('crypto-js').HmacSHA1('username', 'password')
    var token = hmac.toString()
    console.log(token)

    return this.insertToken(token, user)
  },

  /*
   * Return user if success
   * undefined if fail
   */
  verify: function(username, password) {

    if(!username || !password) return false

    // treat the same with empty string
    if(username === '' || password === '') return false

    // encrypt the password
    var digest = Package.sha.SHA256(password)

    var hashedPassword = {
      digest: digest,
      algorithm: 'sha-256'
    }
    
    // get user
    var user = Meteor.users.findOne({'emails.address': username})

    // if there is no user, then return false
    if (!user) return undefined

    // compare
    var result = Accounts._checkPassword(user, hashedPassword)

    if(result) 
      return user

    return undefined
  },

  /*
   * Return token if success
   * otherwise return witt mongo error
   */

  insertToken: function(token, user) {
    // remove all tokens of that user
    Token.remove({'user._id': user._id})

    // insert a new one
    var tokenId = Token.insert({token: token, user: user})

    var token = Token.findOne(tokenId)
    return token.token
  }
}

