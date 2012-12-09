<?php

class Zend_View_Helper_FormatMonth {
  
  const FORMAT = '%B';
  
  public function formatMonth($month, $language = 'cs') {
    $locale = ($language == Common_Enum_Language::CZECH) ? 'Czech' : 'English';
    $date = mktime(0, 0, 0, $month, 1);
    
    setlocale(LC_TIME, $locale);
    return iconv('iso8859-2', 'utf-8', strftime(self::FORMAT, $date));
  }
  
}