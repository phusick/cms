<?php

abstract class Phusick_Model_Rest_Database extends Phusick_Model_Rest_Abstract {
  
  protected $indexColumns = null;
  protected $getColumns = null;
  protected $insertColumns = null;
  protected $updateColumns = null;
  
  protected function beforeIndex(Zend_Db_Select $select, array $arguments) {
    return $select;
  }
  
  protected function afterIndex(array $data) {
    return $data;
  }
  
  public function index($sort, array $arguments = array()) {
    $storage = $this->getStorage();
    $select = $storage->select();
    
    if (!is_null($this->indexColumns)) {
      $select->from(array('main' => $storage->getTableName()), $this->indexColumns);
    }
    
    $select = $this->beforeIndex($select, $arguments);
    
    $sortBy = $this->parseSort($sort);
    if (!is_null($sortBy)) {
      $select->order($sortBy);
    }
    
    $data = $storage->fetchAll($select)->toArray();
    
    foreach($data as $key => $value) {
      if(isset($data[$key]['data'])) {
        $data[$key]['data'] = Zend_Json::decode($data[$key]['data']);
      }    
    }
    
    $data = $this->afterIndex($data);
    
    return $data;
  }
  
  protected function beforeGet(Zend_Db_Select $select) {
    return $select;
  }
  
  protected function afterGet(array $data) {
    return $data;
  }
  
  public function get($id) {
    $storage = $this->getStorage();
    $select = $this->beforeGet($storage->select());
    
    if (!is_null($this->getColumns)) {
      $select->from($storage->getTableName(), $this->getColumns);
    }
    
    $select->where('id = ?', $id);
    $data = $storage->fetchRow($select);
    
    if (!is_null($data)) {
      $data = $data->toArray();
      if(isset($data['data'])) {
        $data['data'] = Zend_Json::decode($data['data']);
      }
      $data = $this->afterGet($data);
    }
    
    return $data;
  }
  
  protected function beforeInsert(array $data, array $params) {
    return $data;
  }
  
  protected function afterInsert(array $data, array $params) {
  }
  
  public function insert(array $data, array $params = array()) {
    try {
      $data = $this->unsetColumns($data, $this->getInsertColumns());
      $data = $this->beforeInsert($data, $params);
      $data = $this->unsetColumns($data, $this->getTableColumns());
      
      $row = $this->getStorage()->createRow($data);
      $id = $row->save();
      
      $this->afterInsert($data, $params);
      
    } catch (Zend_Db_Exception $e) {
      throw new Phusick_Model_Exception('Insert failed.');
    }
    return $id;
  }
  
  protected function beforeUpdate(array $data, array $params) {
    return $data;
  }
  
  protected function afterUpdate(array $data, array $params) {
  }
  
  public function update(array $data, $id, array $params = array()) {
    try {
      $data = $this->unsetColumns($data, $this->getUpdateColumns());
      $data = $this->beforeUpdate($data, $params);
      $data = $this->unsetColumns($data, $this->getTableColumns());
      
      $id = (array) $id;
      $storage = $this->getStorage();
      $rowset = call_user_func_array(array($storage, 'find'), $id);
      $row = $rowset->current();
      $row->setFromArray($data);
      $row->save();
      
      $this->afterUpdate($data, $params);
    
    } catch (Zend_Db_Exception $e) {
      throw new Phusick_Model_Exception('Update failed');
    }
    
    return true;    
  }
  
  protected function beforeDelete(Zend_Db_Table_Row $row) {
    return $row;
  }
  
  protected function afterDelete(array $data) {
    
  }
  
  public function delete($id) {
    try {
      $id = (array) $id;
      $storage = $this->getStorage();
      $rowset = call_user_func_array(array($storage, 'find'), $id);
      $row = $this->beforeDelete($rowset->current());
      $data = $row->toArray();
      $row->delete();
      $this->afterDelete($data);
    } catch (Zend_Db_Exception $e) {
      throw new Phusick_Model_Exception('Delete failed.');
    }
    return true;
  }
  
  private function parseSort($sort) {
    if(is_null($sort)) return null;
    
    $orderDirection = substr($sort, 0, 1) == '-' ? 'DESC' : 'ASC';
    $orderColumn = substr($sort, 1);
    
    try {
      $columns = $this->getTableColumns();
      if (!in_array($orderColumn, $columns)) return null;
    } catch (Zend_Db_Exception $e) {
      throw new Phusick_Model_Exception('Data sorting failed');
    }
    
    return $orderColumn . ' ' . $orderDirection;
  } 
  
  private function getTableColumns() {
    return $this->getStorage()->info(Zend_Db_Table_Abstract::COLS);
  }
  
  private function getInsertColumns() {
    if(is_array($this->insertColumns)) {
      return $this->insertColumns;
    }
    return $this->getTableColumns();
  }
  
  private function getUpdateColumns() {
    if(is_array($this->updateColumns)) {
      return $this->updateColumns;
    }
    return $this->getTableColumns();    
  }
  
  /**
   * Unset columns
   * 
   * @param array $data data to be processed
   * @param array $keys column names to unset
   * @return array data without specified columns
   */
  private function unsetColumns(array $data, array $columns) {
    foreach($data as $column => $value) {
      if (!in_array($column, $columns)) {
        unset($data[$column]);
      }
    }
    return $data;
  }
  
}