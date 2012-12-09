<?php

class Rest_FileController extends Phusick_Controller_Rest {

  protected $_model = null;

  public function getAction() {
    $id = $this->_getParam('id');
    $file = $this->getModel()->get($id);
        
    $this->getResponse()->setHttpResponseCode(200)->setBody($file);
  }

  public function indexAction() {
    $parent_id = $this->_getParam('parent_id');
    $items = $this->getModel()->index($this->_getParam('sort'),array(
        'parent_id' => $parent_id
        )
      );
    
    $this->getResponse()
            ->setHeader('Content-Range', $this->getRange($items))
            ->setHttpResponseCode(200)
            ->setBody($items)
            ;
  }

  public function postAction() {   
    $tmpPath = $this->_helper->config('attachments.tmp');
    $uri = uniqid();

    $upload = new Zend_File_Transfer_Adapter_Http();
    $upload->setOptions(array('useByteString' => false));
    $upload->setDestination($tmpPath);

    try {
      $upload->receive();
      
      $filename = $upload->getFileName(null, false);
      $filepath = $upload->getFileName();
      $filesize = $upload->getFileSize();
      
      $target = $tmpPath . $uri;
      $renameFilter = new Zend_Filter_File_Rename(array(
          'target'   => $target,
          'overwrite' => true
      ));
      $renameFilter->filter($filepath);

      $model = $this->getModel();
      $id = $model->insert(array(
                  'parent_id' => $this->_getParam('parent_id'),
                  'title'     => $this->_getParam('title'),
                  'publish'   => $this->_getParam('publish')
              ), 
              array(
                  'filename'         => $target,
                  'originalFilename' => $filename
      ));
    } catch (Zend_File_Transfer_Exception $e) {
      // TODO: handle upload exception
      exit('Zend_File_Transfer_Exception: ' . $e->__toString() . '\n\n' . ini_get('upload_max_filesize'));
    } catch (Exception $e) {
      exit('Exception: ' . $e->__toString());
    }
        
    $results = Phusick_Json::encodeArray($model->get($id));
    
    $responseType = $this->_getParam('response_type');
    if ($responseType == 'iframe') {
      $results = "<textarea>$results</textarea>";
    }
    $this->getResponse()->setBody($results);
  }

  public function putAction() {
    $model = $this->getModel();
    $id = $this->_getParam('id');
    $data = $this->_getParam('__requestBody');
    
    if ($model->update($data, $id)) {
      $this->getResponse()
              ->setHttpResponseCode(204)
              ->setBody('')
              ;
    }
  }

  protected function getModel() {
    if (is_null($this->_model)) {
      $this->_model = new Rest_Model_File();
    }
    return $this->_model;
  }

}