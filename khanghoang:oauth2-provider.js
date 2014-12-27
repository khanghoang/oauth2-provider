Token = new Mongo.Collection('tokens')

if(Meteor.isServer) {
  Meteor.methods({
    exchange: function(username) {

      // cryto encryte


      // check if they are correct

      // return token
      // return Npm.require('crypto-js').HmacSHA1('username', 'password')
      var token = Npm.require('crypto-js').HmacSHA1('username', 'password')

      console.log(token.toString())

      return token.toString()
    }
  })
}

