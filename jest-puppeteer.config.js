const isWatchMode = !!process.env.WATCH;

const config = isWatchMode
  ? {}
  : {
      server: {
        command: "node ./test/helpers/server.js",
        port: process.env.UI_TEST_PORT,
      },
    };

module.exports = config;
