<?php

interface Phusick_Model_Rest_Interface {
  
  public function getStorage();
  
  public function insert(array $data);
  
  public function update(array $data, $id);
  
  public function delete($id);
  
  public function get($id);
  
  public function index($sort);
  
}