define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/Deferred",
  "dojo/when",
  "dojo/aspect",
  
  "dijit/Dialog",
  "dijit/_Widget",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  
  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/_Dialog.html",
  
  "app/ui/form/_Form",
  
  "dijit/form/Button"
],

function(
  declare,
  lang,
  Deferred,
  when,
  aspect,
  
  Dialog,
  _Widget, 
  _TemplatedMixin, 
  _WidgetsInTemplateMixin, 
  
  i18n,
  template,
  
  _Form
)
{
return declare("app.ui._Dialog", Dialog, {
  
  i18n: i18n,
  
  constructor: function(/*Object*/ kwArgs) {
    this.title = "Abstract Dialog";
    this.form = null;
    this.identity = null;
    this.store = null;
    
    lang.mixin(this, kwArgs);
    
    var content = new (declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin], {
      templateString: template,
      i18n: i18n
    }));
    content.startup();
    this.content = content;
  },
  
  postCreate: function() {
    this.defaultTitle = this.title;

    this.submitButton = this.content._submitButton;
    this.cancelButton = this.content._cancelButton;
    
    if(this.form instanceof _Form) {
      this.form.startup();
      this.content.contentNode.appendChild(this.form.domNode);
      this.connect(this.form, "onValidStateChange", function(state) {
        this.submitButton.set("disabled", !state);
      });
      this.connect(this.form, "onBusyStateChange", function(isBusy) {
        if (isBusy) {
          this.defaultTitle = this.title;
          this.set("title", i18n.state.working);
          this.submitButton.set("disabled", true);
        } else {
          this.set("title", this.defaultTitle);
          this.submitButton.set("disabled", false);
        }
      });
    }
    
    if (null != this.identity) {
      this.form.load(this.store.get(this.identity));
    }
    
    this.submitButton.set("disabled", !this.form.isValid());
    this.connect(this.cancelButton, "onClick", "_onCancel");
    aspect.after(this, "show", lang.hitch(this.form, "onShow"));
    this.inherited(arguments);
  },
  
  _onSubmit: function() {
    // cannot call onExecute, because I cannot disconnect it from clossing dialog
    // this.onExecute(); 
    this.execute(this.form.serialize());
  },
  
  _onCancel: function() {
    this.onCancel();
  },
  
  execute: function(data) {
    var options = {};
    if (null != this.identity) {
      data.id = this.identity;
      options.id = this.identity;
    }
    
    this.submitButton.set("label", i18n.state.saving);
    this.submitButton.set("disabled", true);

    when(this.store.put(data, options), lang.hitch(this, function() {
      this.submitButton.set("label", i18n.dialog.submit);
      this.submitButton.set("disabled", false);
      this.hide();

      if (this.identity === null) {
        this.store.notify(data);
      } else {
        this.store.notify(data, this.identity);
      }

      //this.store.notify(data, this.identity === null ? undefined : data.id);
    }));
  }
  
});
}
);