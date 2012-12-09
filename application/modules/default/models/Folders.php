<?php

class Default_Model_Folders extends Phusick_Model_Database {

  const TYPE = 'folder';
  protected $_storageClass = 'Common_Model_DbTable_Items';

  public function fetchEntries() {
    $storage = $this->getStorage();
    $select = $storage->select();
    $select->from($storage->getTableName(), array(
                'id',
                'uri',
                'title'
            ))
            ->where('type = ?', self::TYPE)
            ->where('publish')
            ->order('title ASC')
            ; 
    
    return $storage->fetchAll($select)->toArray();
  }
  
  public function fetchFirstUri() {
    $storage = $this->getStorage();
    $select = $storage->select();
    $select->from($storage->getTableName(), array(
                'id',
                'uri',
                'title'
            ))
            ->where('type = ?', self::TYPE)
            ->where('publish')
            ->order('title ASC')
            ; 
    
    $folder = $storage->fetchRow($select);
    
    if (!is_null($folder)) {
      return $folder->uri;
    }
    
    return null;
  }

}
