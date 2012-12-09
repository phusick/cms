<?php

class Default_MembersController extends Zend_Controller_Action {

  public function init() {
    $this->_helper->animate(Common_Enum_Animation::NONE);
  }

  public function indexAction() {
    $this->view->headTitle($this->_helper->translate('nav.members'), 'PREPEND');

    $model = new Default_Model_Members(Zend_Registry::get('acl'));
    $members = $model->fetchAll();
    $this->view->members = $this->addPhotographs($members);
  }

  protected function addPhotographs($members) {
    foreach($members as $id => $member) {
      $members[$id]['photo'] = $this->getPhotograph($member['given-name'], $member['family-name']);
    };
    return $members;
  }
  
  private function getPhotograph($givenName, $familyName) {
    $filename = $this->removeAccents($familyName . ' ' . $givenName);
    $filename = strtolower($filename);
    $filename .= '.jpg'; 
    
    $photo = file_exists($this->buildPath($filename)) ? $filename : FALSE;
      
    return $photo;
  }

  private function removeAccents($str) {
    $table = array(
        ' ' => '-', 'Š' => 'S', 'š' => 's', 'Ð' => 'Dj', 'Ž' => 'Z', 'ž' => 'z', 'Č' => 'C', 'č' => 'c', 'C' => 'C', 'c' => 'c',
        'À' => 'A', 'Á' => 'A', 'Â' => 'A', 'Ã' => 'A', 'Ä' => 'A', 'Å' => 'A', 'Æ' => 'A', 'Ç' => 'C', 'È' => 'E', 'É' => 'E',
        'Ê' => 'E', 'Ë' => 'E', 'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ï' => 'I', 'Ñ' => 'N', 'Ò' => 'O', 'Ó' => 'O', 'Ô' => 'O',
        'Õ' => 'O', 'Ö' => 'O', 'Ø' => 'O', 'Ù' => 'U', 'Ú' => 'U', 'Û' => 'U', 'Ü' => 'U', 'Ý' => 'Y', 'Þ' => 'B', 'ß' => 'Ss',
        'à' => 'a', 'á' => 'a', 'â' => 'a', 'ã' => 'a', 'ä' => 'a', 'å' => 'a', 'æ' => 'a', 'ç' => 'c', 'è' => 'e', 'é' => 'e',
        'ê' => 'e', 'ë' => 'e', 'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i', 'ð' => 'o', 'ñ' => 'n', 'ò' => 'o', 'ó' => 'o',
        'ô' => 'o', 'õ' => 'o', 'ö' => 'o', 'ø' => 'o', 'ù' => 'u', 'ú' => 'u', 'û' => 'u', 'ý' => 'y', 'ý' => 'y', 'þ' => 'b',
        'ÿ' => 'y', 'Ř' => 'R', 'ř' => 'r', "'" => '-', '"' => '-', 'Ť' => 't', 'ť' => 't'
    );
    return strtr($str, $table);
  }
  
  private function buildPath($filename) {
    $path = APPLICATION_PATH . '/../public/content/members/' . $filename;
    return $path;
  }

}
