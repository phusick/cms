<?php

class Rest_PostController extends Phusick_Controller_Rest {
   
  public function indexAction() {
    $model = $this->getModel();
    $params = array();
    if(!is_null($this->_getParam('language'))) {
      $params['language'] = $this->_getParam('language');
    }
    
    $items = $model->index($this->_getParam('sort'), $params);
    
    $this->getResponse()
            ->setHeader('Content-Range', $this->getRange($items))
            ->setHttpResponseCode(200)
            ->setBody($items)
            ;
    // TODO: handle crud rest index error
  }  
  
  protected function getModel() {
    if(is_null($this->_model)) {
      $this->_model = new Rest_Model_Post();
    }
    return $this->_model;
  }
  
}