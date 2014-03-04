var TabBarView = require("/Applications/Atom.app/Contents/Resources/app/node_modules/tabs/lib/tab-bar-view");
var original = TabBarView.prototype.addTabForItem;
TabBarView.prototype.addTabForItem = function(item, index){
  this.getActiveTab().initialize(item);
    // original.apply(this, _.toArray(arguments));
};

TabBarView.prototype.getActiveTab = function() {
  return this.tabForItem(this.pane.activeItem);
};
