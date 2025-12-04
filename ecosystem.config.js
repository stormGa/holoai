module.exports = {
  apps: [{
    name: 'holoai-dev',
    script: './node_modules/react-scripts/scripts/start.js',
    interpreter: 'node',
    env: {
      NODE_ENV: 'development'
    }
  }]
};
