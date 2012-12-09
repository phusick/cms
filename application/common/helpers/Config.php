<?php

class Common_Helper_Config extends Zend_Controller_Action_Helper_Abstract {
  
  public function direct($key) {
    
    $keys = explode('.', $key);
    $config = Zend_Registry::get('config');
    
    foreach($keys as $key) {
      if(!isset($config[$key])) return null;
      $config = $config[$key];
    }
    
    return $config;
  }
}