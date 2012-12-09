<?php

class Common_Model_DbTable_Users extends Zend_Db_Table_Abstract {
  
  const SALT = 'fa41ifha574si156hufas16518fafad18eere';
  
  protected $_name = 'users';
  protected $_primary = 'id';
  
  public function getTableName() {
    return $this->_name;
  }
  
}