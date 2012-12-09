<?php

class Default_Model_Announcements extends Phusick_Model_Database {
  
  const TYPE = 'announcement';
  protected $_storageClass = 'Common_Model_DbTable_Items';
  private $_lang;
  
  public function __construct($lang = 'cs') {
    $this->_lang  = $lang;
  }
  
  public function fetchEntries($limit = null) {
    $storage = $this->getStorage();
    $select = $storage->select();
    $select->where('language = ?', $this->_lang)
            ->where('type = ?', self::TYPE)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->from($storage->getTableName(), array(
                'id',
                'date_start', 
                'type', 
                'content'
            ))
            ->order('date_start DESC')
            ;
    
    if(!is_null($limit)) {
      $select->limit($limit);
    }
    
    return $storage->fetchAll($select)->toArray();
  }
  
}