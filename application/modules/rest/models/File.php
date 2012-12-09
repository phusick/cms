<?php

class Rest_Model_File extends Phusick_Model_Rest_Database {
  
  const TYPE = Common_Enum_Type::FILE;
  protected $storageClass = 'Common_Model_DbTable_Items';
  
  protected $indexColumns = array('id', 'date_created', 'publish', 'title', 'data');
  protected $getColumns = array('id', 'uri', 'date_created', 'publish', 'title', 'data'); 
  protected $insertColumns = array('publish', 'parent_id', 'title'); 
  protected $updateColumns = array('publish', 'title');
  
  protected function beforeIndex(Zend_Db_Select $select, array $arguments) {
    $select->where('type = ?', self::TYPE);
    $select->where('parent_id = ?', $arguments['parent_id']);
    return $select;
  }
  
  protected function afterIndex(array $data) {
    foreach($data as $key => $value) {
      $data[$key]['mimeicon'] = 
          Common_Util_Icon::forMimeType($data[$key]['data']['filetype']); 
    }
    
    return $data;
  }
  
  protected function beforeInsert(array $data, array $params) {
    $data['type'] = self::TYPE;
    $data['user_id'] = Zend_Auth::getInstance()->getStorage()->read()->id;
    
    $now = time();
    $data['date_created'] = date( 'Y-m-d H:i:s', $now);
    
    $filename = $this->moveFile($params['filename'], $now);
    if($filename === false) {
      throw new Phusick_Model_Exception('Cannot rename uploaded file.');
    }
    
    $data['uri'] = basename($filename);
    
    $fileInfo = array(
        'filename' => $params['originalFilename'],
        'filesize' => filesize($filename),
        'filetype' => Phusick_File_MimeType::detect($params['originalFilename'])
    );
    $data['data'] = Phusick_Json::encodeArray($fileInfo);
    
    return $data;
  }
  
  protected function beforeUpdate(array $data, array $params) {
    $data['date_updated'] = new Zend_Db_Expr('NOW()');
    return $data;
  }
  
  protected function afterGet(array $data) {
    $data['mimeicon'] = Common_Util_Icon::forMimeType($data['data']['filetype']);
    
    $view = new Zend_View();
    $data['download_url'] = $view->url(array(
        'uri' => $data['uri']
    ), 'file');

    return $data;
  }
    
  protected function afterDelete(array $data) {
    return $this->deleteFile($data['uri'], strtotime($data['date_created']));
  }
  
  private function deleteFile($filename, $time) {
    $path = $this->getTargetPath($time);
    $filename = $path . $filename;
    
    if (is_writable($filename) && is_file($filename)) {
      return unlink($filename);
    }
    
    return false;
  }
  
  private function moveFile($filename, $time) {
    $targetPath = $this->getTargetPath($time);
    
    if (!(file_exists($targetPath) && is_dir($targetPath))) {
      mkdir($targetPath, 0755, true);
    }
    
    $renameFilter = new Zend_Filter_File_Rename($targetPath . basename($filename));
    return $renameFilter->filter($filename);
  }
  
  private function getTargetPath($time) {
    $config = Zend_Registry::get('config');
    $basePath = $config['attachments']['path'];
    $datePath = date('Y/m/', $time);
    return $basePath . $datePath;
  }
  
}