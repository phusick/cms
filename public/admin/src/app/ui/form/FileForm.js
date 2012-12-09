define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/Deferred",
  "dojo/aspect",
  "dojo/dom-construct",
  "dojo/dom-class",

  "./_Form",
  "dijit/ProgressBar",

  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/FileForm.html",
  
  "app/util/formatter",
  
  // template dependencies
  "dojox/form/Uploader",
  "dojox/form/uploader/plugins/IFrame",
  "dijit/form/ValidationTextBox"
],

function(
  declare,
  lang,
  Deferred,
  aspect,
  domConstruct,
  domClass,
  
  _Form, 
  ProgressBar,
  
  i18n,
  template,
  
  formatter
) 
{
return declare(_Form, {
  
  templateString: template,
  i18n: i18n,
  
  attributeMap: {
    filename: {
      node: "filenameNode",
      type: "innerHTML"
    }
  },

  constructor: function(props) {
    this.parentId = props.parentId;
  },
  
  postCreate: function() {
    this.inherited(arguments);
    
    this.initComponents();
    this.initConnections();
  },
  
  initComponents: function() {
    this._form.set("enctype", "multipart/form-data");
     
    lang.mixin(this.uploader, {
      state: "Incomplete",
      validate: function() {
        var isValid = this.getFileList().length > 0;
        this.set("state", isValid ? "" : "Incomplete");
        return isValid;
      }
    });
    this.uploader.on("change", function() { this.validate(); });
  },
  
  initConnections: function() {
    this.connect(this.uploader, "onChange", "uploader_onChange");
  },
  
  serialize: function() {
    var object = this.inherited(arguments);
    delete object.uploadedfile;    
    return object;
  },
  
  deserialize: function(object) {
    if(this.identity == null) { return; }
      
    this.uploader.set("disabled", true);
    this.uploader.set("state", "");
    
    var fileInfo = {
      name: object.data.filename,
      size: object.data.filesize,
      icon: object.mimeicon,
      link: object.download_url
    };
    this.set("filename", this._formatFilename(fileInfo));
  },
  
  submit: function() {
    this._createProgressBar();
    
    var data = this.serialize();
    this.uploader.upload({
      parent_id: this.parentId,
      title: data.title,
      publish: data.publish,
      response_type: this.uploader.uploadType
    });
    
    var deferred = new Deferred();
    // TODO: handle uploader onError event
    var completeSignal = aspect.after(this.uploader, "onComplete", lang.hitch(this, function(object) {
      this._destroyProgressBar();
     
      completeSignal.remove();
      deferred.resolve(object);
    }), true);
    
    return deferred;
  },
  
  _createProgressBar: function() {
    if(this.uploader.uploadType != "html5") { return; }

    this.progressBar = new ProgressBar({
      style: "width: 200px;margin:auto;top:43%;",
      maximum: 100
    });
    domClass.remove(this.overlayProgressNode, "indeterminate");
    domConstruct.place(this.progressBar.domNode, this.overlayProgressNode);

    this.progressSignal = aspect.after(this.uploader, "onProgress", 
      lang.hitch(this, function(event){
        this.progressBar.set("value", (event.decimal*100).toFixed());
      }),
      true);
  },
  
  _destroyProgressBar: function() {
    if(this.uploader.uploadType != "html5") { return; }

    this.progressSignal.remove();
    this.progressBar.destroy();
    domClass.add(this.overlayProgressNode, "indeterminate");
  },
  
  uploader_onChange: function() {
    var u = this.uploader;
    if(u.get("state") == "") {
      var fileInfo = u.getFileList()[0];
      this.set("filename", this._formatFilename(fileInfo));
      
      if(this.titleDijit.get("value") == "") {
        var name = fileInfo.name;
        var title = name.substring(0, name.lastIndexOf("."));
        this.titleDijit.set("value", title);
        this.titleDijit.focus();
        try {
          this.titleDijit.textbox.setSelectionRange(0, title.length);
        } catch (e) {
          console.warn(e.toString());
        }
      }
    }
  },
  
  _formatFilename: function(fileInfo) {
    var out = fileInfo.name;
    if(fileInfo.size) { out += " (" + formatter.filesize(fileInfo.size) + ")" }
    
    if(fileInfo.link) {
      out = '<a href="' + fileInfo.link + '">' + out + '</a>';
    }
   
    return out;
  }
   
});  
}
);