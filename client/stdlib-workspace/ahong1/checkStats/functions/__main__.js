/**
* A basic Hello World function
 * @acl *
* @param {string} name Who you're saying hello to
* @returns {object}
*/
module.exports = (name = 'world', context, callback) => {

    var AWS = require("aws-sdk");
    AWS.config.update({
        accessKeyId: 'AKIAIIZPL74DK4BXD45Q',
        secretAccessKey: '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',
        region: "us-west-2"
    });
    var DB = new AWS.DynamoDB();


    DB.getItem({
        TableName: "nwHackDemo",
        Key: {
            data: {
                S: "Data"
            }
        }
    }, function(err, data) {


        var results = {

          isFaster: data.Item.isFaster.BOOL,
            isLouder: data.Item.isLouder.BOOL,
            isSlower: data.Item.isSlower.BOOL,
            isQuieter: data.Item.isQuieter.BOOL,
            isSmile: data.Item.isSmile.BOOL



        }

        callback(null, results);

    })


};
