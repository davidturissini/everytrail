exports.toJSON = function (xml) {

	var attributes = xml.etTripResponse.trip[0];

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