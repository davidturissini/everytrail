exports.toJSON = function (xml) {
	
	var responseData = xml.etUserResponse.user[0];
	var userData = {};
	
	for(var prop in responseData) {
		if(responseData.hasOwnProperty(prop) && prop !== '$') {
			userData[prop] = responseData[prop][0];
		}
	}

	return userData;

};