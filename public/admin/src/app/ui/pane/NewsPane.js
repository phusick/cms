define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  
  "./_GridPane",
  "app/ui/dialog/NewsDialog",
  
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

  caption: i18n.title.news,
  iconClass: "paneIconNews",
  
  dialogClass: Dialog,
  
  constructor: function() {
    this.storeTarget = "/rest/announcement/";
    this.gridColumns = [
      {
        id: "publish",
        field: "publish",
        label: "publish",
        formatter: columnFormatter.publish,
        renderHeaderCell: lang.partial(headerFormatter.publish, i18n.form.publish)
      },
      {
        id: "date",
        label: i18n.form.date,
        field: "date_start",
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
      },
      {
        id: "content",
        field: "content",
        label: i18n.form.content
      }
    ];
  }
  
})
});