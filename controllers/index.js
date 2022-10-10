
const app = angular.module('movie',["ngRoute"])
const topbar = document.getElementById('offer')
console.log(topbar.offsetTop,window.pageYOffset)
const details = document.querySelector('.movies')


let controllers = {}

// app.config(["$routeProvider",RouteConfig])

app.config(function ($routeProvider) {
    $routeProvider.when('/offer1', {
        templateUrl: '../view/offer1.htm',
        controller: 'offer',

    }).when('/offer2', {
        template: '<h1>Test offer 2</h1>',
    }).when('/offer2/:item',{
        templateUrl:'../view/details.html',
        controller:'movieInfo'

    })
    
    ;
});

app.service('Config',function($http){
    return function() {
        return $http.get('config.json');
      };
})

app.factory('dataFactory',function($http){
    // let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${food}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
    // console.log(url)
    // movies = $http.get(url).then((data)=>data.data)
    // console.log(movies)

    let factories = {}

    // factories.getData = function(){
    //     console.log("Data loading",movies)
        
    // }
    factories.getMovieData =  async function(value){
        let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${value}&app_id=4e32da9c&app_key=efdfa913dbc17776fa8cbd36ab42b94f`
        console.log(url) 
        let data ={}
        await $http.get(url).then((d)=>data = d.data.hits)
        console.log("factory data",data)

        

        // return {
        //     getData: function (callback) {
        //         return promise.success(callback);
        //     }
        return data
         
         
        
        //console.log(result,"res")
       
    }

    return factories

})


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

controllers.movieFetch = function($scope,$http,dataFactory){
    $scope.movies=[]
    

  
    //console.log($http.get(url).then((data)=>data.data.hits))
    let store = {}
   
    const data = async function(val1,val2){
       
        console.log(await dataFactory.getMovieData($scope.name))
        store = await dataFactory.getMovieData($scope.name)
        console.log(store,"store")
        $scope.movies = store
        console.log(store.slice(0,store.length/2),"cut")
        $scope.movies.push(store.slice(val1,val2))
     }

    $scope.lazyLoad = function(){
        data(0,store.length/4)
    }
    
    
   
   
   

    
    
    // $scope.getMovieData = async function(){
    //     //Promise.then(dataFactory.getMovieData($scope.name))
    //     console.log($scope.movies,"new data")
    //     console.log(typeof($scope.movies),"sc")
    //     let store = {}
    //     let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${$scope.name}&app_id=4e32da9c&app_key=efdfa913dbc17776fa8cbd36ab42b94f`
    //     console.log(url) 
    //     await $http.get(url).then((data)=> store = data.data.hits)
    //      console.log(store)
        
    //     //console.log(result,"res")
       
    // }

    //window.addEventListener('scroll', ()=>setTimeout($scope.getMovieData,1000))
    let count = 1
    
        window.addEventListener('scroll',()=>{
            //$scope.movies.push(store.slice(0,store.length/2))
            if(count ===1 && window.pageYOffset > 650){
               
                
                
                // $scope.movies.push(store.slice(store.length/4,store.length/2))
                data(store.length/4,store.length/2)
                count++
                console.log("loading...",$scope.movies,count)
    
    
            }
            else if(count ===2 && window.pageYOffset > 850){
               
                
                
                // $scope.movies.push(store.slice(store.length/4,store.length/2))
                data(store.length/2,store.length)
                count++
                console.log("loading...",$scope.movies,count)
    
    
            }
            else{
                console.log("Done")
            }
            // else if(window.pageYOffset > 1000){
                
                
            //     $scope.movies.push(store.slice(store.length/2,store.length))
            //     console.log("loading again",$scope.movies)
    
    
            // }
    
        })
        
    
    
    
    //console.log(Promise.resolve(getMovieData(url)).then((data)=>result.push(data)))
   //getMovieData(url)
   //console.log($scope.movies)
   
    
    //$http.get('../asserts/movie.json').then((data)=>$scope.movies=data.data)

    //$scope.movies = dataFactory.getData($scope.name)
   
    $scope.movieInfo = function(movie){
    console.log('testing',movie)
    
    bucket = movie.recipe
    console.log(movie.recipe.label)
    location.href=`#!/offer2/${movie.recipe.label}`
    console.log(location.href)

}


}
controllers.movieInfo=function($scope,$routeParams,$http)
{   let item = $routeParams.item
    item=encodeURIComponent(item.trim())
    console.log(item,"item")
    let newUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=4e32da9c&app_key=efdfa913dbc17776fa8cbd36ab42b94f`
    console.log("=========Det=========")
    console.log(item,newUrl)
    $http.get(newUrl).then((data)=> $scope.movies = data.data.hits)
    console.log($scope.movies)
    $scope.movie = bucket
    console.log($scope.movie)
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







