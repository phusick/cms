<?php

class Rest_FolderController extends Phusick_Controller_Rest {
   
  protected function getModel() {
    if(is_null($this->_model)) {
      $this->_model = new Rest_Model_Folder();
    }
    return $this->_model; 
  }
  
}