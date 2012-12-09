<?php

class Default_AdminController extends Zend_Controller_Action {
  
  public function indexAction() {
    $this->_helper->layout->disableLayout();
  }
  
  public function develAction() {
    $this->_helper->layout->disableLayout();
  }
  
  public function browserAction() {
  }

}

