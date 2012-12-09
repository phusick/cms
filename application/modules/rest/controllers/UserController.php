<?php

class Rest_UserController extends Phusick_Controller_Rest {
   
  protected function getModel() {
    if(is_null($this->_model)) {
      $this->_model = new Rest_Model_User();
    }
    return $this->_model;
  }
  
}