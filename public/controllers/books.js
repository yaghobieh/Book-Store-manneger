angular.module('myBook', [])
    .controller('BooksController', function($scope, $http, $location, $routeParams){
        
        $scope.getBooks = function(){
            $http.get('/api/books').then(function(data){
                $scope.books = data.data;
            });
        }
    
        $scope.getBook = function(){
            var id = $routeParams.id;
            $http.get('/api/books/'+id).then(function(data){
                $scope.book = data.data;
            });
        }
    
        $scope.addBook = function(){
            console.log($scope.book);
            $http.post('/api/books/', $scope.book).then(function(data){
                window.location.href='#/books';
            });
        }
    
        $scope.updateBook = function(){
            var id = $routeParams.id;
            $http.put('/api/books/'+id, $scope.book).then(function(data){
                window.location.href='#/books';
            });
        }
    
        $scope.removeBook = function(id){
            $http.delete('/api/books/'+id).then(function(data){
                window.location.href='#/books';
            });
        }

    })