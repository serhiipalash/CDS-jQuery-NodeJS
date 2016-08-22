var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET customers listing. */
router.get('/', function(req, res, next) {
	fs.readFile('public/files/customers.json', {encoding: 'utf8'}, function (err, data) {
		if (err) {
			res.render('index', {title: 'Customer list is empty'});
		}
		else {
			var customerList = JSON.parse(data);
			res.render('customers', {title : 'Customers | Customer Data Service', customerList: customerList});
		}
	});
});

/* POST new customer. */
router.post('/', function(req, res, next) {
	fs.writeFile('public/files/'+req.body.id+'.json', req.body.newCustomer, 'utf-8', function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("Файл с описанием нового клиента сохранен.");
		}
	});

	fs.readFile('public/files/customers.json', {encoding: 'utf8'}, function (err, data) {
		var list = {};
		var customer = JSON.parse(req.body.newCustomer);

		if(err) {
			list[customer.id] = customer.name.firstName+' '+customer.name.lastName;
			fs.writeFile('public/files/customers.json', JSON.stringify(list,"",4), 'utf-8', function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log("Список клиентов сохранен в файл customers.json");
					res.send(true);
				}
			});
		} else {
			list = JSON.parse(data);
			list[customer.id] = customer.name.firstName+' '+customer.name.lastName;
			fs.writeFile('public/files/customers.json', JSON.stringify(list,"",4), 'utf-8', function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log("Обновленный список клиентов сохранен в файл customers.json");
					res.send(true);
				}
			});
		}
	});
});

/* GET customer. */
router.get('/:id', function(req, res, next) {
    fs.readFile('public/files/'+req.params.id+'.json', {encoding: 'utf8'}, function (err, data) {
        if (err) {
            res.render('index', {title: 'Customer not found'});
        }
        else {
            var customer = JSON.parse(data);
            var title = customer.name.firstName+' '+customer.name.lastName+' | Customer Data Service';
            res.render('customerPage', {title: title, customer: customer});
        }
    });
});

/* UPDATE customer. */
router.put('/:id', function(req, res, next) {
    fs.writeFile('public/files/'+req.params.id+'.json', req.body.updatedCustomer, 'utf-8', function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Файл с описанием клиента успешно обновлен");
            fs.readFile('public/files/customers.json', {encoding: 'utf8'}, function (err, data) {
  	    		if(!err) {
    	    		var list = JSON.parse(data);
    	    		var customer = JSON.parse(req.body.updatedCustomer);
    	    		list[customer.id]=customer.name.firstName+' '+customer.name.lastName;
            		fs.writeFile('public/files/customers.json', JSON.stringify(list,"",4), 'utf-8', function(err) {
            			if(err) {
                			console.log(err);
            			} else {
                			console.log("Обновленный список клиентов успешно сохранен");
                			res.send(true);
            			}
            		});
        		}
        	});
        }
    });
});

/* DELETE customer. */
router.delete('/:id', function(req, res, next) {
	fs.unlink('public/files/'+req.params.id+'.json', function(err) {
		if(!err) {
			console.log("Файл с описанием клиента удален");
			fs.readFile('public/files/customers.json', {encoding: 'utf8'}, function (err, data) {
				if(!err) {
					var list = JSON.parse(data);
					delete list[req.params.id];
					fs.writeFile('public/files/customers.json', JSON.stringify(list,"",4), 'utf-8', function(err) {
						if(err) {
							console.log(err);
						} else {
							console.log("Обновленный список клиентов успешно сохранен");
							res.send(true);
						}
					});
				}
			});
		}
	});
});

module.exports = router;
