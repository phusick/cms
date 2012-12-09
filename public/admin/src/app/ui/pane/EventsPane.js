define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/_base/Deferred",
  "dojo/aspect",
  "dojo/string",

  "./_Pane",
  
  "dojo/store/JsonRest",
  "dojo/store/Observable",
  "app/grid/Grid",
  
  "app/ui/dialog/EventDialog",
  "app/ui/dialog/FileDialog",

  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/EventsPane.html",
 
  "app/util/formatter",
  "app/util/grid/column-formatter",
  "app/util/grid/header-formatter"
],
function(
  declare, 
  lang,
  array,
  Deferred,
  aspect,
  string,
      
  _Pane,
  
  JsonRest,
  Observable,
  Grid,
  
  EventDialog,
  FileDialog,
      
  i18n,
  template,
  
  formatter,
  columnFormatter,
  headerFormatter
)
{
return declare(_Pane, {
  
  contentTemplate: template,
  caption: i18n.title.events,
  iconClass: "paneIconEvents",
  
  constructor: function() {
    this.isFileGridStarted = false;
  },
  
  initComponents: function() {
    var eventStore = new JsonRest({
      target: "/rest/event/",
      idProperty: "id",
      sortParam: "sort"
    });
    this.eventStore = Observable(eventStore);    
    
    var fileStore = new JsonRest({
      target: "/rest/file/",
      idProperty: "id",
      sortParam: "sort"
    });
    this.fileStore = Observable(fileStore);
    
    this.initEventGrid();
    this.initFileGrid();
  },
  
  initConnections: function() {
    var w = this.widget;
    this.connect(w.createEventButton, "onClick", "_onEventCreate");
    this.connect(w.updateEventButton, "onClick", "_onEventUpdate");
    this.eventGrid.on("dblclick", lang.hitch(this, "_onEventUpdate"));
    this.connect(w.deleteEventButton, "onClick", "_onEventDelete");
    this.connect(w.refreshEventButton, "onClick", "_onEventRefresh");
    
    this.connect(w.createFileButton, "onClick", "_onFileCreate");
    this.connect(w.updateFileButton, "onClick", "_onFileUpdate");
    this.fileGrid.on("dblclick", lang.hitch(this, "_onFileUpdate"));
    this.connect(w.deleteFileButton, "onClick", "_onFileDelete");
    this.connect(w.refreshFileButton, "onClick", "_onFileRefresh");
    
    this.connect(this.eventGrid, "onRefreshSuccess", function(results) {
      this.eventGrid.selectIndex(0);
    });
    
    this.eventGrid.on("dgrid-select", lang.hitch(this, "_onEventSelect"));
    
    this.connect(this.eventGrid, "select", "_updateToolbars");
    this.connect(this.eventGrid, "refresh", "_updateToolbars");
    this.connect(this.fileGrid, "select", "_updateToolbars");
    this.connect(this.fileGrid, "refresh", "_updateToolbars");    
  },
  
  initEventGrid: function() {
    this.eventGrid = new Grid({
      store: this.eventStore,
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
          label: i18n.item.event,
          field: "title"
        },
        {
          id: "date_start",
          label: i18n.form.startDate,
          className: "column-datetime",
          formatter: function(object) {
            var isAllDay = object.data.all_day;
            var dateString = object.date_start;
            return columnFormatter.dateTime(dateString, isAllDay);
          }
        },
        {
          id: "date_end",
          label: i18n.form.endDate,
          className: "column-datetime",
          formatter: function(object) {
            var isAllDay = object.data.all_day;
            var dateString = object.date_end;
            return columnFormatter.dateTime(dateString, isAllDay);
          }
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
    }, this.node.eventGrid);
    
    this.eventGrid.set("sort", "title");
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
          id: "filesize",
          label: i18n.form.filesize,
          get: function(item) {
            return formatter.filesize(item.data.filesize);
          }
          
        }
      ]
    }, this.node.fileGrid);
  },
  
  _onEventSelect: function(event) {
    var id = this.eventGrid.getSelectedId();
    this.fileGrid.query = { parent_id: id };
    if(this.isFileGridStarted == false) {
      this.fileGrid.startup();
      this.isFileGridStarted = true;
      return;
    }
    this.fileGrid.refresh();
  },
  
  _onEventCreate: function() {
    var dialog = this._createEventDialog();
    dialog.show();
  },
  
  _onEventUpdate: function() {
    var id = this.eventGrid.getSelectedId();
    if (id != null) {
      var dialog = this._createEventDialog({identity: id});
      dialog.show();
    }
  },
  
  _onEventDelete: function() {
    var id = this.eventGrid.getSelectedId();
    
    var event = this.eventGrid.row(id).data;
    var confirmMsg = string.substitute(i18n.msgbox.deleteEmptyEvent, [event.title])
    if (event.count > 0) {
      confirmMsg = string.substitute(i18n.msgbox.deleteEvent, [event.title]);
    } 

    if(id && confirm(confirmMsg)) {
      Deferred.when(this.eventStore.remove(id), lang.hitch(this, function() {
//        this.folderStore.notify(undefined, id);
        this.eventGrid.selectIndex(0);
      }));
    }
  },
  
  _onEventRefresh: function() {
    this.eventGrid.refresh();
  },
  
  _onFileRefresh: function() {
    this.fileGrid.refresh();
  },
  
  _onFileCreate: function() {
    var parentId = this.eventGrid.getSelectedId();
    
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
      this.fileGrid.clearSelection();
      this.fileStore.remove(id);
    }
  },
  
  _createEventDialog: function(props) {
    props = props || {};
    props.store = this.eventStore;
    var dialog = new EventDialog(props);
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
    
    var isEventSelected = !(this.eventGrid.getSelectedId() == null);
    var isFileSelected = !(this.fileGrid.getSelectedId() == null);
      
    array.forEach([
        w.updateEventButton,
        w.deleteEventButton,
        w.createFileButton,
        w.updateFileButton,
        w.deleteFileButton
      ],
      function(widget) {
        widget.set("disabled", !isEventSelected);
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
