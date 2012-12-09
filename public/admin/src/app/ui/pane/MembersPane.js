define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  
  "./_GridPane",
  "app/ui/dialog/MemberDialog",
  
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

  caption: i18n.title.members,
  iconClass: "paneIconMembers",
  
  dialogClass: Dialog,
  
  constructor: function() {
    this.storeTarget = "/rest/member/";
    this.gridColumns = [
      {
        id: "publish",
        field: "publish",
        label: "publish",
        formatter: columnFormatter.publish,
        renderHeaderCell: lang.partial(headerFormatter.publish, i18n.form.publish)
      },
      {
        id: "title",
        field: "title",
        label: i18n.form.fullName
      },
      {
        id: "order",
        field: "order",
        label: i18n.form.order
      }
    ];
  }
  
})
});