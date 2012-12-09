define([
  "dojo/_base/declare",
  
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  
  "dijit/Dialog",
  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/AboutDialog.html"
],
function(
  declare,
  
  _Widget, 
  _TemplatedMixin, 
  _WidgetsInTemplateMixin, 
  
  Dialog,
  i18n,
  template
){
  
return declare(Dialog, {

  title: i18n.title.about,
  content: template,
  
  constructor: function() {
    var content = new (declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
      templateString: template,
      i18n: i18n,
      version: dojo.version.toString()
    }));
    content.startup();
    this.content = content;
  },
  
  postCreate: function() {
    this.inherited(arguments);
    
    this.connect(this.content.okButton, "onClick", "hide");
  }

});
  
});