var everytrail = require('./../everytrail');
var Backbone = require('backbone');
var Trip = require('./Trip.js');

var User = function (user_id) {
	this.user_id = user_id;
};

User.prototype = {

	login:function (username, password) {
		return everytrail.get('/api/user/login', {
				username:username,
				password:password
			})
			
			.then(function (response) {
				return {
					userID:this.user_id
				};

			}.bind(this));
	},

	getTrips: function () {
		var collection = new Backbone.Collection();
		return everytrail.get('/api/user/trips', {
				user_id:this.user_id
			})
			.then(function (response) {

				var tripAttributes = response.etUserTripsResponse.trips[0].trip;

				tripAttributes.forEach(function (attributes) {
					var trip;
					var tripAttribute = {
						id:attributes['$'].id
					};

					for(var prop in attributes) {
						if (attributes.hasOwnProperty(prop) && prop !== '$') {
							tripAttribute[prop] = attributes[prop][0];
						}
					}

					var len = tripAttribute.length;

					

					var loc = tripAttribute.location;
					if (loc && loc['$']) {
						tripAttribute.location = {
							name:loc['_'],
							latitude:loc['$'].lat,
							longitude:loc['$'].lon
						}
					}
					
					tripAttribute.user = this;


					trip = new Trip(tripAttribute);
					collection.add(trip);

				}.bind(this));
				

				return collection;

			}.bind(this));
	}

};


module.exports = User;