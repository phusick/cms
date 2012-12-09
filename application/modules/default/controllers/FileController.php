<?php

class Default_FileController extends Zend_Controller_Action {
  
  public function init() {
    $this->_helper->layout->disableLayout();
    $this->_helper->viewRenderer->setNoRender();    
  }
  
  public function indexAction() {
    $uri = $this->_getParam('uri');
    
    $model = new Default_Model_Files();
    $file = $model->fetchByUri($uri);
    
    if (is_null($file)) {
      $this->getResponse()->setHttpResponseCode(404)->setBody('');
      return;
    }
    
    $absolutePath = $this->_helper->config('attachments.path') . $file['file_path'];
    
    $this->getResponse()
            ->setHeader('Content-Type', 'application/octet-stream', true)
            ->setHeader('Content-Length', filesize($absolutePath))
            ->setHeader('Content-Disposition', 'attachment; filename="' . $file['data']['filename'] . '"')
            ->setHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0')
            ;
    $fp = fopen($absolutePath, 'rb');
    fpassthru($fp);
    fclose($fp);
  }
  
}