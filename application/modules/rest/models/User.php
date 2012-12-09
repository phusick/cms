<?php

class Rest_Model_User extends Phusick_Model_Rest_Database {
  
  protected $storageClass = 'Common_Model_DbTable_Users';
  
  const TYPE = Common_Enum_Type::PAGE;
  
  protected $indexColumns = array('id', 'active', 'username', 'role');
  protected $getColumns = array('id', 'active', 'username', 'role');
  protected $insertColumns = array('active', 'username', 'password', 'role');
  
  protected function beforeInsert(array $data, array $params) {
    $data['date_created'] = new Zend_Db_Expr('NOW()');
    $data['password'] = $this->createPassword($data['password']);
    
    return $data;
  }
  
  protected function beforeUpdate(array $data, array $params) {
    if(isset($data['password'])) {
      $data['password'] = $this->createPassword($data['password']);
    }
    
    return $data;
  }
  
  private function createPassword($password) {
    $salt = Common_Model_DbTable_Users::SALT;
    return new Zend_Db_Expr("SHA1(CONCAT('$password', '$salt'))");
  }
  
}