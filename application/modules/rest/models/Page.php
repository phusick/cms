<?php

class Rest_Model_Page extends Phusick_Model_Rest_Database {
  
  protected $storageClass = 'Common_Model_DbTable_Items';
  
  const TYPE = Common_Enum_Type::PAGE;
  
  protected $indexColumns = array('id', 'language' ,'publish', 'title', 'order', 'date_created');
  protected $getColumns = array('id', 'uri', 'language', 'publish', 'translation_id', 'order', 'title', 'content', 'date_start', 'date_end', 'date_created');
  protected $insertColumns = array('uri', 'language', 'publish', 'translation_id', 'order', 'title', 'content', 'date_start', 'date_end'); 
  protected $updateColumns = array('uri', 'language', 'publish', 'translation_id', 'order', 'title', 'content', 'date_start', 'date_end');
  
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
    return $data;
  }
  
  protected function beforeUpdate(array $data, array $params) {
    $data['date_updated'] = new Zend_Db_Expr('NOW()');
    return $data;
  }
  
}