define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/string",
  "dojo/query",
  "dojo/parser",
  
  "dijit/registry",
  "dijit/layout/ContentPane",
  
  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/_Pane.html",
  
  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane"
],

function(
  declare, 
  lang,
  string,
  query,
  parser,
  
  registry,
  ContentPane,

  i18n,
  template
)
{
return declare("app.ui._Pane", ContentPane, {
  
  parseOnLoad: false,
  
  constructor: function() {
    this.widget = {};
    this.node = {};
    
    var childTemplate = string.substitute(this.contentTemplate, {
      i18n: i18n
    });
    
    this.content = string.substitute(template, {
      template: childTemplate,
      caption: this.caption,
      iconClass: this.iconClass
    });
  },
  
  postCreate: function() {
    this.inherited(arguments);
    
    var widgetNodes = this._attachTemplateNodes();

    parser.parse({rootNode: this.domNode }).then(lang.hitch(this, function() {
      this._attachTemplateWidgets();
      this.initComponents();
      this.initConnections();
    }));    
  },
  
  initComponents: function() {
    // stub
  },
  
  initConnections: function() {
    // stub
  },
  
  _attachTemplateNodes: function() {
    var nodes = this.domNode.getElementsByTagName("*");
    var widgetNodes = [];
    
    for(var each = 0; each < nodes.length; each++) {
      var attachPoint = nodes[each].getAttribute("data-dojo-attach-point");
      if(attachPoint) {
        if(nodes[each].hasAttribute("data-dojo-type")) { continue; }

        this.node[attachPoint] = nodes[each];
      }
    }
    return widgetNodes;
  },
  
  _attachTemplateWidgets: function(widgets) {
    widgets = widgets || this.getChildren();
    for(var each = 0; each < widgets.length; each++) {
      var widget = widgets[each];
      var attachPoint = widget.params.dojoAttachPoint;
      if(attachPoint) {
        this.widget[attachPoint] = widget;
      }
      
      var children = widget.getChildren();
      if(children.length > 0) {
        this._attachTemplateWidgets(children);
      }
    }
    
  }
  
})
})