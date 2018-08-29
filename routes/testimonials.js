var express = require('express');
var router = express.Router();
var path = require('path');

/* GET all skill List and display. */

const dbFindAllIn = function (dbName, collectionName) {
	const MongoClient = require('mongodb').MongoClient;
	const url = 'mongodb://localhost:27018';

	MongoClient.connect(url, { useNewUrlParser: true }, function (error, client) {


		const db = client.db(dbName);
		const collection = db.collection(collectionName);

		var resultArray = [];
		resultArray = collection.find({}).toArray();
		client.close();
		return resultArray;

	});
}

router.get('/', function (req, res, next) {


	// const MongoClient = require('mongodb').MongoClient;
	// const url = 'mongodb://localhost:27017';

	// MongoClient.connect(url, function(err, client) {
	// 	const db = client.db('comics');
	// 	const collection = db.collection('superheroes');

	// 	collection.find({}).toArray((error, documents) => {
	// 		console.log(documents);
	// 		client.close();
	// 	});
	//});

	var docList = dbFindAllIn('comics', 'superheroes');
	console.log(docList);
	res.render('testimonials', { title: 'Database trials', docList: docList });

});

module.exports = router;