<?php

class Default_Model_Members extends Phusick_Model_Database {
  
  const TYPE = 'member';
  protected $_storageClass  = 'Common_Model_DbTable_Items';
  private $acl;
  
  public function __construct(Zend_Acl $acl) {
    $this->acl = $acl;
  }
  
  public function fetchAll() {
    $storage = $this->getStorage();
    $select = $storage->select();
    $select->from($storage->getTableName(), array(
              'id',
              'fn' => 'title',
              'data'
            ))
            ->where('type = ?', self::TYPE)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->order('order DESC')
            ; 
    
    $rows = $storage->fetchAll($select)->toArray();
    
    $members = array();
    $auth = Zend_Auth::getInstance();
    $role = $auth->hasIdentity() ? $auth->getIdentity()->role : 'guest';
    
    foreach($rows as $row) {
      $id = $row['id'];
      
      try {
          $data = Zend_Json::decode($row['data']);
          $members[$id] = array();
          foreach($data as $key => $value) {
            if($this->acl->isAllowed($role, 'member-data', $key)) {
              $members[$id][$key] = $value;
            }
          }
          $members[$id]['fn'] = $row['fn'];

          } catch (Zend_Json_Exception $e) {
            Zend_Registry::get('logger')->debug($e->getMessage());
      }
    }
    return $members;
  }
  
}