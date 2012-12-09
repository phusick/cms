<?php

abstract class Phusick_Controller_Rest extends Zend_Rest_Controller {
  
  protected $_model = null;
  
  public function indexAction() {
    $items = $this->getModel()->index($this->_getParam('sort'));
    
    $this->getResponse()
            ->setHeader('Content-Range', $this->getRange($items))
            ->setHttpResponseCode(200)
            ->setBody($items)
            ;
    // TODO: handle crud rest index error
  }
  
  public function getAction() {
    $id = $this->_getParam('id');
    $item = $this->getModel()->get($id);
    $this->getResponse()->setHttpResponseCode(200)->setBody($item);    
    
    // TODO: handle crud rest get error
  }
  
  public function postAction() {
    $model = $this->getModel();
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
    // TODO: handle crud rest post error
  }
  
  public function putAction() {
    $model = $this->getModel();
    $id = $this->_getParam('id');
    $data = $this->_getParam('__requestBody');
    
    if ($model->update($data, $id)) {
      $this->getResponse()
              ->setHttpResponseCode(204)
              ->setBody('')
              ;
    }
    // TODO: handle crud rest put error
  }
  
  public function deleteAction() {
    $model = $this->getModel();
    $id = $this->_getParam('id');
    if (true === $model->delete($id)) {
      $this->getResponse()->setHttpResponseCode(204)->setBody('');
      return;
    }
    // TODO: handle crud rest delete error
  }
  
  abstract protected function getModel();
  
  protected function getRange($arr) {
    $count = count($arr);
    $index = $count-1;
    return "items 0-$index/$count";
  }
  
}