<?php

class Default_PostsController extends Zend_Controller_Action {
  
  private $model;
  private $language;
  
  public function init() {
    
  }
  
  public function indexAction() {
    $this->view->headTitle($this->_helper->translate('nav.posts'), 'PREPEND');
    
    $postsModel = $this->getModel();
    $paginator = new Zend_Paginator(
            new Zend_Paginator_Adapter_DbSelect($postsModel->selectAll()));
    $paginator->setItemCountPerPage($this->_helper->config('posts.itemCountPerPage'))
            ->setCurrentPageNumber($this->_getParam('page', 1));
    
    $this->view->paginator = $paginator;
    $this->view->language = $this->getLanguage();
    $this->_helper->animate(Common_Enum_Animation::NONE, false);
  }

  // show post by URI
  public function getAction() {
    $uri = $this->getRequest()->getParam('uri');
    
    $postsModel = $this->getModel();
    $post = $postsModel->fetchByUri($uri);
    
    if(is_null($post)) {
      $this->_forward('not-found', 'error');
      return;
    }
    
    $this->view->post = $post;
    $this->view->language = $this->getLanguage();
    $this->_helper->animate(Common_Enum_Animation::DEFAULT_, false);
  }
  
  private function getLanguage() {
    return Zend_Registry::get('Zend_Locale')->getLanguage();
  }
  
  private function getModel() {
    if(is_null($this->model)) {
      $this->model = new Default_Model_Posts($this->getLanguage());
    }
    return $this->model;
  }
  

}

