define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/_base/Deferred",
  "dojo/aspect",
  "dojo/dom-construct",
  "dojo/dom-class",

  "./_Form",
  "dijit/ProgressBar",

  "dojo/i18n!app/nls/main",
  "dojo/text!./templates/EventForm.html",
  
  "app/util/date/stamp",
  
  // template dependencies
  "dijit/form/CheckBox",
  "dijit/form/ValidationTextBox",
  "dijit/form/TextBox",
  "dijit/form/DateTextBox",
  "dijit/form/TimeTextBox",
  "dijit/form/Textarea"
],

function(
  declare,
  lang,
  Deferred,
  aspect,
  domConstruct,
  domClass,
  
  _Form, 
  ProgressBar,
  
  i18n,
  template,
  
  stamp
) 
{
return declare(_Form, {
  
  templateString: template,
  i18n: i18n,
  
  postCreate: function() {
    this.inherited(arguments);
    
    this.initComponents();
    this.initConnections();
  },
  
  initComponents: function() {

  },
  
  serialize: function() {
    var object = this.inherited(arguments);
    
    var startDate = this.startDateWidget.get("value");
    var endDate = this.endDateWidget.get("value");
    
    var isAllDay = !!object.all_day;
    if(!isAllDay) {
      var startTime = this.startTimeWidget.get("value");
      var endTime = this.endTimeWidget.get("value");
      
      startDate = stamp.concat(startDate, startTime);
      endDate = stamp.concat(endDate, endTime);
    }
    
    object.date_start = stamp.toSQLString(startDate);
    object.date_end = stamp.toSQLString(endDate);
    
    delete object.start_date;
    delete object.start_time;
    delete object.end_date;
    delete object.end_time;
    
    if(!lang.isObject(object.data)) { object.data = {}; }
    object.data.all_day = object.all_day;
    object.data.place = object.place;
    delete object.all_day;
    delete object.place;
    
    if(this.identity == null) { object.count = 0; }
    
    console.dir(object);
    
    return object;
  },
  
  deserialize: function(object) {
    if(this.identity == null) { return; }
    
    var data = object.data || false;
    var place = data.place || "";
    var isAllDay = !!data.all_day;
       
    this.allDayWidget.set("value", isAllDay);
    this.placeWidget.set("value", place);
    
    var startDate = stamp.fromSQLString(object.date_start);
    var endDate = stamp.fromSQLString(object.date_end);
    
    this.startDateWidget.set("value", startDate);
    this.endDateWidget.set("value", endDate);
    if(!isAllDay) {
      this.startTimeWidget.set("value", startDate);
      this.endTimeWidget.set("value", endDate);  
    }
  },
  
  initConnections: function() {
    this.connect(this.allDayWidget, "onChange", "allDay_onChange");
  },
  
  allDay_onChange: function() {
    this._setTimeAvailability(!this.allDayWidget.get("value"));
  },
  
  _setTimeAvailability: function(isAvailable) {
    isAvailable = !!isAvailable;
    
    this.startTimeWidget.set("disabled", !isAvailable);
    this.endTimeWidget.set("disabled", !isAvailable);
    
    var display = isAvailable ? "" : "none";
    this.startTimeWidget.domNode.style.display = display;
    this.endTimeWidget.domNode.style.display = display;    
  }
  
  
});
});