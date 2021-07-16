const CracoAlias = require('craco-alias');

module.exports = {
    Plugin: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: '.',
                tsConfigPath: 'tsconfig.paths.json',
                debug: false,
            },
        },
    ],
};