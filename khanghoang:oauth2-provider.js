Token = new Mongo.Collection('tokens')

KHOAuth2Provider = function(options) {
  options = options || {}
}

// if(Meteor.isServer) {
  KHOAuth2Provider.prototype =  {
    exchange: function(username) {

      // crypto encryte
      var secondsInDay = 3600 * 24
      debugger

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

      return token
    }
  }
// }

