define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/dom-class",
  "dojo/query",
  "dojo/dom-attr",
  "dijit/form/_FormWidget",
  "dijit/registry",
  
  "dojo/text!./SidebarItem/SidebarItem.html",
  "dojo/NodeList-traverse"
],
  function(
    declare,
    lang,
    domClass,
    query,
    domAttr,
    _FormWidget,
    registry,
    
    template
  ) {
      return declare("app.widget.SidebarItem", _FormWidget, {
        
        templateString: template,
        
        baseClass: "widgetSidebarItem",
        iconClass: "",
        
        checked: false,
        
        attributeMap: lang.delegate(_FormWidget.prototype.attributeMap, {
          checked: "focusNode"
        }),
        
        _setIconClassAttr: function(/*String*/ value) {
          var oldValue = this.iconClass || "dijitNoIcon";
          var newValue = value || "dijitNoIcon";
          
          domClass.replace(this.iconNode, newValue, oldValue);
          this._set("iconClass", value);
        },
        
        _setCheckedAttr: function(/*Boolean*/ value) {
          this._set("checked", value);
          domAttr.set(this.domNode, "checked", value);
          if(!this._created) {return;}
          if(value) {
            var _this = this;
            var parentNode = query(this.domNode).parent()[0];
            query("div[data-dojo-widget-type=SidebarItem]", parentNode).forEach(
              function(inputNode) {
                var name = domAttr.get(inputNode, "data-dojo-widget-name");
                if(name == _this.name && inputNode != _this.focusNode) {
                  var widget = registry.getEnclosingWidget(inputNode);
                  if(widget && widget.checked) {
                    widget.set("checked", false);
                  }
                }
              }
            );
          }
        },
        
        _onClick: function(e) {
          if(!this.checked) {
            this.set("checked", true);
            this.onClick();
          }
        },
        
        onClick: function(e) {}
        
      })
  }
);