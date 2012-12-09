<?php

class Default_Bootstrap extends Zend_Application_Module_Bootstrap {

  protected function _initViewHelpers() {
    $application = $this->getApplication();
    $application->bootstrap('layout');
    $layout = $application->getResource('layout');
    $view = $layout->getView();
    
    $view->doctype('HTML5');
    $view->headMeta()->appendHttpEquiv('Content-type', 'text/html;charset=utf-8');
    
    $view->headTitle()->setSeparator(' - ');
    $view->headTitle('CMS'); 
  }
  
  protected function _initStylesheets() {
    $application = $this->getApplication();
    $application->bootstrap('layout');
    $layout = $application->getResource('layout');
    $view = $layout->getView();

    $view->headLink()
        ->appendStylesheet('http://fonts.googleapis.com/css?family=Open+Sans:400,300,600&subset=latin,latin-ext')
        ->appendStylesheet('/site/themes/default/animate-custom.css')
        ->appendStylesheet('/site/themes/default/style.css')
        ->appendStylesheet('/site/themes/default/style-ie7.css', 'screen', 'IE 7')
        ->appendStylesheet('/site/themes/default/style-ie8.css', 'screen', 'IE 8')
        ;
  }
  
  protected function _initHeadScripts() {
    $application = $this->getApplication();
    $application->bootstrap('layout');
    $layout = $application->getResource('layout');
    $view = $layout->getView();
    
    $view->headScript()->appendFile(
            'http://ajax.googleapis.com/ajax/libs/dojo/1.7.1/dojo/dojo.js',
            'text/javascript'
            );
  }
}