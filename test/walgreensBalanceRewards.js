var syncHealthDataWithWalgreens = require("../scripts/walgreensBalanceRewards").syncHealthDataWithWalgreens;

var result = syncHealthDataWithWalgreens(10, 100, 100, 100)

// valid json for the request
    // var testData = '{"creates": [{"access_token": "90c8b55aaafe542a9dd5331a1b9ce7f6a65b74f93a98261778188dd9519f8b18", "affiliate_id": "pllpdse", "data": [{"device_tracked": "true", "id": "a6e3502053df0169d1231393", "timestamp": "2014-11-20 19:41:52", "type": "weight", "value": 145.32 } ], "date": "2014-11-20", "device_name": "Pillable", "manufacturer_name": "Pillable", "transaction_id": "904986923560501", "user_device_id": "9167332"} ] }';

