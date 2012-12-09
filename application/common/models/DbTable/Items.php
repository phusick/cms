<?php

class Common_Model_DbTable_Items extends Zend_Db_Table_Abstract {
  
  protected $_name = 'items';
  protected $_primary = 'id';
  
  protected $_referenceMap = array(
      'User' => array(
          'columns'       => 'user_id',
          'refTableClass' => 'Users',
          'refColumns'    => 'id'
      )
  );
  
  public function getTableName() {
    return $this->_name;
  }
  
}
