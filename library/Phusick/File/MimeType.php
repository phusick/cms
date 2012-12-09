<?php

class Phusick_File_MimeType {

  private static $_types;

  public static function detect($filename) {

    if (is_null(self::$_types)) {
      self::$_types = include_once 'mime-types.php';
    }

    $tmp = explode('.', $filename);
    $ext = strtolower(array_pop($tmp));
    if (array_key_exists($ext, self::$_types)) {
      return self::$_types[$ext];
    }
    return 'application/octet-stream';
  }

}