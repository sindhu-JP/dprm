module.exports = {
  webpack: function (config, env) {
    config.externals = {
      config: "DPRM_CONFIG",
      "config.js": "DPRM_CONFIG",
      noParse: /(mapbox-gl)\.js$/,
    };

    return config;
  },
};
