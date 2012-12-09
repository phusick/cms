<?php

class Rest_Bootstrap extends Zend_Application_Module_Bootstrap {
 
  protected function _initRoute() {
    $application = $this->getApplication();
    $application->bootstrap('frontController');
    $frontController = $application->getResource('frontController');
    
    $restRoute = new Zend_Rest_Route($frontController, array(), array('rest'));
    $frontController->getRouter()->addRoute('rest', $restRoute);    
  }
  
  protected function _initPlugins() {
    $application = $this->getApplication();
    $application->bootstrap('frontController');
    $frontController = $application->getResource('frontController');
    
    $plugins = array(
        new Rest_Plugin_NoRendererPlugin(),
        new Rest_Plugin_JsonRestPlugin()
    );
    
    foreach($plugins as $plugin) {
      $frontController->registerPlugin($plugin);
    }
  }
  
}