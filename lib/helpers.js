module.exports.requireAtom = function(package) {
  var globalModules = "/Applications/Atom.app/Contents/Resources/app/node_modules";
  return require(globalModules + "/" + package);
};
