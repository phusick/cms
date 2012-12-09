define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/dom-style",
  "dojo/_base/Deferred",
  "app/util/date/stamp",
  
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",

  "dojo/i18n!app/nls/main",
  
  "dijit/form/Form",
  
  "dijit/form/ValidationTextBox",
  "app/widget/ValidationTextarea",
  "dijit/form/DateTextBox",
  "dijit/form/CheckBox",
  "app/widget/LocaleSelect"
],

function(
  declare,
  lang,
  array,
  domStyle,
  Deferred,
  stamp,
  
  _Widget, 
  _TemplatedMixin, 
  _WidgetsInTemplateMixin,
  
  i18n  
) 
{
return declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
  
  templateString: "",
  i18n: i18n,
  
  constructor: function(props) {
    this.identity = props.identity || null;
    
    var templateStart = [
      '<div class="form" style="position:relative;">',
      '<div data-dojo-attach-point="overlayBackgroundNode" class="overlayBackground"></div>',
      '<div data-dojo-attach-point="overlayProgressNode" class="overlayProgress indeterminate"></div>',
      '<form',
      'data-dojo-type="dijit.form.Form"',
      'data-dojo-attach-point="_form"',
      '>'
    ].join(" ");
    
    var templateEnd = '</form></div>';
    
    this.templateString = templateStart + this.templateString + templateEnd;
    this.busy = false;
  },
  
  postCreate: function() {
    this.inherited(arguments);
    this.connect(this._form, "onValidStateChange", "onValidStateChange");
    this.initComponents();
    this.initConnections();
  },
  
  initComponents: function() {
    // stub
  },
  
  initConnections: function() {
    // stub
  },
  
  load: function(deferred) { // TODO: disable from during busy
    this.set("busy", true);
    Deferred.when(deferred, lang.hitch(this, "onLoad"));
  },
  
  onLoad: function(object) {
    // pseudo-event
    this.sourceData = object;
    this._deserialize(object);
    this.set("busy", false);
  },
  
  onValidStateChange: function(state) {
    // pseudo-event
  },
  
  onBusyStateChange: function(isBusy) {
    // pseudo-event
  },
  
  onShow: function() {
    // pseudo-event
  },
  
  hasIdentity: function() {
    return (this.identity !== null);
  },
  
  _setBusyAttr: function(bool) {
    bool = !!bool;
    this._set("busy", bool);
    this.onBusyStateChange(bool);
    if (bool) {
      domStyle.set(this.overlayBackgroundNode, "display", "block");
      domStyle.set(this.overlayProgressNode, "display", "block");
      return;
    }
    domStyle.set(this.overlayBackgroundNode, "display", "none");
    domStyle.set(this.overlayProgressNode, "display", "none");
  },
  
  _getBusyAttr: function() {
    return this.busy;
  },
    
  serialize: function() {
    var form = this._form;
    var object = {};
    if(this.sourceData) {
      object = lang.clone(this.sourceData);
    }
    
    array.forEach(form._getDescendantFormWidgets(), function(item) {
      var name = item.get("name");
      var value = item.get("value");
      
      switch(item.declaredClass) {
        case "dijit.form.DateTextBox":
          value = stamp.toSQLString(value, {selector: "date"});
          break;
        case "dijit.form.CheckBox":
          //value = value.length ? true : false;
          value = item.get("checked") ? 1 : 0;
          break;
      }
      
      lang.setObject(name, value, object);
    }, this);
    
    return object;
  },
  
  _deserialize: function(object) {
    var form = this._form;
    array.forEach(form._getDescendantFormWidgets(), function(item) {
      var name = item.get("name");
      if (lang.exists(name, object)) {
        var value = object[name];
        switch(item.declaredClass) {
          case "dijit.form.DateTextBox":
            value = stamp.fromSQLString(value);
            break;
          case "dijit.form.CheckBox":
            value = !!value;
            break;
        }
        item.set("value", value);
      }
    }, this);
    this.deserialize(object);
  },
  
  deserialize: function(object) {
    // stub
  },
  
  isValid: function() {
    return this._form.isValid();
  },
  
  reset: function() {
    this._form.reset();
  },
  
  getValues: function() {
    return this._form.get("value");
  },
  
  setValues: function(value) {
    this._form.set("value", value);
  }
  
});  
}
);