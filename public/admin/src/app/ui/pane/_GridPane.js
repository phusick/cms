define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/aspect",
  
  "./_Pane",
  
  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/_GridPane.html",
  
  "dojo/store/JsonRest",
  "dojo/store/Observable",
  "app/grid/Grid",
  // template dependencies
  "dijit/form/Button",
  "dijit/Toolbar",
  "dijit/ToolbarSeparator"
],

function(
  declare,
  lang,
  aspect,
  
  _Pane,
  
  i18n,
  template,

  JsonRest,
  Observable,
  Grid
)
{
return declare(_Pane, {

  contentTemplate: template,
  
  "-chains-": {
    initComponents: "after",
    initConnections: "after"
  },
  
  initComponents: function() {
    var store = new JsonRest({
      target: this.storeTarget,
      idProperty: "id",
      sortParam: "sort"
    });
    this.store = new Observable(store);
      
    this.grid = new Grid({
      store: this.store,
      columns: this.gridColumns
    }, this.node.grid);
    
    setTimeout(lang.hitch(this.grid, "startup"));
  },
  
  initConnections: function() {
    var w = this.widget;
    this.connect(w.createButton, "onClick", "_onCreate");
    this.connect(w.updateButton, "onClick", "_onUpdate");
    this.grid.on("dblclick", lang.hitch(this, "_onUpdate"));
    this.connect(w.deleteButton, "onClick", "_onDelete");
    this.connect(w.refreshButton, "onClick", "_onRefresh");
    
    aspect.after(this.grid, "select", lang.hitch(this, "_updateToolbar"), true);   
    aspect.after(this.grid, "refresh", lang.hitch(this, "_updateToolbar"), true);   
  },
  
  _onCreate: function() {
    var dialog = this._createDialog();
    dialog.show(); 
  },
  
  _onUpdate: function() {
    var id = this.grid.getSelectedId();

    if (null != id) {
      var dialog = this._createDialog({identity: id});
      dialog.show();
    }
  },
  
  _onDelete: function() {
    if(confirm(i18n.msgbox.deleteItem)) {
      var id = this.grid.getSelectedId();
      this.store.remove(id);
    }
  },
  
  _onRefresh: function() {
    this.grid.refresh();
  },
  
  _updateToolbar: function() {
    var disabled = this.grid.getSelectedId() == null ? true : false;
    this.widget.updateButton.set("disabled", disabled);
    this.widget.deleteButton.set("disabled", disabled);
  },
  
  _createDialog: function(props) {
    props = props || {};
    props.store = this.store;
    var dialog = new this.dialogClass(props);
    dialog.startup();
    var signal = aspect.after(dialog, "onHide", function() {
      signal.remove();
      dialog.destroyRecursive();
    });
    return dialog;
  }  

})
});