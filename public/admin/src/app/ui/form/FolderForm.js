define([
  "dojo/_base/declare",

  "./_Form",

  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/FolderForm.html",
  
  // template dependencies
  "dijit/form/CheckBox",
  "dijit/form/ValidationTextBox"
],

function(
  declare,
  
  _Form, 
  
  i18n,
  template
) 
{
return declare(_Form, {
  
  templateString: template,
  i18n: i18n
  
});
});