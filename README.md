######Something is broken. Give me a day or so to fix this then check back.

##package-dependencies

Allows Atom package developers to enforce dependence on other Atom packages, similar to dependence on Node packages.

Include other Atom packages that will be installed on installation of your package.

###Usage


1. In the root-level `package.json`, include `"atom-package-dependencies": "latest"`

2. Include an object `"package-dependencies"` and list the Atom packages your package depends on by name. Note that versioning is not yet supported, so if any version is installed, this is satisfied.

3. Run `package-dependencies:update` from within your package to force update (see example below).
  - This will not be required in future versions, but will still be supported, so go ahead.

###Examples

Example excerpt of `package.json`:

```json
...

"dependencies": {
  "atom-package-dependencies": "latest"
},

"package-dependencies": {
  "merge-conflicts": "//version specification coming soon",
  "color-picker": "//this field will be ignored"
}

...
```
<br>Javascript example of forcing package updates:

```js
var pack = atom.packages;
var pd = pack.getLoadedPackage('package-dependencies');
if(!pack.isPackageActive('package-dependencies')
  pd.activateNow(); //activate if it's not active
pd.mainModule.installDependencies;
```

###Notes

- This will install the Atom packages listed in `"package-dependencies"` in the `.../.atom/packages/` directory. This means the packages are actually installed in the end-user's Atom like normal, rather than in a `node_modules` folder inside your package, and again in someone else's package.

- This project is in active development and will likely be superseded by something built into Atom in the future. The purpose is simply to give package developers an easy way to ensure that other packages are installed.
