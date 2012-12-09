<?php

class Rest_EventController extends Phusick_Controller_Rest {
   
  protected function getModel() {
    if(is_null($this->_model)) {
      $this->_model = new Rest_Model_Event();
    }
    return $this->_model;
  }
  
}