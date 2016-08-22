// Customer.js

function Customer(dataArray) {
	this.name = {"firstName": dataArray[0], "lastName": dataArray[1]};
	this.email = dataArray[2];
	this.telephone = dataArray[3];
	this.address = {"street": dataArray[4], "city": dataArray[5], "state": dataArray[6], "zip": dataArray[7]};
	this.id = dataArray[8];
}
