{WorkspaceView} = require 'atom'
AtomDependencies = require '../lib/atom-dependencies'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "AtomDependencies", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('atom-dependencies')

  describe "when the atom-dependencies:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.atom-dependencies')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.commands.dispatch atom.workspaceView.element, 'atom-dependencies:check'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.atom-dependencies')).toExist()
        atom.commands.dispatch atom.workspaceView.element, 'atom-dependencies:check'
        expect(atom.workspaceView.find('.atom-dependencies')).not.toExist()
