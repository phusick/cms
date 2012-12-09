define([
  "dojo/_base/declare",
  
  "./_Dialog",
  
  "app/util/date/stamp",
  "app/ui/form/PageForm",
  
  "dojo/i18n!app/nls/main"
],

function(
  declare,
  _Dialog,
  
  stamp,
  Form,
  
  i18n
)
{
return declare(_Dialog, {
  
  constructor: function(props) {
    var action = this.identity == null ? i18n.action.create : i18n.action.update;
    this.title = action + ": " + i18n.item.post;
    
    props.entityType = "post";

    this.form = new Form(props);
  }
  
});
}
);
