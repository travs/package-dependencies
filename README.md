##package-dependencies

Allows Atom package developers to enforce dependence on other Atom packages, similar to dependence on Node packages.

###Usage


1. In the root-level `package.json` file of your package, include `"atom-package-dependencies": "latest"`

2. Include an object `"package-dependencies"` and list the Atom packages your package depends on by name

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
