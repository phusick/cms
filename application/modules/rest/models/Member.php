<?php

class Rest_Model_Member extends Phusick_Model_Rest_Database {
  
  protected $storageClass = 'Common_Model_DbTable_Items';
  
  const TYPE = Common_Enum_Type::MEMBER;
  
  protected $indexColumns = array('id', 'publish', 'order', 'title');
  protected $getColumns = array('id', 'publish', 'order', 'title', 'data');
  protected $insertColumns = array('publish', 'order', 'data'); 
  protected $updateColumns = array('publish', 'order', 'data');
  
  protected function beforeIndex(Zend_Db_Select $select, array $params) {
    $select->where('type = ?', self::TYPE);
    return $select;
  }
  
  protected function beforeInsert(array $data, array $params) {
    $data['date_created'] = new Zend_Db_Expr('NOW()');
    $data['type'] = self::TYPE;
    $data['user_id'] = Zend_Auth::getInstance()->getStorage()->read()->id; 
    
    $data['title'] = $data['data']['given-name'] . ' ' . $data['data']['family-name'];
    
    $data['data'] = Phusick_Json::encodeArray($data['data']);
    
    return $data;
  }
  
  protected function beforeUpdate(array $data, array $params) {
    $data['date_updated'] = new Zend_Db_Expr('NOW()');
    $data['title'] = $data['data']['given-name'] . ' ' . $data['data']['family-name'];
    $data['data'] = Phusick_Json::encodeArray($data['data']);
    
    return $data;
  }
  
}
