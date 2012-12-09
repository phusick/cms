<?php
/**
 * Description of Abstract
 *
 * @author phusick
 */
abstract class Phusick_Model_Abstract implements Phusick_Model_Interface {
  
  protected $_storage = null;
  
  /**
   * @var string
   */
  protected $_storageClass = null;
  
  public function getStorage() {
    if(null === $this->_storage) {
      $this->_storage = $this->_initStorage();
    }
    return $this->_storage;
  }
  
  protected function _initStorage() {
    return new $this->_storageClass();
  }
  
}
