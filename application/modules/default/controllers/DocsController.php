<?php

class Default_DocsController extends Zend_Controller_Action {

  protected $foldersModel;
  protected $filesModel;
  
  public function init() {
    $this->view->headTitle($this->_helper->translate('nav.documents'), 'PREPEND');
    $this->view->headScript()->appendFile(
            '/site/themes/default/js/docs.js', 'text/javascript',
            array('defer' => 'defer'));
  }
  
  public function indexAction() {
    $this->view->uri = $uri = $this->getRequest()->getParam('uri');
    $this->view->language = Zend_Registry::get('Zend_Locale')->getLanguage();
    $foldersModel = $this->getFoldersModel();
    $filesModel = $this->getFilesModel();

    $folders = $foldersModel->fetchEntries();
    
    if (is_null($uri)) {
      $files = $filesModel->fetchLastCreated();
    } else {
      foreach($folders as $key => $value) {
        if ($folders[$key]['uri'] == $uri) {
          $folders[$key]['active'] = true;
          $folderId = $folders[$key]['id'];
          break;
        }
      }
      
    if(is_null($folderId)) {
      $this->_forward('not-found', 'error');
      return;
    }
      
      $files = $filesModel->fetchByParentId($folderId);
    }
    
    foreach($folders as $key => $value) {
      $folders[$key]['count'] = $filesModel->countByParentId($folders[$key]['id']);
    }
    
    $this->view->folders = $folders;
    $this->view->files = $files;
  }
  
  protected function getFoldersModel() {
    if (is_null($this->foldersModel)) {
      $this->foldersModel = new Default_Model_Folders();
    }
    return $this->foldersModel;
  }
  
  protected function getFilesModel() {
    if (is_null($this->filesModel)) {
      $this->filesModel = new Default_Model_Files();
    }
    return $this->filesModel;  
  }

}

