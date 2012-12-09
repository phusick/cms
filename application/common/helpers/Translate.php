<?php

class Common_Helper_Translate extends Zend_Controller_Action_Helper_Abstract {
  
  public function direct($keyToTranslate) {
    $translator = Zend_Registry::get('Zend_Translate');
    return $translator->_($keyToTranslate);
  }
  
}