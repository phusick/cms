define([
  "dojo/_base/declare",
  "dojo/_base/lang",

  "./_Pane",
  
  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/LogsPane.html"
],
function(
  declare, 
  lang,
      
  _Pane,
  
  i18n,
  template  
)
{
return declare(_Pane, {
  
  contentTemplate: template,
  caption: i18n.title.settings,
  iconClass: "paneIconSettings"

});
});