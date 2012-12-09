<?php

class Default_Plugin_LocalePlugin extends Zend_Controller_Plugin_Abstract {
  
  public function routeShutdown(Zend_Controller_Request_Abstract $request) {
    
    $lang = 'en';
    
    if($request->getParam('lang')) {
      $lang = $request->getParam('lang');
      $session = new Zend_Session_Namespace('session');
      $session->language = $lang;
      
      $redirector = Zend_Controller_Action_HelperBroker::getStaticHelper('redirector');
      $redirector->gotoUrl('/');
     
    } else {
      $session = new Zend_Session_Namespace('session');
      if(isset($session->language)) {
        $lang = $session->language;
      } else {
        $session->language = $lang;
      }
    }
    
    Zend_Registry::set('Zend_Locale', new Zend_Locale($lang));
    
    $langFile  = APPLICATION_PATH . '/configs/translations/';
    $langFile .= Zend_Registry::get('Zend_Locale')->getLanguage() . '.php';
    if(!is_readable($langFile)) {
      $langFile = APPLICATION_PATH . '/configs/translations/en.php';
    }
    Zend_Registry::set('Zend_Translate', new Zend_Translate('array', $langFile));
  }
  
}