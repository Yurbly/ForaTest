module.exports = function (api) {
    api.cache(() => process.env.NODE_ENV === "production");
    const presets = ["@babel/preset-env", "@babel/preset-react"];


    return {
        presets
    };
};