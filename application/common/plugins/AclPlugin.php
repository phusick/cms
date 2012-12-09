<?php

class Common_Plugin_AclPlugin extends Zend_Controller_Plugin_Abstract {

  public function dispatchLoopStartup(Zend_Controller_Request_Abstract $request) {
    
    $auth = Zend_Auth::getInstance();
    $role = $auth->hasIdentity() ? $auth->getIdentity()->role : 'guest';
    $acl = Zend_Registry::get('acl');
    
    $view = Zend_Layout::getMvcInstance()->getView();
    $view->navigation()->setAcl($acl)->setRole($role);
    
    $module = $request->getModuleName();
    $controller = $request->getControllerName();
    $action = $request->getActionName();
    
    $resource = $module . ':' . $controller;
    $privilege = $action;
    
    if(!$acl->isAllowed($role, $resource, $privilege)) {
      Zend_Registry::get('logger')->debug("Access Denied: $role - $resource - $privilege");
      if($role == 'guest') {
        $request->setModuleName('default');
        $request->setControllerName('auth');
        $request->setActionName('login');
      } else {
        $this->_response->setRedirect('/');
      }
    }
    
  }
  
}