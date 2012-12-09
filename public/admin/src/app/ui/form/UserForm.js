define([
  "dojo/_base/declare",
  "dojo/_base/lang",

  "./_Form",

  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/UserForm.html",
  
  // template dependencies
  "dijit/form/CheckBox",
  "dijit/form/ValidationTextBox",
  "dijit/form/Select"
],

function(
  declare,
  lang,
  
  _Form, 
  
  i18n,
  template
) 
{
return declare(_Form, {
  
  templateString: template,
  i18n: i18n,
  
  initComponents: function() {
    this.password1Widget.validator = lang.hitch(this, "_password1Validator");
    this.password2Widget.validator = lang.hitch(this, "_password2Validator");
    
    if(this.hasIdentity()) {
      this.changePasswordWidget.set("disabled", false);
      this.changePasswordWidget.set("checked", false);
      this.password1Widget.set("disabled", true);
      this.password2Widget.set("disabled", true);
    }
  },
  
  initConnections: function() {
    if(this.hasIdentity()) {
      this.connect(this.changePasswordWidget, "onChange", function(bool) {
        this.password1Widget.set("disabled", !bool);
        this.password2Widget.set("disabled", !bool);
        this.password1Widget.focus();
      });
    }
  },
  
  serialize: function() {
    var data = this.inherited(arguments);
    
    if(data.changePassword) {
      data.password = data.password1;
    }
    
    delete data.password1;
    delete data.password2;
    delete data.changePassword;
    
    return data;
  },
  
  _password1Validator: function() {
    var p1 = this.password1Widget.get("value");
    
    if(p1.length < 6) {
      this.password1Widget.set("invalidMessage", i18n.message.passwordTooShort);
      return false;
    }
    
    this.password2Widget.validate();
    return true;
  },
  
  _password2Validator: function() {
    var p1 = this.password1Widget.get("value");
    var p2 = this.password2Widget.get("value");
    
    if (p1 != p2 && this.password1Widget.get("state") == "") {
      this.password2Widget.set("invalidMessage", i18n.message.passwordsDoNotMatch);
      return false;
    }
    
    return true;
  }
  
});
});