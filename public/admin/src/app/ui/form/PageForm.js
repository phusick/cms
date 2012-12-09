define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "app/util/date/stamp",

  "./_Form",

  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/PageForm.html",
  
  "dojo/store/Memory",
  "dojo/store/JsonRest",
  "dijit/Editor",
  
  "dijit/form/ValidationTextBox",
  "dijit/form/CheckBox",
  "dijit/form/NumberSpinner",
  "app/widget/LocaleSelect",
  "dijit/form/DateTextBox",
  "dijit/form/FilteringSelect",
  "dijit/_editor/plugins/FullScreen",
  "dijit/_editor/plugins/ViewSource",
  "dijit/_editor/plugins/LinkDialog",
  "dojox/editor/plugins/PrettyPrint",
  "dijit/_editor/plugins/FontChoice"
  
  //"dojox/editor/plugins/LocalImage"
  //{name: 'LocalImage', uploadable: true, uploadUrl: '', baseImageUrl: '', fileMask: '*.jpg;*.jpeg;*.gif;*.png;'},
],

function(
  declare,
  lang,
  stamp,
  
  _Form, 
  
  i18n,
  template,
  
  Memory,
  JsonRest,
  
  Editor
) 
{
  
return declare(_Form, {
  
  templateString: template,
  i18n: i18n,
  
  constructor: function(props) {
    this.parentStore = props.store;
    this.entityType = props.entityType;
  },
  
  initComponents: function() {
    this._createEditor();
    
    this.memoryStore = new Memory({ idProperty: "id"});
    this.translationWidget.set("store", this.memoryStore);
    
    if(this.entityType == "post") {
      this.orderWidget.set("disabled", true);
    }
    
    if(!this.hasIdentity()) {
      this.orderWidget.set("value", 0);
      this.editor.set("value", "<p></p>");
      this._loadTranslations(null);
    }
  },
  
  initConnections: function() {
    this.connect(this.languageWidget, "onChange", "language_onChange");
    this.connect(this.publishWidget, "onChange", "publish_onChange");
  },
  
  deserialize: function(data) {
    this.editor.set("value", data.content);
    this._loadTranslations(data.translation_id);   
  },
  
  serialize: function() {
    var data = this.inherited(arguments);
    
    data.translation_id = parseInt(data.translation, 10);
    if(isNaN(data.translation_id)) {
      data.translation_id = null;
    }
    delete data.translation;

    return data;
  },
  
  onShow: function() {
    this.editor.placeAt(this.editorNode);
  },
  
  language_onChange: function() {
    this._loadTranslations(null);
  },
  
  publish_onChange: function(value) {
    this.startDateWidget.set("disabled", !value);
    this.endDateWidget.set("disabled", !value);
  },
  
  _createEditor: function() {
    this.editor = new Editor({
      name: "content",
      plugins: [
        'undo', 'redo', 
        '|', {name: 'formatBlock', plainText: true},
        '|', 'bold', 'italic', 'underline', 'strikethrough',
        '|', 'insertUnorderedList', 'insertOrderedList'
      ],
      extraPlugins: [
        '|', 'createLink',
        '|', 'viewsource', {name: 'fullscreen', zIndex: 1000}, 'prettyprint'
      ],
      height: '300px',
      styleSheets: require.toUrl("app/ui/form/templates/editor.css?v1")
    });
  },
  
  _loadTranslations: function(translationId) {
    var language = this.languageWidget.get("value") == 'en' ? 'cs' : 'en';
    
    this.translationWidget.set("disabled", true);
    
    this.parentStore.query({language: language}).then(lang.hitch(this, function(data) {
      
      this.memoryStore.setData(data);
      this.translationWidget.set("value", translationId);
      this.translationWidget.set("disabled", false);
    }));
  }
  
});  
}
);