<?php

class Rest_Model_Post extends Phusick_Model_Rest_Database {
  
  protected $storageClass = 'Common_Model_DbTable_Items';
  
  const TYPE = Common_Enum_Type::POST;
  
  protected $indexColumns = array('id', 'language' ,'publish', 'title', 'date_created');
  protected $getColumns = array('id', 'uri', 'language', 'publish', 'translation_id', 'title', 'content', 'date_start', 'date_end', 'date_created');
  protected $insertColumns = array('uri', 'language', 'publish', 'translation_id', 'title', 'content', 'date_start', 'date_end'); 
  protected $updateColumns = array('uri', 'language', 'publish', 'translation_id', 'title', 'content', 'date_start', 'date_end');
  
  protected function beforeIndex(Zend_Db_Select $select, array $params) {
    $select->where('type = ?', self::TYPE);
    
    if(isset($params['language'])) {
      $select->where('language = ?', $params['language']);
    }
    return $select;
  }
  
  protected function afterGet(array $data) {
    $filter = new Zend_Filter_StripNewlines();
    $data['content'] = $filter->filter($data['content']);
    return $data;
  }
  
  protected function beforeInsert(array $data, array $params) {
    $data['type'] = self::TYPE;
    $data['user_id'] = Zend_Auth::getInstance()->getStorage()->read()->id;
    $data['date_created'] = new Zend_Db_Expr('NOW()');
    
    if(!isset($data['date_start'])) {
      $data['date_start'] = new Zend_Db_Expr('NOW()');
    }
    
    return $data;
  }
  
  protected function beforeUpdate(array $data, array $params) {
    $data['date_updated'] = new Zend_Db_Expr('NOW()');
    return $data;
  }
  
}