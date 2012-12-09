<?php

class Default_EventsController extends Zend_Controller_Action {
  
  private $model;

  public function init() {
    $this->view->headTitle($this->_helper->translate('nav.events'), 'PREPEND');
    $this->view->headScript()->appendFile(
            '/site/themes/default/js/events.js', 'text/javascript',
            array('defer' => 'defer'));
  }

  public function indexAction() {
    $events = $this->getModel()->fetchUpcomimg();
    
    $filesModel = new Default_Model_Files();
    foreach($events as $key => $value) {
      $id = $events[$key]['id'];
      $events[$key]['files'] = $filesModel->fetchByParentId($id);
    }
    
    $this->view->events = $events;
  }

  public function historyAction() {
    $events = $this->getModel()->fetchHistory();

    $filesModel = new Default_Model_Files();
    foreach($events as $key => $value) {
      $id = $events[$key]['id'];
      $events[$key]['files'] = $filesModel->fetchByParentId($id);
    }
 
    $this->view->events = $events;
 
    $this->render('index');
  }
  
  private function getModel() {
    if(is_null($this->model)) {
      $this->model = new Default_Model_Events();
    }
    return $this->model;
  }
  
}

