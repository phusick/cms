define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/when",
  "dgrid/OnDemandList"
],

function(
  declare,
  lang,
  when,
  OnDemandList
){
  
function emitError(err){
  if(listen.emit(this.domNode, "dgrid-error", {error: err, cancelable: true, bubbles: true})){
    console.error(err);
  }
}
  
return declare(OnDemandList, {
  
  _trackError: function(func) {
    var result;
    
    if(typeof func == "string") { func = lang.hitch(this. func); }
    
    try {
      result = func();
    } catch(err) {
      emitError.call(this, err);
    }
    return when(
      result,
      lang.hitch(this, "onRefreshSuccess"),
      lang.hitch(this, emitError)
    );
  },
  
  onRefreshSuccess: function(results) {
    // stub
  }
  
});
  
}
)