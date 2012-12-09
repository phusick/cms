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


  var FileWidget = dojo.declare(null, {
    
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
      this.containerNode = this.getNode("container");
      this.contentNode = this.getNode("content");
      this.iconNode = this.getNode("icon");
      this.titleNode = this.getNode("title");
      this.expandoNode = this.getNode("expando");
      this.infoNode = this.getNode("fileinfo");
      this.lineNode = this.getNode("line");
    },
    
    initConnections: function() {
      dojo.connect(this.containerNode, "onmouseenter", this, function() {
        dojo.style(this.expandoNode, "display", "block");
      });
      dojo.connect(this.containerNode, "onmouseleave", this, function() {
        dojo.style(this.expandoNode, "display", "none");
      });

      dojo.connect(this.expandoNode, "onclick", this, "toggle");
      dojo.connect(this.iconNode, "onclick", this, "toggle");
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
      a.push(Animation.create(this.contentNode, {
        height: {end: 76, unit: "px"}
      }));
      
      a.push(Animation.create(this.iconNode, {
        width: {end: 64, unit: "px"},
        height: {end: 64, unit: "px"}
      }));
      
      a.push(Animation.create(this.titleNode, {
        left: {end: 70, unit: "px"},
        fontSize: {end: 14, unit: "px"},
        width: {end: 246, unit: "px"}
      }));
      
      a.push(Animation.create(this.infoNode, {
        left: {end: 80, unit: "px"},
        opacity: {end: 1}
      }));
      
      a.push(Animation.create(this.lineNode, {
        top: {end: 29, unit: "px"}
      }));
      
      
      // combine
      var animation = dojo.fx.combine(a);
      animation.beforeBegin = dojo.hitch(this, "_beforeBegin");
      animation.onEnd = dojo.hitch(this, "_onEnd");  
      return animation;
    },
    
    createCloseAnimation: function() {
      var a = [];
      a.push(Animation.create(this.contentNode, {
        height: {end: 36, unit: "px"}
      }));
      
      a.push(Animation.create(this.iconNode, {
        width: {end: 24, unit: "px"},
        height: {end: 24, unit: "px"}
      }));
      
      a.push(Animation.create(this.titleNode, {
        left: {end: 32, unit: "px"},
        fontSize: {end: 12, unit: "px"},
        width: {end: 284, unit: "px"}
      }));
      
      a.push(Animation.create(this.infoNode, {
        left: {end: 225, unit: "px"},
        opacity: {end: 0}
      }));
      
      a.push(Animation.create(this.lineNode, {
        top: {end: 76, unit: "px"}
      }));
      
      // combine
      var animation = dojo.fx.combine(a);
      animation.beforeBegin = dojo.hitch(this, "_beforeBegin");
      animation.onEnd = dojo.hitch(this, "_onEnd");
      return animation;
    },
    
    _beforeBegin: function() {
      this.inProgress = true;
      if (!this.isOpen) {
        this.iconNode.src = this.iconNode.src.replace("-24.", "-64.");
        dojo.style(this.infoNode, "display", "block");
      }
    },
    
    _onEnd: function() {
      this.isOpen = !this.isOpen;
      this.inProgress = false;    
      dojo.toggleClass(this.domNode, "open");
      if (!this.isOpen) {
        this.iconNode.src = this.iconNode.src.replace("-64.", "-24.");
        dojo.style(this.infoNode, "display", "none");
      } 
    },
    
    getNode: function(cssClass) {
      return dojo.query("." + cssClass, this.domNode)[0] || null;
    } 
    
  });
  
// -----------------------
  
  dojo.query("li.file-widget", dojo.byId("files")).forEach(function(node) {
    
    (new FileWidget(node)).init();
    
  });  
  
});