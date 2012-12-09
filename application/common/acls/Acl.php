<?php

class Common_Acl_Acl extends Zend_Acl {
  
  public function __construct() {
    $this->addRole(new Zend_Acl_Role('guest'));
    $this->addRole(new Zend_Acl_Role('member'), 'guest');
    $this->addRole(new Zend_Acl_Role('editor'), 'member');
    $this->addRole(new Zend_Acl_Role('admin'),  'editor');
    
    $this->add(new Zend_Acl_Resource('default'))
            ->add(new Zend_Acl_Resource('default:auth'), 'default')
            ->add(new Zend_Acl_Resource('default:index'), 'default')
            ->add(new Zend_Acl_Resource('default:posts'), 'default')
            ->add(new Zend_Acl_Resource('default:pages'), 'default')
            ->add(new Zend_Acl_Resource('default:members'), 'default')
            
            ->add(new Zend_Acl_Resource('default:docs'), 'default')
            ->add(new Zend_Acl_Resource('default:events'), 'default')
            ->add(new Zend_Acl_Resource('default:admin'), 'default')
            
            ->add(new Zend_Acl_Resource('default:file'), 'default')
            ;
    

    
    $this->allow('guest', 'default:auth',    'login');
    $this->allow('guest', 'default:index',   'index');
    $this->allow('guest', 'default:posts',   array('index', 'get'));
    $this->allow('guest', 'default:pages',   array('get'));
    $this->allow('guest', 'default:members', 'index');
    
    
    $this->allow('member', 'default:auth', 'logout');
    $this->deny ('member', 'default:auth', 'login');
    $this->allow('member', 'default:docs', array('index', 'folder'));
    $this->allow('member', 'default:events', array('index', 'history'));
    $this->allow('member', 'default:file', 'index');
    
    $this->allow('editor', 'default:admin', array('index', 'devel', 'browser'));
    
    /* MEMBER */
    $this->add(new Zend_Acl_Resource('member-data'));
    $this->allow('guest', 'member-data');
    $this->deny('guest', 'member-data', 'tel');
    $this->allow('member', 'member-data', 'tel');
    
    /* REST */
    $this->add(new Zend_Acl_Resource('rest'))
            ->add(new Zend_Acl_Resource('rest:announcement'), 'rest')
            ->add(new Zend_Acl_Resource('rest:folder'), 'rest')
            ->add(new Zend_Acl_Resource('rest:document'), 'rest')
            ->add(new Zend_Acl_Resource('rest:file'), 'rest')
            ->add(new Zend_Acl_Resource('rest:event'), 'rest')
            ->add(new Zend_Acl_Resource('rest:member'), 'rest')
            ->add(new Zend_Acl_Resource('rest:post'), 'rest')
            ->add(new Zend_Acl_Resource('rest:page'), 'rest')
            ->add(new Zend_Acl_Resource('rest:user'), 'rest')
            ;
    
    $this->allow('admin', 'rest:announcement');
    $this->allow('admin', 'rest:folder');
    $this->allow('admin', 'rest:document');
    $this->allow('admin', 'rest:file');
    $this->allow('admin', 'rest:event');
    $this->allow('admin', 'rest:member');
    $this->allow('admin', 'rest:post');
    $this->allow('admin', 'rest:page');
    $this->allow('admin', 'rest:user');
  }
  
}