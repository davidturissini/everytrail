var tripTranslator = require('./trip');
var _ = require('underscore');

exports.toJSON = function (xml) {
	var tripAttributes = xml.etUserTripsResponse.trips[0].trip;

	return _.map(tripAttributes, function (attributes) {

		return tripTranslator.toJSON({
			etTripResponse:{
				trip:[attributes]
			}
		});

	});

}