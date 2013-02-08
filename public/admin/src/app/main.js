define([ 'dojo/has', 'require', 'dojo/_base/sniff' ], function (has, require) {
  var app = {};

  if (has('host-browser') && isCompatible()) {

    require([ './EntryPoint', 'dojo/domReady!' ], function (EntryPoint) {
      app.entryPoint = new EntryPoint().placeAt(document.body);
      app.entryPoint.startup();
    });
    
  }
  else {
    window.location = "/admin/browser/";
  }
    
  function isCompatible() {
    if(has("ff") >= 3) return true;
    if(has("ie") >= 9) return true;
    if(has("opera") >= 10) return true;
    if(has("webkit") >= 531) return true;
    return false;
  }
});