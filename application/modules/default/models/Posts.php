<?php

class Default_Model_Posts extends Phusick_Model_Database {
  
  const TYPE = 'post';
  protected $_storageClass = 'Common_Model_DbTable_Items';
  private $_lang;
  
  public function __construct($lang = 'cs') {
    $this->_lang  = $lang;
  }
  
  public function fetchGroupedList($limit = 100) {
    $storage = $this->getStorage();
    $select = $storage->select();
    $select->where('language = ?', $this->_lang)
            ->where('type = ?', self::TYPE)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->where('date_start <= NOW()')
            ->from($storage->getTableName(), array(
                'uri',
                'title',
                'year'  => 'year(date_start)',
                'month' => 'month(date_start)'
            ))
            ->order('date_start DESC')
            ;
    if(!is_null($limit)) {
      $select->limit($limit);
    }
    
    $rows = $storage->fetchAll($select)->toArray();
    
    $posts = array();
    foreach($rows as $row) {
      $year = $row['year'];
      $month = $row['month'];

      unset($row['year']);
      unset($row['month']);

      $posts[$year][$month][] = $row;
    }
    
    return $posts;
  }
  
  public function fetchByUri($uri) {
    $storage = $this->getStorage();
    $select = $storage->select();
    $select->where('language = ?', $this->_lang)
            ->where('type = ?', self::TYPE)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->where('date_start <= NOW()')
            ->where('uri = ?', $uri)
            ;
    
    $post = $storage->fetchRow($select);
    
    if(!is_null($post)) {
      $post = $post->toArray();
    }
    return $post;
  }
  
  public function fetchLastUri() {
    $storage = $this->getStorage();
    $select = $storage->select();
    $select->where('language = ?', $this->_lang)
            ->where('type = ?', self::TYPE)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->where('date_start <= NOW()')
            ->from($storage->getTableName(), array('uri'))
            ->order('date_start DESC')
            ;
    $post = $storage->fetchRow($select);
    
    if(!is_null($post)) {
      return $post->uri;
    }
    
    return null;
  }
  
  public function selectAll() {
    $storage = $this->getStorage();
    $select = $storage->select();
    $select->where('language = ?', $this->_lang)
            ->where('type = ?', self::TYPE)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->where('date_start <= NOW()')
            ->from($storage->getTableName(), array(
                'uri',
                'title',
                'content',
                'date_start'
            ))
            ->order('date_start DESC')
            ;
    return $select;
  }
  
}