var _ = require('underscore');

module.exports = function (curriedData, oldFetch, context) {

	return function (options) {
		options = options || {};
		options.data = options.data || {};
		options.data = _.extend(options.data, curriedData || {});
		return oldFetch.call(context, options);
	};

};