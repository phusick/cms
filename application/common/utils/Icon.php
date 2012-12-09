<?php

class Common_Util_Icon {
  
  private static $_mimeIcons;
  
  public static function forMimeType($mimeType) {
    
    if (is_null(self::$_mimeIcons)) {
      self::$_mimeIcons = include_once 'mime-icons.php';
    }
    
    if (array_key_exists($mimeType, self::$_mimeIcons)) {
      return self::$_mimeIcons[$mimeType];
    }
    return 'unknown';    
    
  }
  
}