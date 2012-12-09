<?php

class Rest_Plugin_JsonRestPlugin extends Zend_Controller_Plugin_Abstract {
  
  public function preDispatch(Zend_Controller_Request_Abstract $request) {
    if($request->getModuleName() != 'rest') return;
    
    $this->initRequest($request);
    $this->initResponse($request);
  }
  
  private function initRequest(Zend_Controller_Request_Abstract $request) {
    $contentType = $request->getHeader('Content-Type');
    
    if (strpos($contentType, 'application/json') !== false) {
      $requestBody = file_get_contents("php://input");
      // TODO: catch JSON parsing errors
      $request->setParam('__requestBody', Zend_Json::decode($requestBody));
      
      // preset query and sort parameters
    }    
  }
  
  private function initResponse(Zend_Controller_Request_Abstract $request) {
    $accept = $request->getHeader('Accept');
    
    if (strpos($accept, 'application/json') !== false) {
      $response = new Phusick_Controller_Response_Json();
      $response->setHeader('Content-Type', 'application/json; charset=UTF-8');
      Zend_Controller_Front::getInstance()->setResponse($response);
    }
  }
  
}
