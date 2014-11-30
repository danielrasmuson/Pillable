var pg = require('pg');
var unirest = require('unirest');
var getToken = require("./getToken").getToken;
var $q = require('q');


function RewardsData(token){
  // todo: have this include time
  // this has to be a unique identified for now just using random num
  function getTransactionId(){
      return Math.floor(Math.random() * (1000000 - 0 + 1)) + 0;
  }

  Date.prototype.yyyymmdd = function() {
     var yyyy = this.getFullYear().toString();
     var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
     var dd  = this.getDate().toString();
     return yyyy +"-" +(mm[1]?mm:"0"+mm[0]) + "-"+(dd[1]?dd:"0"+dd[0]); // padding
    };

  var today = new Date();
  var date = today.yyyymmdd();
  var timestamp = today.yyyymmdd() + " " + today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
  var data = { "creates": [
        {
          "access_token": token,
          "affiliate_id": "pllpdse",
          "date": date,
          "device_name": "Pillable",
          "manufacturer_name": "Pillable",
          "transaction_id": getTransactionId(),
          "user_device_id": "9167332",
          "data": []
        }
      ]
    };

  this.getPayload = function(){
    return data;
  }

  function addPieceToRequest(content){
    data.creates[0].data.push(content);
  }

  this.addBloodPressure = function(bloodPressure){
    addPieceToRequest({
      "device_tracked": "true",
      "id": "a6e3502053df0131569d391",
      "timestamp": timestamp,
      "type": "blood_pressure",
      "value": {
        "diastolic": bloodPressure,
        "systolic": bloodPressure
      }
    })
  }

  this.addGlucose = function(glucose){
    addPieceToRequest({
      "device_tracked": "true",
      "id": "a6e3502053df013d1231392",
      "timestamp": timestamp,
      "type": "blood_oxygen_ratio",
      "value": glucose
    });
  }

  this.addWeight = function(weight){
    addPieceToRequest({
      "device_tracked": "true",
      "id": "a6e3502053df0169d1231393",
      "timestamp": timestamp,
      "type": "weight",
      "value": weight
    });
  }

  return this;
}

function sendData(data){
    var deferred = $q.defer(); 

    var API_KEY = "Eu9ZiReoEQbKZu6GQzrJTLW2LsQiKJHk";
    var urlToPost = "https://services.walgreens.com/api/steps/activity/v1?apiKey="+API_KEY;

    unirest.post(urlToPost)
    .send(JSON.stringify(data))
    .end(function (response) {
        if (response.body.error != undefined){
            console.log('ERROR: walgreens post failed!');
            console.log('ERROR: '+JSON.stringify(response.body.error));
            deferred.resolve(false);
        } else{
            deferred.resolve(true);
        }
    });
    return deferred.promise;
}

var syncHealthDataWithWalgreens = function(token, weight, bloodPressure, glucose){
    var deferred = $q.defer(); 

    var walgreensData = new RewardsData(token);
    walgreensData.addWeight(weight);
    walgreensData.addBloodPressure(bloodPressure);
    walgreensData.addGlucose(glucose);

    deferred.resolve(sendData(walgreensData.getPayload()));

    return deferred.promise;
}

exports.syncHealthDataWithWalgreens = syncHealthDataWithWalgreens;