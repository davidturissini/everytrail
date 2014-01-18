var everytrail = require('./everytrail');
var Backbone = require('backbone');
var Trips = require('./Trips.js');
var curryFetch = require('./util/curryFetch.js');


var User = Backbone.Model.extend({


	idAttribute:'user_id',

	url:function () {
		return '/api/user';
	},

	initialize: function () {
		var trips = new Trips({
			user_id:this.id
		});

		trips.url = '/api/user/trips';
		trips.fetch = curryFetch({user_id:this.id}, trips.fetch, trips);

		this._trips = trips;

		this.fetch = curryFetch({user_id:this.id}, this.fetch, this);
	},

	trips: function () {
		return this._trips;
	},

	parse: function (response, options) {
		var responseData = response.etUserResponse.user[0];
		var userData = {};
		
		for(var prop in responseData) {
			if(responseData.hasOwnProperty(prop) && prop !== '$') {
				userData[prop] = responseData[prop][0];
			}
		}

		return userData;
	}
	

});

User.login = function (username, password) {
	return everytrail.get('/api/user/login', {
			username:username,
			password:password
		})
		
		.then(function (response) {
			return new User({
				user_id:response.etUserLoginResponse.userID[0]
			});

		}.bind(this));
}


module.exports = User;