define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/Deferred",
  
  "./_Dialog",
  "app/ui/form/FolderForm",
  
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
    var action = this.identity === null ? i18n.action.create : i18n.action.update;
    this.title = action + ": " + i18n.item.folder;
    this.form = new Form(props);
  }
  
});
})