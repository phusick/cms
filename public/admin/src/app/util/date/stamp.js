define([
  "dojo/_base/declare",
  "dojo/_base/lang"
],

function(
  declare,
  lang
)
{
  
  var stamp = declare(null, {});

  stamp.fromSQLString = function(/*String*/ formattedString) {
    formatterdString = lang.trim(formattedString);
    
    if(!lang.isString(formattedString)) { return null; }
    if(formattedString.length == 10) { formattedString += " 00:00:00"; }
    if(formattedString.length != 19) { return null; }
    
    var dateString = formattedString.substring(0, 10);
    var timeString = formattedString.substring(11, 19);
    
    var dateArray = dateString.split("-").concat(timeString.split(":"));
    for(var i = 0; i < dateArray.length; i++ ) {
      dateArray[i] = parseInt(dateArray[i], 10);
    }

    var d = dateArray;
    var date = new Date(d[0], (d[1] - 1), d[2], d[3], d[4], d[5]);
        
    return date;
  }
  
  stamp.toSQLString = function(/*Date*/ date, options) {
    options = options || {};
    
    if(!(date instanceof Date)) {
      return null;
    }

    if (options.selector != "time") {
      var dateString = [
        date.getFullYear(),
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      ].join("-");
    }

    if (options.selector != "time") {
      var timeString = [
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
      ].join(":");
    }
    
    if (options.selector == "date") { return dateString; }
    if (options.selector == "time") { return timeString; }
    return dateString + " " + timeString;
  }
  
  stamp.concat = function(date, time) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
    );
  }
  
  return stamp;
  
});