(function(){
  "use strict";

  // Defina main search app
  angular
    .module('searchApp', []);


  // Define main app search controller
  angular
    .module('searchApp')
    .controller('SearchController', SearchController);

  // Define search controller dependencies
  SearchController.$inject = ['searchService'];

  // Search controller
  function SearchController(searchService) {
    var self = this;

    // Search query binded to the search input control
    this.query = '';

    // Search query for the currently displayed results
    this.resultsQuery = '';

    // Search results container
    this.results = [];

    // Search request error info
    this.error = '';

    // Search handler
    this.doSearch = function() {
      // Do search service call
      searchService.searchPhotos(self.query).then(function(data) {
        // Save search query so it can be displayed on page independently
        self.resultsQuery = self.query;

        // Check if data defined, so no error when access it's properties
        if (data) {
          self.error = data.error;
          self.results = data.results;
          return;
        }

        // Somehow nothing returned from search service, then consider as nothing found
        self.error = 'No Results Found';
        self.results = [];
      }).catch(function(error) {
        // Save search query so it can be displayed on page independently
        self.resultsQuery = self.query;

        // Error occured during search service call
        self.error = error || 'Search Failed';
        self.results = [];
      });
    };
  }


  // Search service factory
  angular
    .module('searchApp')
    .factory('searchService', searchService);

  // Define factory dependencies
  searchService.$inject = ['$http'];

  // Search service
  function searchService($http) {
    var searchApi = 'http://localhost:3000/search?query=';

    var service = {
      searchPhotos: searchPhotos
    };

    return service;

    // encodeURIComponent corresponding to RFC 3986
    function fixedEncodeURIComponent (str) {
      return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
    }

    // Searches photos corresponding passed query
    function searchPhotos(query) {
      // Build search api url
      var searchApiUrl = searchApi + fixedEncodeURIComponent(query);

      try {
        // Do search api call
        return $http.get(searchApiUrl)
          .then(getPhotosComplete)
          .catch(getPhotosFailed);
      }
      catch (e) {
        return {error:'err', results:[]};
      }

      // API call was succesfull
      function getPhotosComplete(response) {
        if (!response || !response.data) {
          return {
            error: 'Search Failed',
            results: []
          };
        }

        var data = response.data;

        // Check if api response contains error informaion
        if (data && data.error) {
          return {
            error: response.message || 'Search Failed',
            results: []
          };
        }

        // Check that returned response data contains photo results
        if (data && data.query && data.query.results && data.query.results.photo) {
          // Photos found
          var photo = data.query.results.photo;

          // Check if many or one photo found
          if (angular.isArray(photo)) {
            // Many photos found
            return {
              error: '',
              results: photo
            };
          }

          // Single photo found
          return {
            results: [photo],
            error: ''
          };
        }

        // Nothing found
        return {
          error: 'No Results Found',
          results: []
        };
      }

      // API call failed
      function getPhotosFailed(error) {
        return error || 'Search Failed';
      }
    }
  }

  // Photo search result item template directive
  angular
    .module('searchApp')
    .directive('photo', photoTemplate);

  // Returns phto directive definition
  function photoTemplate() {
    return {
      restrict: 'E',
      templateUrl: 'photo.html'
    };
  }
})();
