var pigeon = require('pigeon');
var _ = require('underscore');
var xml2js = require('xml2js');
var Q = require('q');

var apiDomain = 'www.everytrail.com';
var protocol = 'https';

var INVALID_KEY_ERROR = 'INVALID API KEY';
var INVALID_SECRET_ERROR = 'INVALID API SECRET';
var INVALID_REQUEST_ERROR = 'INVALID API REQUEST';

//key b4698addce8098c96300da620996c899
//secret 03ff2a1c38a05a65

function buildUrl (path) {
	if (typeof this._key !== 'string') {
		throw new Error(INVALID_KEY_ERROR);
	}

	if (typeof this._secret !== 'string') {
		throw new Error(INVALID_SECRET_ERROR);
	}

	return protocol + '://' + this._key + ':' + this._secret + '@' + apiDomain + path;
}

function parseResponse (response) {
	var defer = Q.defer();

	xml2js.parseString(response, function (err, result) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(result);
		}
	});

	return defer.promise;
}

var everytrail = {

	init: function (key, secret) {
		this._key = key;
		this._secret = secret;
	},

	get: function (path, params) {
		return pigeon.get(buildUrl.call(this, path), params)
			.then(parseResponse);
	},

	getUserTrips: function () {
		everytrail.init('b4698addce8098c96300da620996c899', '03ff2a1c38a05a65');
		var User = require('./User');
		var user = new User('2185111');
		return user.getTrips();
	}

};

module.exports = everytrail;