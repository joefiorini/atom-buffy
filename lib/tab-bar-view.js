var TabBarView = require("/Applications/Atom.app/Contents/Resources/app/node_modules/tabs/lib/tab-bar-view");

TabBarView.prototype.addTabForItem = _.wrap(TabBarView.prototype.addTabForItem, function(original, item, index) {
  var tab = this.getActiveTab();
  if(tab) {
    this.getActiveTab().initialize(item);
  } else {
    original(item, index);
  }
});

TabBarView.prototype.getActiveTab = function() {
  return this.tabForItem(this.pane.activeItem);
};
