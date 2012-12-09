<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
  
  protected function _initLogger() {
    $logger = new Zend_Log();
    $writer = new Zend_Log_Writer_Firebug();
    $logger->addWriter($writer);
    $registry = Zend_Registry::getInstance();
    $registry->logger = $logger;
  }
  
  protected function _initConfig() {
    $config = $this->getOptions();
    Zend_Registry::set('config', $config);
  }
  
  // protected function _initSession() {
  //   $config = Zend_Registry::get('config');
  //   Zend_Session::setOptions($config['session']);
  // }
  
  protected function _initAutoload() {
    $commonLoader = new Zend_Application_Module_Autoloader(array(
        'namespace' => 'Common',
        'basePath'  => APPLICATION_PATH . '/common'
    ));
    
    $commonLoader->addResourceType('acl', '/acls', 'Acl');
    $commonLoader->addResourceType('enum', '/enums', 'Enum');
    $commonLoader->addResourceType('helper', '/helpers', 'Helper');
    $commonLoader->addResourceType('util', '/utils', 'Util');
    
    $autoloader = Zend_Loader_Autoloader::getInstance();
    $autoloader->registerNamespace('Common_');
    $autoloader->registerNamespace('Phusick_');
  }
  
  protected function _initModuleAutoload() {
    $defaultModuleLoader = new Zend_Application_Module_Autoloader(array(
        'namespace' => 'Default',
        'basePath'  => APPLICATION_PATH . '/modules/default'
    ));
    
    $restModuleLoader = new Zend_Application_Module_Autoloader(array(
        'namespace' => 'Rest',
        'basePath'  => APPLICATION_PATH . '/modules/rest'
    ));
  }
  
  protected function _initLocale() {
    $this->bootstrap('frontController');
    $frontController = Zend_Controller_Front::getInstance();
    $frontController->registerPlugin(new Default_Plugin_LocalePlugin());
    
    $router = $frontController->getRouter();
    $router->addRoute('language', new Zend_Controller_Router_Route(
            ':lang',
            array(
                'module'     => 'default',
                'controller' => 'index',
                'action'     => 'index',
                'lang'       => 'en'
            ),
            array('lang' => '^(cs|en)$')
    ));
  }
  
  protected function _initBodyCssClassPlugin() {
    $this->bootstrap('frontController');
    $frontController = Zend_Controller_Front::getInstance();
    $frontController->registerPlugin(new Default_Plugin_BodyCssClassPlugin());    
  }
  
  protected function _initSidebarPlugin() {
    $this->bootstrap('frontController');
    $frontController = Zend_Controller_Front::getInstance();
    $frontController->registerPlugin(new Default_Plugin_SidebarPlugin());
  }
  
  protected function _initRoutes() {
    $this->bootstrap('frontController');
    $frontController = Zend_Controller_Front::getInstance();
    $router = $frontController->getRouter();
    
    $router->addRoute('post', new Zend_Controller_Router_Route(
            'post/:uri',
            array(
                'module'     => 'default',
                'controller' => 'posts',
                'action'     => 'get',
                'uri'        => null
            )
    ));
    
    $router->addRoute('page', new Zend_Controller_Router_Route(
            'page/:uri',
            array(
                'module'     => 'default',
                'controller' => 'pages',
                'action'     => 'get',
                'uri'        => null
            )
    ));
    
    $router->addRoute('folder', new Zend_Controller_Router_Route(
            '/docs/:uri',
            array(
                'module'     => 'default',
                'controller' => 'docs',
                'action'     => 'index',
                'uri'        => null
            )
    ));
    
    $router->addRoute('file', new Zend_Controller_Router_Route(
            '/file/:uri',
            array(
                'module'     => 'default',
                'controller' => 'file',
                'action'     => 'index',
                'uri'        => null
            )
    ));
  }
  
  protected function _initNavigation() {
    $this->bootstrap('layout');
    $layout = $this->getResource('layout');
    $view = $layout->getView();
    
    $navigationConfig = new Zend_Config_Xml(
            APPLICATION_PATH . '/configs/navigation.xml',
            'navigation');
    
    $navigationContainer = new Zend_Navigation($navigationConfig);
    $view->navigation($navigationContainer);
  }
  
  protected function _initAcl() {
    $acl = new Common_Acl_Acl();
    Zend_Registry::getInstance()->set('acl', $acl);
    
    $this->bootstrap('frontController');
    $frontController = Zend_Controller_Front::getInstance();
    $frontController->registerPlugin(new Common_Plugin_AclPlugin());
  }
  
  protected function _initActionHelpers() {
    $actionHelpers = array(
        new Common_Helper_Translate(),
        new Common_Helper_Config(),
        new Common_Helper_Language(),
        new Common_Helper_Animate()
    );

    foreach($actionHelpers as $helper) {
      Zend_Controller_Action_HelperBroker::addHelper($helper);
    }
  }
  
}

