<?php

class Common_Helper_Animate extends Zend_Controller_Action_Helper_Abstract {

  public function direct($animation, $delay = false) {
    if (Zend_Controller_Action_HelperBroker::hasHelper('config')) {
      $config = Zend_Controller_Action_HelperBroker::getExistingHelper('config');
      $animationConfig = $config->direct('animation');
    }
    
    if(isset($animationConfig)) {
      switch($animation) {
        case Common_Enum_Animation::DEFAULT_:
          $animation = $animationConfig['default'];
          break;
        case Common_Enum_Animation::ERROR:
          $animation = $animationConfig['error'];
          break;
        case Common_Enum_Animation::NONE:
          $animation = null;
          break;
      }
    }
    Zend_Layout::getMvcInstance()->getView()->animation = $animation;
    Zend_Layout::getMvcInstance()->getView()->animationDelay = $delay;
  }

}