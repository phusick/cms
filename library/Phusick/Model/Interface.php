<?php
/**
 * Model Interface
 */

interface Phusick_Model_Interface {
  
  /**
   * Data storage initialization
   * 
   *  @return object 
   */
  public function getStorage();
  
  /**
   * Insert entry
   * 
   *  @param array $data data to be inserted
   *  @throws Phusick_Model_Exception
   *  @return string inserted entry identificator
   */
  public function insert(array $data);
  
  /**
   * Update entry
   * 
   * @param array $data data to be updated 
   * @param string $id entry identificator
   * @throws Phusick_Model_Exception
   * @return boolean
   */
  public function update(array $data, $id);
  
  /**
   * Delete entry
   * 
   * @param string $id entry identificator
   * @throws Phusick_Model_Exception
   * @return boolean
   */
  public function delete($id);
  
  /**
   * Fetch entry by an indentificator
   * 
   * @param string $id entry indentificator
   * @return array 
   */
  public function fetchEntry($id);
  
  /**
   * Fetch all entries
   * 
   * @return array 
   */
  public function fetchEntries();
  
}