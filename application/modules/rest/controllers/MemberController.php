<?php

class Rest_MemberController extends Phusick_Controller_Rest {
   
  protected function getModel() {
    if(is_null($this->_model)) {
      $this->_model = new Rest_Model_Member();
    }
    return $this->_model;
  }
  
}