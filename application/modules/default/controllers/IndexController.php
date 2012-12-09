<?php

class Default_IndexController extends Zend_Controller_Action {

  private $lang;
  
  public function init() {
    $this->lang = $this->_helper->language();
  }
  
  public function indexAction() {
    $postsModel = new Default_Model_Posts($this->lang);
    $uri = $postsModel->fetchLastUri();
    
    if(!is_null($uri)) {
      $this->_forward('get', 'posts', null, array('uri' => $uri));
    }
  }
  
  public function sidebarAction() {
    if($this->getRequest()->getParam('action') == 'sidebar') {
      $this->_redirect('/');
    }
    
    $this->_helper->viewRenderer->setResponseSegment('sidebar');
    
    $this->view->lang = $this->lang;
    $this->view->announcements = $this->getAnnouncements();
    $this->view->pages = $this->getPages();
    $this->view->posts = $this->getPosts();
  }
  
  private function getAnnouncements() {
    $announcementsModel = new Default_Model_Announcements($this->lang);
    $limit = $this->_helper->config('announcements.limit');
    return $announcementsModel->fetchEntries($limit);
  }
  
  private function getPages() {
    $pagesModel = new Default_Model_Pages($this->lang);
    return $pagesModel->fetchList();
  }
  
  private function getPosts() {
    $postsModel = new Default_Model_Posts($this->lang);
    return $postsModel->fetchGroupedList();
  }
  

}

