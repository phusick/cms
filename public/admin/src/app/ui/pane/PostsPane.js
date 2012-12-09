define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  
  "./_GridPane",
  "app/ui/dialog/PostDialog",
  
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

  caption: i18n.title.posts,
  iconClass: "paneIconPosts",
  
  dialogClass: Dialog,
  
  constructor: function() {
    this.storeTarget = "/rest/post/";
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
        label: i18n.form.title
      },
      {
        id: "date",
        label: i18n.form.created,
        field: "date_created",
        formatter: columnFormatter.date
      },
      {
        id: "language",
        field: "language",
        formatter: columnFormatter.language,
        renderHeaderCell: lang.partial(headerFormatter.iconClass,
            "localeIconHeader",
            i18n.form.language
        )            
      }
    ];
  },
  
  initComponents: function() {
    this.widget.deleteButton.domNode.style.display = "none";
  }
  
})
});