var apd = require('atom-package-dependencies');

module.exports = {
  activate: function(){
    atom.workspaceView.command('package-dependencies:install', this.install);
  },
  install: function() {
    apd.install();
  }
}
