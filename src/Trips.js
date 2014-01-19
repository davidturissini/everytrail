var Backbone = require('backbone');
var Trip = require('./Trip.js');
var _ = require('underscore');
var everytrail = require('./everytrail.js');

var Trips = Backbone.Collection.extend({

	model:Trip,

	parse: function (response) {
		if (response.etUserTripsResponse) { // We have an xml response from the server
			var tripAttributes = response.etUserTripsResponse.trips[0].trip;
			return _.map(tripAttributes, function (attributes) {
				return {
					etTripResponse:{
						trip:[attributes]
					}
				}
			});
		}

		return response; // We have a json object
	}

});


module.exports = Trips;