var requireAtom = require("./helpers").requireAtom;
var _ = requireAtom("underscore-plus");
var Tabs = requireAtom("tabs");
var TabBarView = requireAtom("tabs/lib/tab-bar-view");

TabBarView.prototype.initialize = _.wrap(TabBarView.prototype.initialize, function(original, pane) {
  original.apply(this, [pane]);

  atom.workspaceView.command('buffy:next-tab', function(e) {
    this.activateNextTab();
  }.bind(this));

  atom.workspaceView.command('buffy:previous-tab', function(e) {
    this.activatePreviousTab();
  }.bind(this));

});

TabBarView.prototype.addTabForItem = _.wrap(TabBarView.prototype.addTabForItem, function(original, item, index) {
  var tab = this.getActiveTab();
  if(tab) {
    this.getActiveTab().initialize(item);
  } else {
    original.apply(this, [item, index]);
  }
});

TabBarView.prototype.getActiveTab = function() {
  return this.tabForItem(this.pane.activeItem);
};

TabBarView.prototype.activateNextTab = function() {
  var currentTab = this.getActiveTab();
  var nextTab = this.tabAtIndex(currentTab.index() + 1);

  if(nextTab) {
    var itemUri = nextTab.item.uri || nextTab.item.getPath();
    this.pane.activateItemForUri(itemUri);
  }
};

TabBarView.prototype.activatePreviousTab = function() {
  var currentTab = this.getActiveTab();
  var previousTab = this.tabAtIndex(currentTab.index() - 1);

  if(previousTab) {
    var itemUri = previousTab.item.uri || previousTab.item.getPath();
    this.pane.activateItemForUri(itemUri);
  }
};

module.exports = TabBarView;
