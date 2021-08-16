// scaffolding
const environment = {};
environment.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'jsjsdskklsklskd',
    twilio: {
        fromPhone: '+1500550006',
        accountSid: 'ACa8dc3a3e74f750a61e8bb8787c575645',
        authToken: '6a91ae6cd29bfe1ea916bf8e89adeea6',
    },
};
environment.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'eroerodjfklslkd',
    twilio: {
        fromPhone: '+1500550006',
        accountSid: 'ACa8dc3a3e74f750a61e8bb8787c575645',
        authToken: '6a91ae6cd29bfe1ea916bf8e89adeea6',
    },
};
// determine which environment is passed

const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';
// export corresponding environment object
const environmentToExport =
    typeof environment[currentEnvironment] === 'object'
        ? environment[currentEnvironment]
        : environment.staging;

// export
module.exports = environmentToExport;
