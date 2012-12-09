<?php

// TODO: RestAccessPlugin (via apiKey?)
// TODO: catch exceptions and send error HttpResponseCodes

class Rest_AnnouncementController extends Zend_Rest_Controller {
  
  protected $_model = null;
  
  public function indexAction() {
    $model = new Rest_Model_Announcement();
    $announcements = $model->index($this->_getParam('sort'));

    $this->getResponse()
            ->setHeader('Content-Range', $this->getRange($announcements))
            ->setHttpResponseCode(200)
            ->setBody($announcements)
            ;
  }
  
  public function getAction() {
    $model = new Rest_Model_Announcement();
    $announcement = $model->get($this->_getParam('id'));
    
    $this->getResponse()->setHttpResponseCode(200)->setBody($announcement);
  }
  
  public function putAction() {
    $model = new Rest_Model_Announcement();
    $id = $this->_getParam('id');
    $data = $this->_getParam('__requestBody');
    
    if ($model->update($data, $id)) {
      $this->getResponse()
              ->setHttpResponseCode(204)
              ->setBody('')
              ;
      return;
    }
  }  
  
  public function postAction() {
    $model = new Rest_Model_Announcement();
    $data = $this->_getParam('__requestBody');
    $id = $model->insert($data);
    
    $request = $this->getRequest();
    $uri = $request->getScheme() . '://' . $request->getHttpHost();
    $uri .= $request->getRequestUri() . $id;
    
    if(!is_null($id)) {
      $this->getResponse()->setHttpResponseCode(201)
              ->setHeader('Location', $uri)
              ->setBody($model->get($id))
              ;
    }
  }
  
  public function deleteAction() {
    $model = new Rest_Model_Announcement();
    $id = $this->_getParam('id');
    if(true === $model->delete($id)) {
      $this->getResponse()
              ->setHttpResponseCode(204)
              ->setBody('')
              ;
    }
  }

  private function getRange($arr) {
    $count = count($arr);
    $index = $count-1;
    return "items 0-$index/$count";
  }
  
  protected function getModel() {
    if(null == $this->_model) {
      $this->_model = new Rest_Model_Announcements();
    }
    return $this->_model;
  }
  
}