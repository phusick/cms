<?php

class Zend_View_Helper_EventWidget {
  
  private $dateFormats = array(
      'cs' => array(
          'date' => '%d. %B %Y',
          'time' => '%H:%M'
      ),
      'en' => array(
          'date' => '%B %d, %Y',
          'time' => '%I:%M %p'
      ),
      'vevent' => array(
          'date' => '%Y-%m-%d',
          'time' => '%H:%M:%S'
      )
  );
  
  public function __construct() {
    $this->language = Zend_Registry::get('Zend_Locale')->getLanguage();
  }
  
  public function eventWidget($eventInfo) {
    $view = new Zend_View();
    $view->setBasePath(APPLICATION_PATH . '/modules/default/views');
    
    $startTime = strtotime($eventInfo['date_start']);
    $endTime = strtotime($eventInfo['date_end']);
    $allDay = !!$eventInfo['data']['all_day'];
    
    $dateFormat = $this->dateFormats[$this->language]['date'];
    $timeFormat = $this->dateFormats[$this->language]['time'];
      
    $view->title = $eventInfo['title'];
    $view->calendarDay = $this->formatDate($startTime, '%#d');
    $view->calendarMonth = mb_substr($this->formatDate($startTime, '%B'), 0, 3, 'utf-8');
    
    $view->startDate = $this->formatDate($startTime, $dateFormat);
    $view->startTime = $this->formatDate($startTime, $timeFormat);
    
    $view->endDate = $this->formatDate($endTime, $dateFormat);
    $view->endTime = $this->formatDate($endTime, $timeFormat);
    
    $view->isAllDay = $allDay;
    $view->isTheSameDay = $this->isTheSameDay($startTime, $endTime);
    
    $view->location = $eventInfo['data']['place'];
    $view->separator = ' ▪ ';
    
    $view->fileCount = count($eventInfo['files']);
    $view->files = $eventInfo['files'];
    $view->description = $eventInfo['content'];
    
    $veventFormat = $this->dateFormats['vevent']['date'];
    if ($allDay) {
      $veventStart = $this->formatDate($startTime, $this->dateFormats['vevent']['date']);
      if ($endTime) {
        $veventEnd = $this->formatDate($endTime, $this->dateFormats['vevent']['date']);
      } else {
        $veventEnd = $veventStart;
      }
    } else {
      $veventStart = date('c', $startTime);
      if ($endTime) {
        $veventEnd = date('c', $endTime);
      } else {
        $veventEnd = $veventStart;
      }
    }
    
    
    
    $view->veventStart = $veventStart;
    $view->veventEnd = $veventEnd;
    
    
    
    
    
    return $view->render('helpers/event-widget.phtml');
  }
  
  private function isTheSameDay($date1, $date2) {
    $date1 = date('Y-m-d', $date1);
    $date2 = date('Y-m-d', $date2);
    return $date1 == $date2;
  }
  
  protected function formatDate($time, $format) {
    if ($time === false) return false;
    
    setlocale(LC_TIME, $this->language == 'cs' ? 'Czech' : 'English');
    return iconv('iso8859-2', 'utf-8', strftime($format, $time));
  }
  
}