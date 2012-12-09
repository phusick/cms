<?php

class Rest_Model_Announcement extends Phusick_Model_Rest_Database {
  
  protected $storageClass = 'Common_Model_DbTable_Items';
  
  const TYPE = Common_Enum_Type::ANNOUNCEMENT;
  
  protected $indexColumns = array('id', 'language', 'date_start', 'publish', 'content');
  protected $getColumns = array('id', 'user_id', 'language', 'date_start', 'publish', 'content');
  protected $insertColumns = array('publish', 'language', 'date_start', 'content'); 
  protected $updateColumns = array('publish', 'language', 'date_start', 'content');
  
  protected function beforeIndex(Zend_Db_Select $select, array $params) {
    $select->where('type = ?', self::TYPE);
    return $select;
  }
  
  protected function beforeInsert(array $data, array $params) {
    $data['date_created'] = new Zend_Db_Expr('NOW()');
    $data['type'] = self::TYPE;
    $data['user_id'] = Zend_Auth::getInstance()->getStorage()->read()->id;    
    return $data;
  }
  
  protected function beforeUpdate(array $data, array $params) {
    $data['date_updated'] = new Zend_Db_Expr('NOW()');
    return $data;
  }
  
}
