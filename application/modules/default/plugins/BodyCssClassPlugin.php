<?php

class Default_Plugin_BodyCssClassPlugin extends Zend_Controller_Plugin_Abstract {

  public function dispatchLoopStartup(Zend_Controller_Request_Abstract $request) {
    $view = Zend_Layout::getMvcInstance()->getView();
    $view->placeholder('bodyCssClass')->set($request->getControllerName() . '-controller');
  }
}