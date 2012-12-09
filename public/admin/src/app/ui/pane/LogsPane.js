define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/_base/Deferred",
  "dojo/aspect",
  "dojo/string",

  "./_Pane",
  
  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/LogsPane.html"
],
function(
  declare, 
  lang,
  array,
  Deferred,
  aspect,
  string,
      
  _Pane,
  
  i18n,
  template  
)
{
return declare(_Pane, {
  
  contentTemplate: template,
  caption: i18n.title.logs,
  iconClass: "paneIconLogs"

});
});