<?php

class Default_AuthController extends Zend_Controller_Action {

  private $isError = false;
  
  public function init() {
    $this->view->headTitle(
            $this->_helper->translate('auth.login'),
            'PREPEND');
    $this->view->placeholder('bodyCssClass')->set('auth-controller');
  }

  public function loginAction() {
    if (Zend_Auth::getInstance()->hasIdentity()) {
      $this->_redirect('/');
    }

    $request = $this->getRequest();
    $form = new Default_Form_LoginForm();

    if ($request->isPost()) {
      if ($form->isValid($request->getPost())) { 
        $authAdapter = $this->_getAuthAdapter();

        $username = $form->getValue('username');
        $password = $form->getValue('password');
        
        $authAdapter->setIdentity($username)
                    ->setCredential($password);

        $auth = Zend_Auth::getInstance();
        $result = $auth->authenticate($authAdapter);

        if ($result->isValid()) {
          $identity = $authAdapter->getResultRowObject(null, 'password');

          $authStorage = $auth->getStorage();
          $authStorage->write($identity);
          
          $redirectUri = $form->getValue('redirect');
          if($request->getRequestUri() != $redirectUri) {
            $this->_redirect($redirectUri);
          }
          $this->_redirect('/');
          
        } else {
          Zend_Auth::getInstance()->clearIdentity();
          $this->setError(true);
        }
      } else {
        $this->setError(true);
      } 
    } else {
      $form->getElement('redirect')->setValue($request->getRequestUri());
    }
    
    if(!$this->isError) {
      $this->_helper->animate(Common_Enum_Animation::DEFAULT_);
    }
    $this->view->isError = $this->isError;
    $this->view->form = $form;
  }

  public function logoutAction() {
    Zend_Auth::getInstance()->clearIdentity();
    $this->_redirect('/');
  }
  
  private function setError($bool) {
    if(true == $bool) {
      $this->_helper->animate(Common_Enum_Animation::ERROR);
      $this->isError = true;
      return;
    }
    $this->isError = false;
  }

  private function _getAuthAdapter() {
    $salt = Common_Model_DbTable_Users::SALT;
    
    $authAdapter = new Zend_Auth_Adapter_DbTable(Zend_Db_Table::getDefaultAdapter());
    $authAdapter->setTableName('users')
            ->setIdentityColumn('username')
            ->setCredentialColumn('password')
            ->setCredentialTreatment("SHA1(CONCAT(?, '$salt')) AND active = 1");
    
    return $authAdapter;
  }

}