<?php

class Phusick_Controller_Response_Json extends Zend_Controller_Response_Abstract {

  public function setBody($content, $name = null) {
    if (is_array($content)) {
      $content = Phusick_Json::encodeArray($content);
    }
    parent::setBody($content, $name);
  }
  
}
