define([
  "dojo/_base/declare",
  "dojo/_base/lang"
],

function(
  declare,
  lang
)
{
  
  var formatter = declare(null, {});
  
  formatter.filesize = function(bytes) {
    return this.convertBytes(bytes).value;
  }
  
  formatter.convertBytes = function(bytes) {
    var kb = Math.round(bytes/1024*100000)/100000;
    var mb = Math.round(bytes/1048576*100000)/100000;
    var gb = Math.round(bytes/1073741824*100000)/100000;
    var value = bytes;
    if(kb>1) value = kb.toFixed(1) + " kB";
    if(mb>1) value = mb.toFixed(1) + " MB";
    if(gb>1) value = gb.toFixed(1) + " GB";
  
    if (value == bytes) {
      value += " B"; 
    }
    
    return {
            kb:kb,
            mb:mb,
            gb:gb,
            bytes:bytes + " B",
            value: value
    };
  }
  
  return formatter;
  
});