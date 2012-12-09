<?php

class Default_Form_LoginForm extends Zend_Form {
  
  public function __construct($options = null) {
    parent::__construct($options);
    
    $this->setName('login');
    
    $username = new Zend_Form_Element_Text('username');
    $username->setLabel('auth.username')
            ->setRequired()
            ->removeDecorator('Errors')
            ->setAttrib('autocomplete', 'off');
    
    $password = new Zend_Form_Element_Password('password');
    $password->setLabel('auth.password')
            ->removeDecorator('Errors');
    
    $redirectUri = new Zend_Form_Element_Hidden('redirect');
    $redirectUri->setDecorators(array('ViewHelper'));
    
    $login = new Zend_Form_Element_Submit('login');
    $login->setLabel('auth.login');
    $login->setDecorators(array('ViewHelper'));
    
    $this->addElements(array($username, $password, $redirectUri, $login));
    $this->setMethod('post');
    
    $this->setAction('/auth/login');
    $this->setAttrib('class', 'login-form');
  }
  
}
