<?php

class Rest_Plugin_NoRendererPlugin extends Zend_Controller_Plugin_Abstract {
  
  public function preDispatch(Zend_Controller_Request_Abstract $request) {
    if($request->getModuleName() == 'rest') {
      $this->disableLayout();
      $this->disableViewRenderer();
    }
  }
  
  private  function disableLayout() {
    Zend_Layout::getMvcInstance()->disableLayout();
  }
  
  private function disableViewRenderer() {
    Zend_Controller_Front::getInstance()->setParam('noViewRenderer', true);
  }
  
}