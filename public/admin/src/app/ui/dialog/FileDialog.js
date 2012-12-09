define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/Deferred",
  
  "./_Dialog",
  "app/ui/form/FileForm",
  
  "dojo/i18n!app/nls/main"
],

function(
  declare,
  lang,
  Deferred,
  
  _Dialog,
  Form,
  
  i18n
)
{
return declare(_Dialog, {
  
  constructor: function(props) {
    var action = this.identity == null ? i18n.action.create : i18n.action.update;
    this.title = action + ": " + i18n.item.file;
    this.form = new Form(props);
  },
  
  execute: function(data) {
    var submitButtonLabel = this.submitButton.get("label");
    this.submitButton.set("label", i18n.state.saving);
    this.form.set("busy", true);
    
    if(null != this.identity) {
      data.id = this.identity;
      options = { id: this.identity };
      Deferred.when(this.store.put(data, options), lang.hitch(this, function(result) {
        this.submitButton.set("label", i18n.dialog.submit);
        this.submitButton.set("disabled", false);
        this.hide();        
      }));
    } else {
      Deferred.when(this.form.submit(), lang.hitch(this, function(item) {
        this.submitButton.set("label", submitButtonLabel);
        this.form.set("busy", false);
        this.store.notify(item);
        this.hide();
      }));
    }    
  }
  
  
});
}
);
