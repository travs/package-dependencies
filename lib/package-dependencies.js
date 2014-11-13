module.exports = {
  activate: function() {
    atom.workspaceView.command('package-dependencies:update', this.installDependencies);
  },
  installDependencies: function(){
    var installed = getInstalledPackages();
    var dependencies = getAllPackageDependencies();
    checkInstalled(installed, dependencies);
  }
}


function getInstalledPackages() {
  //return all installed packages and their versions in an object.
  var packageList = {};
  var meta = atom.packages.getAvailablePackageMetadata();
  for(var p in meta){
    packageList[meta[p].name] = meta[p].version;
  }
  return packageList;
}

function getAllPackageDependencies() {
  //return all atom package dependencies and versions as objects in an array.
  var dependencyList = new Array;
  var meta = atom.packages.getAvailablePackageMetadata();
  for(var p in meta){
    if(meta[p]['package-dependencies']){
      var x = meta[p]['package-dependencies'];
      dependencyList.push(x);
    }
  }
  return dependencyList;
}

/* SOON; with versioning

function getDependencyConflicts(dep) {
  //returns all version conflicts for an array of package
  //dependency objects (i.e. array from getAllPackageDependencies())
  for (var i = 0; i < dep.length; i++){
    for (var p in dep[i]){
      for (var j = i + 1; j < dep.length; j++){
        if(dep[j].hasOwnProperty(p)){
          if //hasVersionConflict()
            console.log("Package '" + p + "': conflict between versions: " + dep[i][p] + " and " + dep[j][p]);
        }
      }
    }
  }
}

*/

function checkInstalled(installed, dependencies){
  //`installed` is object containing 'package': 'version' pairs.
  //`dependencies` is array containing an object of 'package': 'version' dependency pairs; one for each package that has dependencies.
  var errors;
  for(var p in dependencies){
    for(var d in dependencies[p]){
      if(!installed[d]){                                    //if package not installed
        console.log("Attempting installation of " + d);
        installPackage(d);                                  //install it
      }
    }
  }
  if(errors === true){
    alert('Errors installing dependencies. Check console for output.');
  }
  else if(errors === false){
    alert('Atom package dependencies successfully installed.');
  }
  else{
    console.log("No dependencies to install.")
  }
}

function installPackage(pack){
  apmCommand(['install', pack]);
}

function apmCommand(args){
  //allows execution of 'apm' command with args passed in as array of strings
  var apm = atom.packages.getApmPath();
  var exec = require('child_process').exec;

  args.unshift(apm);
  var command = args.join(' ');

  var child = exec(command, function (error, stdout, stderr) {
    if (stderr !== '' || error !== null){
      console.log('stderr: \n' + stderr);
      console.log('exec error: \n' + error);
      errors = true;
    }
    else{
      errors = false;
    }
  });
}
