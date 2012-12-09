define([
  "dojo/_base/declare",

  "./_Form",

  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/MemberForm.html",
  
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
  i18n: i18n,
  
  _deserialize: function(object) {
    var data = object.data;
    data.order = object.order;
    data.publish = object.publish;
    
    arguments[0] = data;
    
    this.inherited(arguments);
  },
  
  serialize: function() {
    var data = this.inherited(arguments);
    
    var out = {};
    out.title = data["given-name"] + " " + data["family-name"];
    out.order = data["order"] || 0;
    out.publish = data["publish"];
    out.data = {
      "family-name": data["family-name"],
      "given-name": data["given-name"],
      "title": data["title"],
      "email": data["email"],
      "tel": data["tel"].toString()
    };
    
    return out;
  }
  
});
});