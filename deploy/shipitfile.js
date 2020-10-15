// shipitfile.js
module.exports = shipit => {
    // Load shipit-deploy tasks
    require('shipit-deploy')(shipit)
  
    shipit.initConfig({
      default: {
        deployTo: '/home/anapitalai/shipit-apps/assets',
        repositoryUrl: 'https://github.com/anapitalai/shipit-assets.git',
      },
      staging: {
        servers: 'anapitalai@202.1.39.189',
      },
    })
  }