module.exports = {
  activate: function() {
    atom.workspaceView.command('package-dependencies:check', this.installDependencies);
  },
  installDependencies: function(){

    function getInstalledPackages() {
      //return all installed packages and their versions in an object.
      var packageList = {};
      var meta = atom.packages.getAvailablePackageMetadata();
      for(var p in meta){
        packageList[meta[p].name] = meta[p].version;
      }
      return packageList;
    }

    function getAllAtomDependencies() {
      //return all atom package dependencies and versions in an object.
      var dependencyList = {};
      var meta = atom.packages.getAvailablePackageMetadata();
      for(var p in meta){
        if(meta[p]['atom-dependencies']){
          dependencyList[meta[p].name] = meta[p]['atom-dependencies'];
        }
      }
      return dependencyList;
    }

    function checkInstalled(installed, dependencies){
      for(var p in dependencies){
        for(var d in dependencies[p]){
          if(!installed[d]){              //if package not installed
            console.log(d + ": " + dependencies[p][d] + " is not installed.");
            //installPackage()
          }
        }
      }
    }

    function installPackage(pack){
      apmCommand(['install', pack]);
    }

    function apmCommand(args){
      var apm = atom.packages.getApmPath();
      var exec = require('child_process').exec;

      args.unshift(apm);
      var command = args.join(' ');

      var child = exec(command, function (error, stdout, stderr) {
        console.log('stdout: \n' + stdout);
        if (stderr !== '' || error !== null){
          console.log('stderr: \n' + stderr);
          console.log('exec error: \n' + error);
        }
      });
    }

    //apmCommand(['show', 'markdown-preview']);

    /*
    console.log(getInstalledPackages());
    console.log(getAllAtomDependencies());
    console.log(checkInstalled(getInstalledPackages(), getAllAtomDependencies()));
    */

  }
}
