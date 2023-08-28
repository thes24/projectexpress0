module.exports = {
	apps: [ {
    name: 'projectexpress0',
    script: 'index.js',
    args: '--log-date-format "DD-MM HH:mm:ss.SSS"',

    env: {
      NODE_ENV: 'local',
    },
  } ],
};