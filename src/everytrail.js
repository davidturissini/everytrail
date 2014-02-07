var pigeon = require('pigeon');
var _ = require('underscore');
var xml2js = require('xml2js');
var Q = require('q');
var Backbone = require('backbone');
var User = require('./User');
var Trip = require('./Trip');
var Trips = requore('./Trips');

Backbone.ajax = function (params) {
	return everytrail.get(params.url, params.data || {})
		.then(function (e) {
			if (params.success && typeof params.success === 'function') {
				params.success(e);
			}
		});
}

var Trip = require('./Trip.js');


var apiConfig = {
	domain:'www.everytrail.com',
	protocol:'https'
};

var INVALID_KEY_ERROR = 'INVALID API KEY';
var INVALID_SECRET_ERROR = 'INVALID API SECRET';
var INVALID_REQUEST_ERROR = 'INVALID API REQUEST';

//key b4698addce8098c96300da620996c899
//secret 03ff2a1c38a05a65

function buildUrl (path) {
	if (typeof apiConfig.key !== 'string') {
		throw new Error(INVALID_KEY_ERROR);
	}

	if (typeof apiConfig.secret !== 'string') {
		throw new Error(INVALID_SECRET_ERROR);
	}

	return apiConfig.protocol + '://' + apiConfig.key + ':' + apiConfig.secret + '@' + apiConfig.domain + path;
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

	configure: function (options) {
		apiConfig = _.extend(apiConfig, options);
	},

	get: function (path, params) {
		return pigeon.get(buildUrl.call(this, path), params).then(parseResponse);
	},

	User:User,
	Trip:Trip,
	Trips:Trips

};

module.exports = everytrail;