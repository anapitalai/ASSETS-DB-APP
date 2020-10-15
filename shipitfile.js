// shipitfile.js
module.exports = (shipit) => {
  // Load shipit-deploy tasks
  require("shipit-deploy")(shipit);

  shipit.initConfig({
    default: {
      deployTo: "/home/shipit/assets",
      //repositoryUrl: "https://github.com/anapitalai/shipit-assets.git",
    },
    staging: {
      servers: "root@chervicontraining.com",
    },
  });
  shipit.blTask("npm:install", async () => {
    await shipit.remote(`cd ${shipit.releasePath} && npm install`);
  });
  shipit.on('updated',()=>{
      shipit.start('npm:install')
  })
};
