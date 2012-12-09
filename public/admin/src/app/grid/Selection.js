define([
  "dojo/_base/declare",
  "dgrid/Selection"
],
function(
  declare,
  Selection
){
return declare(Selection, {
 
  getSelectedId: function() {
    if(this.selectionMode != "single") {
      throw new Error('OnDemandGrid.getSelectedId(): selectionMode must be "single"');
    }
    var id = null;
    for(var each in this.selection) {
      if(this.selection[each] == true) {
        id = each;
        break;
      }
    }
    return id;
  },
  
  selectIndex: function(index) {
    var i = 0;
    var rowData = null;
    
    for (var each in this._rowIdToObject) {
      if(i == index) {
        rowData = this._rowIdToObject[each];
        break;
      }
      i++;
    }
    
    if(null == rowData) { return null; }
    
    var id = rowData[this.store.idProperty];
    if(this.selectionMode == "single") { 
      this.clearSelection();
      this._lastSelected = null;
    }
    this.select(id);    
    return id;
  }
  
});  
});