define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/dom-construct"
],

function(
  declare,
  lang,
  domConstruct
)
{
  
  var formatter = declare(null, {});
  
  formatter.publish = function(title) {
    var div = domConstruct.create("div", {
      className: "icon16 publishIconHeader"
    });
    
    if(title) div.title = title;
    return div;
  }


  formatter.iconClass = function(cssClass, title) {
    var div = domConstruct.create("div", {
      className: "icon16 " + cssClass
    });
    
    if(title) div.title = title;
    return div;
  }
  
  return formatter;
  
});  