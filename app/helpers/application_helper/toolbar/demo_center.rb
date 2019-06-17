class ApplicationHelper::Toolbar::DemoCenter < ApplicationHelper::Toolbar::Basic
  #custom_content('custom', :partial => 'demo/demo_toolbar')
  button_group('demo_bg', [
    button(
      :angularjs_demo,
      'fa fa-cube fa-lg',
      N_('Trigger angular1 component'),
      N_('AngularJS'),
      :data  => {#'toggle'        => 'modal',
                 #'target'        => '#modal_param_div',
                 'function'      => 'sendDataWithRx',
                 'function-data' => '{"type": "demo", "operation": "angularjs"}'},
      :klass => ApplicationHelper::Button::ButtonWithoutRbacCheck
    ),
    button(
      :angular2_demo,
      'fa fa-cubes fa-lg',
      N_('Trigger angular2+ component'),
      N_('Angular'),
      :data  => {'function'      => 'sendDataWithRx',
                 'function-data' => '{"type": "demo", "operation": "angular"}'},
      :klass => ApplicationHelper::Button::ButtonWithoutRbacCheck
    ),
    button(
      :react_demo,
      'fa pficon-build fa-lg',
      N_('Trigger React component'),
      N_('React'),
      :data  => {#'toggle'        => 'modal',
                 #'target'        => '#modal_param_div',
                 'function'      => 'sendDataWithRx',
                 'function-data' => '{"type": "demo", "operation": "react"}'},
      :klass => ApplicationHelper::Button::ButtonWithoutRbacCheck
    ),
  ])
end
