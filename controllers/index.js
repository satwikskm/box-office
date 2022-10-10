const app = angular.module('movie',["ngRoute"])

let controllers = {}

// app.config(["$routeProvider",RouteConfig])

app.config(function ($routeProvider) {
    $routeProvider.when('/offer1', {
        templateUrl: '../view/offer1.htm',
        controller: 'offer'
    }).when('/offer2', {
        template: '<h1>Test offer 2</h1>',
    }).when('/offer2/movie',{
        templateUrl:'../view/details.html',
        controller:'movieInfo'

    })
    
    ;
});

app.factory()


// function RouteConfig($routeProvider) {
//     $routeProvider
//     .when("/offer1", {
//         templateUrl: "../view/offer1.htm",
//         controller: "OfferController",
//         // resolve: {
//         //     loadAppModule: [
//         //         "$q",
//         //         "$ocLazyLoad",
//         //         ($q, $ocLazyLoad) => {
//         //             return $q((resolve) => {
//         //                 require.ensure(
//         //                     [
//         //                         "./offer.controller.js",
//         //                     ],
//         //                     (require) => {
//         //                         let mm = require("./offer.controller.js");
//         //                         $ocLazyLoad.load([
//         //                             { name: mm.default.name },
//         //                         ]);
//         //                         resolve(mm.controller);
//         //                     }
//         //                 );
//         //             });
//         //         },
//         //     ],
//         // },
//     })

//     .otherwise({redirectTo: '/'});
// };

// controllers.message1 = function($scope){
//     $scope.message = "This is it Offer1"
// }
// controllers.message2 = function($scope){
//     $scope.message = "This is it Offer2"
// }
// controllers.message3 = function($scope){
//     $scope.message = "This is it Offer3"
// }

let bucket = {}

controllers.movieFetch = function($scope,$http){
    $scope.movies=[]
    $http.get('../asserts/movie.json').then((data)=>$scope.movies=data.data)
   
    $scope.movieInfo = function(movie){
    console.log('testing',movie)
    
    bucket = movie
    location.href='#!/offer2/movie'
    console.log(location.href)

}

}
controllers.movieInfo=function($scope)
{
    $scope.movie = bucket
}

// function dataFeatch(data){
//     console.log(data)
// }




// let data = []
// controller.movieData = function($scope){
//     data = $scope.movie
// }



// $scope.movieInfo = function(movie){
//     console.log(movie)
// }

//document.getElementById('btn').onclick(window.location ='/movie')


controllers.offer = function($scope){
    $scope.message="This is it "
}

app.controller(controllers)



