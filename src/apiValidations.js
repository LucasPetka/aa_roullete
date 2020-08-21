const _ = require('lodash');

const isValidSpinConfig = (config) => {

    //Example
    // {
    //     "uuid": "00000000-0000-0000-0000-000000000000",
    //     "id": 0,
    //     "startTime": "2020-08-20T11:22:53.787Z",
    //     "startDelta": 0,
    //     "startDeltaUs": 0,
    //     "fakeStartDelta": 0,
    //     "duration": 0,
    //     "result": 0,
    //     "outcome": "0"
    // }

    const message = 'Spin API is wrong';

    if (!_.isString(config.uuid)) {
        throw new Error(message);
    }

    if (!_.isNumber(config.id)) {
        throw new Error(message);
    }

    if (!_.isString(config.startTime)) {
        throw new Error(message);
    }

    if (!_.isNumber(config.startDelta)) {
        throw new Error(message);
    }

    if (!_.isNumber(config.startDeltaUs)) {
        throw new Error(message);
    }

    if (!_.isNumber(config.duration)) {
        throw new Error(message);
    }

    if (!(config.result != null  || !_.isNumber(config.result))) {
        throw new Error(message);
    }

    if (!(config.outcome != null  || !_.isNumber(config.outcome))) {
        throw new Error(message);
    }

    return true;
};

const isValidStatisticsConfig = (config) => {

    //Example
    // [
    //     {
    //         "result": 0,
    //         "count": 0
    //     }
    // ]

    const message = 'Statistics API is wrong';

    config.forEach(answer => {

        if (!_.isNumber(answer.result)) {
            throw new Error(message);
        }

        if (!_.isNumber(answer.count)) {
            throw new Error(message);
        }
        
    });

    return true;
};

const isValidConfigurationsConfig = (config) => {

    // {
    //     "name": "singleZero",
    //     "slots": 37,
    //     "results": [
    //       "0",
    //       "1",
    //       "2" ...
    //     ],
    //     "colors": [
    //       "green",
    //       "red",
    //       "black" ...
    //     ],
    //     "positionToId": [
    //       0,
    //       32,
    //       15 ...
    //     ]
    //   }

    const message = 'Configuration API is wrong';


    if (!_.isString(config.name)) {
        throw new Error(message);
    }

    if (!_.isNumber(config.slots)) {
        throw new Error(message);
    }

    if (!_.isArray(config.results)) {
        throw new Error(message);
    }

    if (!_.isArray(config.colors)) {
        throw new Error(message);
    }

    if (!_.isArray(config.positionToId)) {
        throw new Error(message);
    }


    
    return true;
};

module.exports = {
    isValidSpinConfig,
    isValidStatisticsConfig,
    isValidConfigurationsConfig
};
  



  