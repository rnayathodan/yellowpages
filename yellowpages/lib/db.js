/*loadData: This function loads the data in the data Array to a collection in mongoDB
 * @param {Array} dataArr
 * @returns null
 * @api public
 */
exports.loadData=function(dataArr, callBack){

	if(dataArr.length<=0){
		return;
	}
	//Connect to mongoDB
	var mongoClient=require("mongodb").MongoClient;
	mongoClient.connect('mongodb://127.0.0.1:27017/yellowpages', function(err, db) {
		if(err){
			console.log("unable to connect"+err);
			throw err;
		}
		//Get the collection
		var collection=db.collection("business_listing");
		exports.currentIdx=0;

		//Insert the data set to the collection
		
		collection.insert(dataArr, function (err, docs){
			if(err){
				throw err;
			}
			console.log("Im done Inserting data");
			callBack();
		});
		
		
	
		
		
	});
	
  

	

	
}

