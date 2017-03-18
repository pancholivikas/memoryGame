(function() {
  'use strict';

  angular
    .module('app')
    .directive('navbar', function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: '/views/app/shared/navbar/navbar.html'
        }
    });
})();