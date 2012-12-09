<?php

class Zend_View_Helper_FileWidget {

  public function fileWidget($fileInfo) {
    $view = new Zend_View();
    $view->setBasePath(APPLICATION_PATH . '/modules/default/views');
    $language = Zend_Registry::get('Zend_Locale')->getLanguage();

    $view->title = $fileInfo['title'];

    $view->filename = $fileInfo['data']['filename'];
    $view->icon = $fileInfo['icon'];
    $view->date = $view->getHelper('formatDate')->formatDate($fileInfo['date_created'], $language);
    $view->size = $fileInfo['data']['filesize'];
    $view->url = $view->url(array('uri' => $fileInfo['uri']), 'file');

    return $view->render('helpers/file-widget.phtml');
  }

  protected function getIconName($filetype) {
    switch ($filetype) {
      case 'application/vnd.ms-excel':
        $icon = 'spreadsheet';
        break;
      case 'application/pdf':
        $icon = 'pdf';
        break;
      default:
        $icon = 'unknown';
    }
    return $icon;
  }
  
}