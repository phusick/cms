<?php

abstract class Phusick_Model_Rest_Abstract implements Phusick_Model_Rest_Interface {
  
  protected $storage = null;
  protected $storageClass = null;
  
  public function getStorage() {
    if (is_null($this->storage)) {
      $this->storage = $this->initStorage();
    }
    return $this->storage;
  }
  
  protected function initStorage() {
    return new $this->storageClass;
  }
}