<?php

class Default_Model_Files extends Phusick_Model_Database {

  const TYPE = 'file';
  protected $_storageClass = 'Common_Model_DbTable_Items';
  protected $mimeIcons;

  public function fetchByUri($uri) {
    $storage = $this->getStorage();
    $select = $storage->select();

    $select->where('type = ?', self::TYPE);
    $select->where('uri = ?', $uri);

    $file = $storage->fetchRow($select);

    if (is_null($file)) {
      return null;
    }

    $file = $file->toArray();

    $time = strtotime($file['date_created']);
    $file['file_path'] = date('Y/m/', $time) . $file['uri'];
    $file['data'] = Zend_Json::decode($file['data']);

    return $file;
  }
  
  public function fetchByParentId($parentId) {
    $storage = $this->getStorage();
    $select = $storage->select();

    $select->from($storage->getTableName(), array(
              'id',
              'uri',
              'title',
              'date_created',
              'data'
            ))
            ->where('type = ?', self::TYPE)
            ->where('parent_id = ?', $parentId)
            ->where('publish = ?', Common_Enum_Publish::YES)
            ->order('title ASC')
            ;
    
    $files = $storage->fetchAll($select)->toArray();
    
    foreach($files as $key => $value) {
      $files[$key]['data'] = Zend_Json::decode($files[$key]['data']);
      $files[$key]['icon'] = Common_Util_Icon::forMimeType($files[$key]['data']['filetype']);
    }
    
    return $files;
  }
  
  public function fetchLastCreated($limit = 6) {
    $storage = $this->getStorage();
    $select = $storage->select();
    
    $select->from(array('fi' => $storage->getTableName()), array(
              'id',
              'uri',
              'title',
              'date_created',
              'data'
              ))
            ->join(array('fo' => $storage->getTableName()),
                    'fi.parent_id = fo.id',
                    array(
                        'folder_id'     => 'fo.id',
                        'folder_title'  => 'fo.title',
                        'folder_uri'    => 'fo.uri'
                    )
                    )
            ->where('fi.type = ?', self::TYPE)
            ->where('fo.type = ?', Default_Model_Folders::TYPE)
            ->where('fi.publish = ?', Common_Enum_Publish::YES)
            ->order('fi.date_created DESC')
            ;
    
    $files = $storage->fetchAll($select)->toArray();
    
    foreach($files as $key => $value) {
      $files[$key]['data'] = Zend_Json::decode($files[$key]['data']);
      $files[$key]['icon'] = Common_Util_Icon::forMimeType($files[$key]['data']['filetype']);
    }
    
    return $files;
  }
  
  public function countByParentId($parentId) {
    $storage = $this->getStorage();
    $select = $storage->select();

    $select->from($storage->getTableName(), array(
              'COUNT(*) as amount'
            ))
            ->where('type = ?', self::TYPE)
            ->where('parent_id = ?', $parentId)
            ->where('publish = ?', Common_Enum_Publish::YES)          
            ;
    
    return $storage->fetchRow($select)->amount;
  }

}