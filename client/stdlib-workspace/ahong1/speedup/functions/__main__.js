/**
* A basic Hello World function
 * @acl *
* @param {string} name Who you're saying hello to
* @returns {any}
*/
module.exports = (name = 'world', context, callback) => {

	var AWS = require("aws-sdk");
    AWS.config.update({
        accessKeyId: 'AKIAIIZPL74DK4BXD45Q',
        secretAccessKey: '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',
        region: "us-west-2"
		});
		
	var DB = new AWS.DynamoDB();
	var threshold;
	var fasts;

	DB.getItem({
		TableName: "nwHackDemo",
		Key: {
				data: {
						S: "Data"
				}
		}
}, function(err, data) {

		console.log(data.Item.numPeople.N)
		threshold = parseInt(data.Item.numPeople.N) / 5;
		fasts = parseInt(data.Item.Faster.N) + 1;
		console.log(fasts)

		var params = {
				ExpressionAttributeNames: {
						"#NP": "Faster"
				},
				ExpressionAttributeValues: {
						":t": {
								N: fasts.toString()
						}
				},


				ReturnValues: "ALL_NEW",
				TableName: "nwHackDemo",
				UpdateExpression: "SET #NP = :t ",
				Key: {
						data: {
								S: "Data"
						}
				}
		}


		DB.updateItem(params, function(err,data){
				if (err) console.log(err, err.stack); // an error occurred
				// else     console.log(data);

				if (fasts >= 2) {

					var params = {
						ExpressionAttributeNames: {
								"#NP": "isFaster"
						},
						ExpressionAttributeValues: {
								":t": {
										BOOL: true
								}
						},
	
						ReturnValues: "ALL_NEW",
						TableName: "nwHackDemo",
						UpdateExpression: "SET #NP = :t ",
						Key: {
								data: {
										S: "Data"
								}
						}
				}
					DB.updateItem(params, function(err,data){
						if (err) console.log(err, err.stack); // an error occurred
						// else     console.log(data);

						callback(null, data);
					});
				}

				else callback(null, data);
		})

})
	
};
