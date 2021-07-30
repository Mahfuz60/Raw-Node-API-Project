// scaffolding
const environment = {};
environment.staging = {
    port: 3000,
    envName: 'staging',
};
environment.production = {
    port: 5000,
    envName: 'production',
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