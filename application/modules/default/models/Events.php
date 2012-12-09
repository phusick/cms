<?php

class Default_Model_Events extends Phusick_Model_Database {
  
  const TYPE = 'event';
  protected $_storageClass = 'Common_Model_DbTable_Items';
  private $columns = array('id', 'date_start', 'date_end', 'title', 'data', 'content');
  
  public function fetchUpcomimg() {
    $storage = $this->getStorage();
    $select = $storage->select();
    
    $select->from($storage->getTableName(), $this->columns)
            ->where('type = ?', self::TYPE)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->where('date_start > NOW() or date_end > NOW()')
            ->order('date_start ASC')
            ;
    
    $events = $storage->fetchAll($select)->toArray();
    
    foreach($events as $key => $value) {
      $events[$key]['data'] = Zend_Json::decode($events[$key]['data']);
    }
    
    return $events;
  }
  
  public function fetchHistory() {
    $storage = $this->getStorage();
    $select = $storage->select();
    
    $select->from($storage->getTableName(), $this->columns)
            ->where('type = ?', self::TYPE)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->where('date_start < NOW() and (date_end < NOW() or date_end IS NULL)' )
            ->order('date_start DESC')
            ;
    
    $events = $storage->fetchAll($select)->toArray();
    
    foreach($events as $key => $value) {
      $events[$key]['data'] = Zend_Json::decode($events[$key]['data']);
    }
    
    return $events;
  }
  
}