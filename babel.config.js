module.exports = function (api) {
    api.cache(() => process.env.NODE_ENV === "production");
    const presets = [[
        "@babel/preset-env",
        {
            modules: false
        }
    ],
        "@babel/preset-react"];
    const plugins = ["@babel/plugin-proposal-class-properties"];


    return {
        presets,
        plugins
    };
};