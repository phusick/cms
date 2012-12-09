define([
  "dojo/_base/declare",
  "dgrid/Grid",
  "./OnDemandList",
  "./Selection",
  "dgrid/Keyboard"
],
function(
  declare,
  Grid,
  OnDemandList,
  Selection,
  Keyboard
){
return declare([Grid, OnDemandList, Selection, Keyboard], {

  selectionMode: "single",
  deselectNoRefresh: true,
  cellNavigation: false,
  query: {},
  queryOptions: {},
  minRowsPerPage: 1000,
  maxRowsPerPage: 1000,
  noDataMessage: "No Data"

});
});