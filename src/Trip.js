var Backbone = require('backbone');
var curryFetch = require('./util/curryFetch.js');


var Trip = Backbone.Model.extend({

	initialize: function () {
		this.fetch = curryFetch({trip_id:this.id}, this.fetch, this);
	},

	idAttribute:'trip_id',

	url:function () {
		return '/api/trip';
	},

	parse: function (response) {
		if (response.etTripResponse) { // We have an xml response from the server
			var tripAttributes = response.etTripResponse.trip[0];
			return Trip.parseResponseNode(tripAttributes);
		}

		return response; // We have a json object
	}

});

Trip.parseResponseNode = function (attributes) {
	var tripAttribute = {
		id:attributes['$'].id
	};

	for(var prop in attributes) {
		if (attributes.hasOwnProperty(prop) && prop !== '$') {
			tripAttribute[prop] = attributes[prop][0];
		}
	}

	var len = tripAttribute.length;
	if (len && len['_']) {
		tripAttribute.length = len['_'];
	}
	

	var loc = tripAttribute.location;
	if (loc && loc['$']) {
		tripAttribute.location = {
			name:loc['_'],
			latitude:loc['$'].lat,
			longitude:loc['$'].lon
		}
	}

	return tripAttribute;

};

module.exports = Trip;