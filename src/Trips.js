var Backbone = require('backbone');
var Trip = require('./Trip.js');
var _ = require('underscore');
var everytrail = require('./everytrail.js');

var Trips = Backbone.Collection.extend({

	model:Trip,

	initialize: function (options) {
		this.user_id = options.user_id;
	},

	parse: function (response) {
		var tripAttributes = response.etUserTripsResponse.trips[0].trip;
		return _.map(tripAttributes, function (attributes) {
			return {
				etTripResponse:{
					trip:[attributes]
				}
			}
		});
	}

});


module.exports = Trips;