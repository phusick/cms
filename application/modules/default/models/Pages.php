<?php

class Default_Model_Pages extends Phusick_Model_Database {
  
  const TYPE = 'page';
  protected $_storageClass = 'Common_Model_DbTable_Items';
  private $_lang;
  
  public function __construct($lang = 'cs') {
    $this->_lang  = $lang;
  }
  
  public function fetchList() {
    $storage = $this->getStorage();
    $select = $storage->select();
    $select->where('language = ?', $this->_lang)
            ->where('type = ?', self::TYPE)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->where('date_start <= NOW() OR date_start IS NULL')
            ->from($storage->getTableName(), array(
                'uri',
                'title'
            ))
            ->order('order DESC')
            ->order('title ASC')
            ;
    return $storage->fetchAll($select)->toArray();
  }
  
  public function fetchByUri($uri) {
    $storage = $this->getStorage();
    $select = $storage->select();
    $select->where('language = ?', $this->_lang)
            ->where('type = ?', self::TYPE)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->where('date_start <= NOW() OR date_start IS NULL')
            ->where('uri = ?', $uri)
            ;
    
    $page = $storage->fetchRow($select);
    
    if(!is_null($page)) {
      $page = $page->toArray();
    }
    
    return $page;
  }
  
}
