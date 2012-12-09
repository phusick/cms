define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  
  "./_GridPane",
  "app/ui/dialog/UserDialog",
  
  "dojo/i18n!app/nls/main",
  
  "app/util/grid/column-formatter",
  "app/util/grid/header-formatter"
],

function(
  declare,
  lang,
  
  _GridPane,
  Dialog,
  
  i18n,
  
  columnFormatter,
  headerFormatter
)
{
return declare(_GridPane, {

  caption: i18n.title.users,
  iconClass: "paneIconUsers",
  
  dialogClass: Dialog,
  
  constructor: function() {
    this.storeTarget = "/rest/user/";
    this.gridColumns = [
      {
        id: "active",
        field: "active",
        formatter: columnFormatter.publish,
        renderHeaderCell: lang.partial(
            headerFormatter.iconClass, "activeUserIconHeader", i18n.form.active)
      },
      {
        id: "username",
        field: "username",
        label: i18n.form.username
      },
      {
        id: "role",
        field: "role",
        label: i18n.form.role
      }

    ];
  },
  
  initComponents: function() {
    this.widget.deleteButton.domNode.style.display = "none";
  }
  
})
});