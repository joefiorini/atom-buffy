var requireAtom = require("./helpers").requireAtom;

var _ = requireAtom("underscore-plus");
var TabView = requireAtom("tabs/lib/tab-view");

TabView.prototype.initialize = _.wrap(TabView.prototype.initialize, function(original, item, pane) {
  original.apply(this, [item, pane]);

  this.addItem(item);
});

TabView.prototype.hasItem = function(item) {
  return _.contains(this.items, item);
};

TabView.prototype.activateItem = function(item) {

  if(!this.hasItem(item)) {
    this.addItem(item);
  }

  this.item = item;
  this.updateTitle();
  this.updateModifiedStatus();
  this.updateTooltip();
};

TabView.prototype.addItem = function(item) {
  this.items = this.items || [];
  this.items.push(item);
};
