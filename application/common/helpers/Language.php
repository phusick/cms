<?php

class Common_Helper_Language extends Zend_Controller_Action_Helper_Abstract {
  
  private $_session;
  
  public function direct() {
    $session = $this->getSession();
    return $session->language;
  }
  
  private function getSession() {
    if(null == $this->_session) {
      $this->_session = new Zend_Session_Namespace('session');
    }
    return $this->_session;
  }
  
}