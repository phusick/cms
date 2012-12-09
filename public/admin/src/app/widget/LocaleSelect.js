define([
  "dojo/_base/declare",
  "dijit/form/Select",
  
  "dojo/i18n!app/nls/main"
],

function(
  declare,
  Select,
  
  i18n
)
{
  return declare("app.widget.LocaleSelect", Select, {
    
    style: "width: 15em;",
    
    options: [
      {
        label: '<span class="widgetLocaleSelect flag-cs">' + i18n.locale.cs + '</span>', 
        value: "cs", 
        selected: true
      },
      {
        label: '<span class="widgetLocaleSelect flag-en">' + i18n.locale.en + '</span>', 
        value: "en"
      }
    ]
    
  });
}
);