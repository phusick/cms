define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/aspect",
  
  "dojo/i18n!app/nls/main",
  
  "dijit/MenuItem",
  "dijit/MenuSeparator",
  
  "app/ui/dialog/AboutDialog"
],
function(
  declare,
  lang,
  aspect,
  
  i18n,
  
  MenuItem,
  Separator,
  
  AboutDialog
){
  
  return declare(null, {
    
    constructor: function(container) {
      this.container = container;
      this.initComponents();
    },
    
    initComponents: function() {
      var about = new MenuItem({
        iconClass: "icon16 menuIconAbout",
        label: i18n.menu.about,
        onClick: lang.hitch(this, "about_onClick")
      });
      
      var separator = new Separator();
      
      var visitSite = new MenuItem({
        iconClass: "icon16 menuIconVisitSite",
        label: i18n.menu.visitSite,
        onClick: function(){ window.location = "/"; }
      });
      
      this.container.addChild(about);
      this.container.addChild(separator);
      this.container.addChild(visitSite);
    },
    
    about_onClick: function() {
      var dialog = new AboutDialog();
      dialog.startup();
      
      var hideSignal = aspect.after(dialog, "onHide", function() {
        hideSignal.remove();
        dialog.destroyRecursive();
      });
      
      dialog.show();
      
    }
    
  });
  
});