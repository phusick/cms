define([
  "require",
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/date/locale",
  
  "app/util/date/stamp"
],

function(
  require,
  declare,
  lang,
  locale,
  
  stamp
)
{
  
  var formatter = declare(null, {});
  
  formatter.publish = function(bool) {
    var cssClass = !!bool ? "publishIconTrue" : "publishIconFalse";
    var out = '<div class="icon16 ' + cssClass + '"></div>';
    return out;
  }
  
  formatter.date = function(dateString) {
    var date = stamp.fromSQLString(dateString);
    var out = locale.format(date, {
      formatLength: "medium",
      selector: "date"
    });
    return out;
  }
  
  formatter.dateTime = function(dateString, isAllDay) {
    var date = stamp.fromSQLString(dateString);
    if(!(date instanceof Date)) { return ""; }
    
    var out = locale.format(date, {
      formatLength: "short",
      selector: !!isAllDay ? "date" : "datetime"
    });
    
    return out;
  }
  
  formatter.language = function(language) {
    var out = '<div class="iconFlag localeIcon-' + language + '"></div>';
    return out;
  }

  formatter.mime = function(mimeType) {
    var out = [
      '<img src="',
      require.toUrl("app"),
      "/resources/icons-mime/",
      mimeType,
      '-16.png" class="icon16">'
    ].join("");

    return out;
  }
  
  
  return formatter;
  
});  