define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/array",
  "dojo/query",
  "dojo/aspect",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dijit/registry",
  
  "app/ui/pane/PostsPane",
  "app/ui/pane/PagesPane",
  "app/ui/pane/NewsPane",
  "app/ui/pane/MembersPane",
  "app/ui/pane/DocsPane",
  "app/ui/pane/EventsPane",
  "app/ui/pane/UsersPane",
  "app/ui/pane/SettingsPane",
  "app/ui/pane/LogsPane",
  
  "dojo/i18n!app/nls/main",
  "dojo/text!./ui/templates/EntryPoint.html",
  
  "app/widget/SidebarItem",
  "app/action/GearMenu",
  
  "dojo/has",
  "dojo/_base/sniff",
  
  "dijit/layout/BorderContainer",
  "dijit/layout/StackContainer",
  "dijit/layout/ContentPane",
  "dijit/form/DropDownButton",
  "dijit/Menu",
  "dijit/MenuItem"
  
],
  function(
      declare,
      lang,
      array,
      query,
      aspect,
      _WidgetBase,
      _TemplatedMixin,
      _WidgetsInTemplateMixin,
      registry,
      
      PostsPane,
      PagesPane,
      NewsPane,
      MembersPane,
      DocsPane,
      EventsPane,
      UsersPane,
      SettingsPane,
      LogsPane,
      
      i18n,
      template,
      
      SidebarItem,
      GearMenu,
      
      has
  ) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      
      templateString: template,
      i18n: i18n,
      
      constructor: function() {
        this.paneIds = ["posts", "pages", "news", "members", "docs", "events",
            "users", "settings", "logs"];
        array.forEach(this.paneIds, function(id) {
          this[this.getPaneName(id)] = null;
        }, this);
      },
      
      postCreate: function() {
        this.initComponents();
        this.initConnections();
      this.selectPane("docs");
      },
      
      initComponents: function() {
        var self = this;
        query("div[data-dojo-widget-type=SidebarItem]",
            this.sidebarPane.domNode).forEach(
          function(domNode) {
            var widget = registry.getEnclosingWidget(domNode);
            var pane = widget.pane;
            self[pane + "Item"] = widget;
            
            aspect.after(widget, "onClick",
                lang.hitch(self, "sidebarItem_onClick", pane), true);
          }
        );
          
        var gearMenu = new GearMenu(this.gearMenuWidget);
      },
      
      initConnections: function() {
        this.connect(this.logoutButton, "onClick", "logout");
      },
      
      selectPane: function(id) {
        var item = this[id + "Item"];
        var pane = this.getPane(id);
        if(item instanceof SidebarItem && pane instanceof _WidgetBase) {
          item.set("checked", true);

          if(this.stackContainer.selectedChildWidget) {
            this.stackContainer.selectChild(pane, false);
          }
        } else {
          console.warn("[" + id + "Item or " + id + "Pane] does not exist.");
        }
      },
      
      getPane: function(id) {
        var name = this.getPaneName(id);
        if(null === this[name]) {
          this[name] = this.createPane(id);
          this[name].startup();
          this.stackContainer.addChild(this[name]);
        }
        return this[name];
      },
      
      getPaneName: function(id) {
        return id + "Pane";
      },
      
      createPane: function(id) {
        var pane = null;
        switch(id) {
          case "posts":
            pane = new PostsPane();
            break;
          case "pages":
            pane = new PagesPane();
            break;
          case "news":
            pane = new NewsPane();
            break;
          case "members":
            pane = new MembersPane();
            break;
          case "docs":
            pane = new DocsPane();
            break;
          case "events":
            pane = new EventsPane();
            break;
          case "users":
            pane = new UsersPane();
            break;
          case "settings":
            pane = new SettingsPane();
            break;
          case "logs":
            pane = new LogsPane();
            break;
        }
        return pane;
      },
      
      sidebarItem_onClick: function(id) {
        this.selectPane(id);
      },
      
      logout: function() {
        window.location = "/auth/logout";
      }
      
    });
  }
);

