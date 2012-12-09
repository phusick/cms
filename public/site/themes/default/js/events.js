dojo.require("dojo.fx");

dojo.ready(function() {
  
  var Animation = {
    
    DURATION: 350,
    DELAY: 0,
    
    create: function(node, properties, duration, delay) {
      return dojo.animateProperty({
        node: node,
        delay: delay || this.DELAY,
        duration: duration || this.DURATION,
        properties: properties
      });
    }
  };
  
  
  var EventWidget = dojo.declare(null, {
    
    constructor: function(domNode) {
      this.domNode = domNode;
      this.isOpen = false;
      this.inProgress = false;
    },
    
    init: function() {
      this.initComponents();
      this.initConnections();
      this.initAnimations();
    },
    
    initComponents: function() {
      this.expandoNode = this.getNode("expando");
      this.contentNode = this.getNode("content");
      
      this.titleNode = this.getNode("title");
      this.durationNode = this.getNode("duration");
      this.locationNode = this.getNode("location");
      this.fileCountNode = this.getNode("file-count");
      this.lineNode = this.getNode("line");
      this.descriptionNode = this.getNode("description");
      this.detailsNode = this.getNode("details");
      this.calendarNode = this.getNode("calendar-overlay");
      
      var endDateNode = this.getNode("date-end");
      var timeNode = this.getNode("time");
      this.hasDuration2ndLine = !(endDateNode == null && timeNode == null);
      
      this.coords = {
          content: this._coords(this.contentNode),
          title: this._coords(this.titleNode),
          duration: this._coords(this.durationNode),
          location: this._coords(this.locationNode),
          fileCount: this._coords(this.fileCountNode),
          line: this._coords(this.lineNode),
          description: this._coords(this.descriptionNode),
          details: this._coords(this.detailsNode)
      };
      
      this.coords.duration.offsetTop = -8;
      this.coords.title.offsetTop = -6;
    },
    
    initConnections: function() {
      if(this.locationNode || this.fileCountNode || this.descriptionNode) {
        dojo.connect(this.domNode, "onmouseenter", this, function() {
          dojo.style(this.expandoNode, "display", "block");
        });
        dojo.connect(this.domNode, "onmouseleave", this, function() {
          dojo.style(this.expandoNode, "display", "none");
        });

        dojo.connect(this.expandoNode, "onclick", this, "toggle");
        dojo.connect(this.calendarNode, "onclick", this, "toggle");
      }
    },
    
    initAnimations: function() {
      this.openAnimation = this.createOpenAnimation();
      this.closeAnimation = this.createCloseAnimation();
    },
    
    toggle: function() {
      if(this.isOpen) {
        this.close();
        return;
      }
      this.open();
    },
    
    open: function() {
      if(this.isOpen) return;
      this._execute(this.openAnimation);
    },
    
    close: function() {
      if(!this.isOpen) return;
      this._execute(this.closeAnimation);      
    },
    
    _execute: function(animation) {
      if(this.inProgress) return;
      animation.play();
    },
    
    createOpenAnimation: function() {
      var a = [];
      var c = this.coords;
      
      a.push(Animation.create(this.contentNode, {
        height: {end: c.details.t + c.details.h, unit: "px"}
      }));
      
      var topOffset = 0;
      if(this.hasDuration2ndLine && this.locationNode) {
        topOffset = c.duration.offsetTop;
        a.push(Animation.create(this.titleNode, {
          top: {end: c.title.t + c.title.offsetTop, unit: "px"}
        }));
        a.push(Animation.create(this.durationNode, {
          top: {end: c.duration.t + topOffset, unit: "px"}
        }));
      }
      
      if(this.locationNode) {
        a.push(Animation.create(this.locationNode, {
          left: {end: c.duration.l, unit: "px"},
          top: {end: c.duration.t + topOffset + c.duration.h, unit: "px"},
          width: {end: c.duration.w, unit: "px"}
        }));
      }
      
      if(this.fileCountNode) {
        a.push(Animation.create(this.fileCountNode, {
          top: {end: c.details.t + c.details.h, unit: "px"},
          left: {end: 10, unit: "px"},
          opacity: {end: 0}
        }));
      }
      
      a.push(Animation.create(this.lineNode, {
        left: {end: c.duration.l, unit: "px"},
        opacity: {start: 0, end: 1}
      }));
      
      a.push(Animation.create(this.detailsNode, {
        top: {start: c.details.t + c.details.h, end: c.details.t, unit: "px"},
        opacity: {start: 0, end: 1}
      }));
      
      return this._combineAnimations(a);
    },
    
    createCloseAnimation: function() {
      var a = [];
      var c = this.coords;
      
      a.push(Animation.create(this.contentNode, {
        height: {end: c.content.h, unit: "px"}
      }));
      
      if(this.hasDuration2ndLine && this.locationNode) {
        a.push(Animation.create(this.titleNode, {
          top: {end: c.title.t, unit: "px"}
        }));
        a.push(Animation.create(this.durationNode, {
          top: {end: c.duration.t, unit: "px"}
        }));
      }
      
      if(this.locationNode) {
        a.push(Animation.create(this.locationNode, {
          left: {end: c.location.l, unit: "px"},
          top: {end: c.location.t, unit: "px"},
          width: {end: 0, unit: "px"}
        }));
      }
      
      if(this.fileCountNode) {
        a.push(Animation.create(this.fileCountNode, {
          top: {end: c.fileCount.t, unit: "px"},
          left: {end: c.fileCount.l, unit: "px"},
          opacity: {end: 1}
        }));
      }
      
      a.push(Animation.create(this.lineNode, {
        left: {end: c.line.l, unit: "px"},
        opacity: {start: 1, end: 0}
      }));

      a.push(Animation.create(this.detailsNode, {
        top: {end: c.details.t + c.details.h, unit: "px"},
        opacity: {end: 0}
      }));
      
      return this._combineAnimations(a);
    },
    
    _combineAnimations: function(/*Array*/ animations) {
      var animation = dojo.fx.combine(animations);
      animation.beforeBegin = dojo.hitch(this, "_beforeBegin");
      animation.onEnd = dojo.hitch(this, "_onEnd");
      return animation;
    },
    
    _beforeBegin: function() {
      this.inProgress = true;
    },
    
    _onEnd: function() {
      this.inProgress = false;
      this.isOpen = !this.isOpen;
      dojo.toggleClass(this.domNode, "open");
    },
    
    _coords: function(node) {
      if (null == node) return null;
      return dojo.coords(node);
    },
    
    getNode: function(cssClass) {
      return dojo.query("." + cssClass, this.domNode)[0] || null;
    }
    
  });
  
// -----------------------

  dojo.query("li.event-widget", dojo.byId("events")).forEach(function(node) {
    
    (new EventWidget(node).init());
    
  });
  
});