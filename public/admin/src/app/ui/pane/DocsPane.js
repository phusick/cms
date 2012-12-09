define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/_base/Deferred",
  "dojo/dom",
  "dojo/query",
  "dojo/aspect",
  "dojo/date/locale",
  "dojo/string",
  
  "./_Pane",
  
  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/DocsPane.html",
  
  "dojo/store/Memory",
  "dojo/store/JsonRest",
  "dojo/store/Observable",
  
  "app/grid/Grid",
  
  "app/ui/dialog/FileDialog",
  "app/ui/dialog/FolderDialog",
  "app/util/formatter",
  "app/util/grid/column-formatter",
  "app/util/grid/header-formatter",
  "app/util/date/stamp",

  // template dependencies
  "dijit/Toolbar",
  "dijit/ToolbarSeparator"
],
function(
  declare, 
  lang,
  array,
  Deferred,
  dom,
  query,
  aspect,
  locale,
  string,
  
  _Pane,

  i18n,
  template,
  
  Memory,
  JsonRest,
  Observable,
  
  Grid,
  
  FileDialog,
  FolderDialog,
  formatter,
  columnFormatter,
  headerFormatter,
  stamp
)
{
return declare(_Pane, {
      
  contentTemplate: template,
  caption: i18n.title.docs,
  iconClass: "paneIconDocs",
  
  constructor: function() {
    this.isFileGridStarted = false;
  },
  
  initComponents: function() {
    var folderStore = new JsonRest({
      target: "/rest/folder/",
      idProperty: "id",
      sortParam: "sort"
    });
    this.folderStore = Observable(folderStore);
    
    var fileStore = new JsonRest({
      target: "/rest/file/",
      idProperty: "id",
      sortParam: "sort"
    });
    this.fileStore = Observable(fileStore);

    this.initFolderGrid();
    this.initFileGrid();
  },
  
  initConnections: function() {
    var w = this.widget;
    this.connect(w.createFolderButton, "onClick", "_onFolderCreate");
    this.connect(w.updateFolderButton, "onClick", "_onFolderUpdate");
    this.connect(w.deleteFolderButton, "onClick", "_onFolderDelete");
    this.connect(w.refreshFolderButton, "onClick", "_onFolderRefresh");
    
    this.connect(w.createFileButton, "onClick", "_onFileCreate");
    this.connect(w.updateFileButton, "onClick", "_onFileUpdate");
    this.connect(w.deleteFileButton, "onClick", "_onFileDelete");
    this.connect(w.refreshFileButton, "onClick", "_onFileRefresh");
    
    this.connect(this.folderGrid, "onRefreshSuccess", function(results) {
      this.folderGrid.selectIndex(0);
    });
    
    this.folderGrid.on("dgrid-select", lang.hitch(this, "_onFolderSelect"));
    this.folderGrid.on("dblclick", lang.hitch(this, "_onFolderUpdate"));
    this.fileGrid.on("dblclick", lang.hitch(this, "_onFileUpdate"));
    
    this.connect(this.folderGrid, "select", "_updateToolbars");
    this.connect(this.folderGrid, "refresh", "_updateToolbars");
    this.connect(this.fileGrid, "select", "_updateToolbars");
    this.connect(this.fileGrid, "refresh", "_updateToolbars");

  },
  
  initFolderGrid: function() {
    this.folderGrid = new Grid({
      store: this.folderStore,
      columns: [
        {
          id: "publish",
          field: "publish",
          label: "publish",
          formatter: columnFormatter.publish,
          renderHeaderCell: lang.partial(headerFormatter.publish, i18n.form.publish)
        },
        {
          id: "title",
          label: i18n.item.folder,
          field: "title"
        },
        {
          id: "count",
          field: "count",
          sortable: false,
          renderHeaderCell: lang.partial(
              headerFormatter.iconClass,
              "attachmentIconHeader",
              i18n.form.count
            )
        }
      ]
    }, this.node.folderGridNode);
    
    this.folderGrid.set("sort", "title");
  },
  
  initFileGrid: function() {
    this.fileGrid = new Grid({
      store: this.fileStore,
      sortOrder: [{attribute: "title", descending: false}],
      columns: [
        {
          id: "publish",
          field: "publish",
          label: "publish",
          formatter: columnFormatter.publish,
          renderHeaderCell: lang.partial(headerFormatter.publish, i18n.form.publish)
        },
        {
          id: "title",
          label: i18n.item.file,
          field: "title"
        },
        {
          id: "icon",
          label: " ",
          sortable: false,
          formatter: function(item) {
            return columnFormatter.mime(item.mimeicon);
          }
        },
        {
          id: "date_created",
          field: "date_created",
          className: "column-date",
          label: i18n.form.created,
          formatter: columnFormatter.date
        },
        {
          id: "filesize",
          label: i18n.form.filesize,
          get: function(item) {
            return formatter.filesize(item.data.filesize);
          }
          
        }
      ]
    }, this.node.fileGridNode);
  },
  
  _onFolderSelect: function(event) {
    var id = this.folderGrid.getSelectedId();
    this.fileGrid.query = { parent_id: id };
    if(this.isFileGridStarted == false) {
      this.fileGrid.startup();
      this.isFileGridStarted = true;
      return;
    }
    this.fileGrid.refresh();
  },
  
  _onFolderCreate: function() {
    var dialog = this._createFolderDialog();
    dialog.show();
  },
  
  _onFolderUpdate: function() {
    var id = this.folderGrid.getSelectedId();
    if (id != null) {
      var dialog = this._createFolderDialog({identity: id});
      dialog.show();
    }
  },
  
  _onFolderDelete: function() {
    var id = this.folderGrid.getSelectedId();
    
    var folder = this.folderGrid.row(id).data;
    var confirmMsg = string.substitute(i18n.msgbox.deleteEmptyFolder, [folder.title])
    if (folder.count > 0) {
      confirmMsg = string.substitute(i18n.msgbox.deleteFolder, [folder.title]);
    } 

    if(id && confirm(confirmMsg)) {
      Deferred.when(this.folderStore.remove(id), lang.hitch(this, function() {
//        this.folderStore.notify(undefined, id);
        this.folderGrid.selectIndex(0);
      }));
    }
  },
  
  _onFolderRefresh: function() {
    this.folderGrid.refresh();
  },
  
  _onFileCreate: function() {
    var parentId = this.folderGrid.getSelectedId();
    
    if (parentId != null) {
      var dialog = this._createFileDialog({parentId: parentId});
      dialog.show();
    }
  },
  
  _onFileUpdate: function(event) {
    var id = this.fileGrid.getSelectedId();
    if (id != null) {
      var dialog = this._createFileDialog({identity: id});
      dialog.show();
    }
  },
  
  _onFileDelete: function() {
    var id = this.fileGrid.getSelectedId();
    var file = this.fileGrid.row(id).data;
    
    var confirmMsg = string.substitute(i18n.msgbox.deleteFile, [file.title]);
    if(id && confirm(confirmMsg)) {
      this.fileStore.remove(id);
    }
  },
  
  _onFileRefresh: function() {
    this.fileGrid.refresh();
  },
  
  _createFolderDialog: function(props) {
    props = props || {};
    props.store = this.folderStore;
    var dialog = new FolderDialog(props);
    dialog.startup();
    var signal = aspect.after(dialog, "onHide", function() {
      signal.remove();
      dialog.destroyRecursive();
    });
    return dialog;    
  },
  
  _createFileDialog: function(props) {
    props = props || {};
    props.store = this.fileStore;
    var dialog = new FileDialog(props);
    dialog.startup();
    var signal = aspect.after(dialog, "onHide", function() {
      signal.remove();
      dialog.destroyRecursive();
    });
    return dialog;
  },
  
  _updateToolbars: function() {
    var w = this.widget;
    
    var isFolderSelected = !(this.folderGrid.getSelectedId() == null);
    var isFileSelected = !(this.fileGrid.getSelectedId() == null);
      
    array.forEach([
        w.updateFolderButton,
        w.deleteFolderButton,
        w.createFileButton,
        w.updateFileButton,
        w.deleteFileButton
      ],
      function(widget) {
        widget.set("disabled", !isFolderSelected);
      }
    );
      
    array.forEach([
        w.updateFileButton,
        w.deleteFileButton
      ],
      function(widget) {
        widget.set("disabled", !isFileSelected);
      }
    );
  }
        
})
});
