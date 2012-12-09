<?php

class Default_Plugin_SidebarPlugin extends Zend_Controller_Plugin_Abstract {
  
  protected $_actionStack = null;
  
  public function __construct() {
    $frontController = Zend_Controller_Front::getInstance();
    
    if(!$frontController->hasPlugin('Zend_Controller_Plugin_ActionStack')) {
      $this->_actionStack = new Zend_Controller_Plugin_ActionStack();
      $frontController->registerPlugin($this->_actionStack, 97);
    } else {
      $this->_actionStack = $frontController->getPlugin(
              'Zend_Controller_Plugin_ActionStack'
      );
    }
  }
  
  public function dispatchLoopStartup(Zend_Controller_Request_Abstract $request) {
    if($request->getControllerName() == 'admin') return;
    if($request->getControllerName() == 'file') return;
    if($request->getModuleName() == 'rest') return;
    
    $sidebarAction = clone($request);
    $sidebarAction->setActionName('sidebar');
    $sidebarAction->setControllerName('index');
    $this->_actionStack->pushStack($sidebarAction);
  }
  
}