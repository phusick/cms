<?php

class Default_PagesController extends Zend_Controller_Action {

  public function getAction() {
    $language = $this->getLanguage();
    $uri = $this->getRequest()->getParam('uri');
    
    $pagesModel = new Default_Model_Pages($language);
    
    $page = $pagesModel->fetchByUri($uri);
    
    if(is_null($page)) {
      $this->_forward('not-found', 'error');
      return;
    }
    
    $this->view->page = $page;
  }
  
  private function getLanguage() {
    $session = new Zend_Session_Namespace('session');
    return $session->language;
  }

}

