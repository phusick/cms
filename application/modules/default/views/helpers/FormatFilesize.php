<?php

class Zend_View_Helper_FormatFilesize {
  
  public function formatFilesize($bytes = 0) {
    $s = array('bytes', 'kb', 'MB', 'GB', 'TB', 'PB');
    $e = floor(log($bytes) / log(1024));
    return sprintf('%.2f ' . $s[$e], ($bytes / pow(1024, floor($e))));
  }
  
}