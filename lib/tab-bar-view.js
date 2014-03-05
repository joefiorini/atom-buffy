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

TabBarView.prototype.tabForItem = function(item) {
  return _.detect(this.getTabs(), function(tab) {
    return tab.hasItem(item);
  });
};

TabBarView.prototype.addTabForItem = _.wrap(TabBarView.prototype.addTabForItem, function(original, item, index) {
  var tab = this.tabForItem(item),
      activeTab = this.getActiveTab();
  if(tab) {
    tab.activateItem(item);
  } else if(activeTab) {
    activeTab.addItem(item);
  } else {
    original.apply(this, [item, index]);
  }
});

TabBarView.prototype.updateActiveTab = _.wrap(TabBarView.prototype.updateActiveTab, function(original) {
  original.apply(this);
  this.getActiveTab().activateItem(this.pane.activeItem);
});

TabBarView.prototype.getActiveTab = function() {
  return this.tabForItem(this.pane.activeItem);
};

TabBarView.prototype.activateNextTab = function() {
  var currentTab = this.getActiveTab();
  var tabIndex = (currentTab.index() + 1) % (this.getTabs().length);
  var nextTab = this.tabAtIndex(tabIndex);

  if(nextTab) {
    var itemUri = nextTab.item.uri || nextTab.item.getPath();
    this.pane.activateItemForUri(itemUri);
  }
};

TabBarView.prototype.activatePreviousTab = function() {
  var currentTab = this.getActiveTab();
  var tabIndex = currentTab.index() - 1;

  if(currentTab.index() === 0) {
    tabIndex = this.getTabs().length - 1;
  }

  var previousTab = this.tabAtIndex(tabIndex);

  if(previousTab) {
    var itemUri = previousTab.item.uri || previousTab.item.getPath();
    this.pane.activateItemForUri(itemUri);
  }
};

module.exports = TabBarView;
