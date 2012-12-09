define([
  "dojo/_base/declare",
  "app/util/date/stamp",

  "./_Form",

  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/NewsForm.html"
],

function(
  declare,
  stamp,
  
  _Form, 
  
  i18n,
  template
  
) 
{
return declare(_Form, {
  
  templateString: template,
  i18n: i18n
  
});  
}
);