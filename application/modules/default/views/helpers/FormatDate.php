<?php

class Zend_View_Helper_FormatDate {
  
  
  public function formatDate($dateString, $language = 'cs') {
    $format = '%d. %B %Y';
    $locale = 'Czech';

    if($language == Common_Enum_Language::ENGLISH) {
      $format = '%B %d, %Y';
      $locale = 'English';
    }
    
    setlocale(LC_TIME, $locale);
    return iconv('iso8859-2', 'utf-8', 
            strftime($format, $this->parseDate($dateString)));
  }
  
  private function parseDate($dateString) {
    $dateArray = date_parse($dateString);
    return mktime(
            $dateArray['hour'],
            $dateArray['minute'],
            $dateArray['second'],
            $dateArray['month'],
            $dateArray['day'],
            $dateArray['year']
    );
  }
  
}
