<?php

abstract class Phusick_Model_Database extends Phusick_Model_Abstract {
  
  public function fetchEntries() {
    return $this->getStorage()->fetchAll()->toArray();
  }
  
  public function fetchEntry($id) {
    $id = (array) $id;
    $storage = $this->getStorage();
    $rowset = call_user_func_array(array($storage, 'find'), $id);
    $row = $rowset->current();
    return is_null($row) ? null : $row->toArray();
  }
  
  protected function _preInsert(array $data) {
    return $data;
  }
  
  public function insert(array $data) {
    try {
      $columns = $this->getStorage()->info(Zend_Db_Table_Abstract::COLS);
      
      foreach($data as $column => $value) {
        if(!in_array($column, $columns)) {
          unset($data[$column]);
        }
      }
      
      $row = $this->getStorage()->createRow($data);
      $id = $row->save();
      
    } catch(Zend_Db_Exception $e) {
      throw new Phusick_Model_Exception('Insert failed.');
    }
    return $id;
  }
  
  public function update(array $data, $id) {
    try {
      $columns = $this->getStorage()->info(Zend_Db_Table_Abstract::COLS);
      
      foreach($data as $column => $value) {
        if(!in_array($column, $columns)) {
          unset($data[$column]);
        }
      }
      
      $id = (array) $id;
      $storage = $this->getStorage();
      $rowset = call_user_func_array(array($storage, 'find'), $id);
      $row = $rowset->current();
      $row->setFromArray($data);
      $row->save();
      
    } catch (Zend_Db_Exception $e) {
      throw new Phusick_Model_Exception('Update failed');
    }
    return true;
  }
  
  public function delete($id) {
    try {
      $id = (array) $id;
      $storage = $this->getStorage();
      $rowset = call_user_func_array(array($storage, 'find'), $id);
      $row = $rowset->current();
      $row->delete();
      
    } catch (Zend_Db_Exception $e) {
      throw new Phusick_Model_Exception('Delete failed.');
    }
    return true;
  }
  
}