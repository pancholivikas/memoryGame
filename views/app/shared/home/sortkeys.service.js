(function() {
  'use strict';

  angular
    .module('app')
    .factory('sortkeys', sortkeys);

  sortkeys.$inject = ['$http', '$q'];
  /* @ngInject */
  function sortkeys($http, $q) {
    var service = {
      getSortKeys: getSortKeys
    };

    return service;
    
    function getSortKeys() {
      return $http.get('/views/app/config/sortkeys.json')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }
    
  }
})();