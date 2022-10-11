
const app = angular.module('movie',["ngRoute"])
const topbar = document.getElementById('offer')
console.log(topbar.offsetTop,window.pageYOffset)
const details = document.getElementById('movie')





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
    // .when('/offer1/part2',{
    //     templateUrl:'../view/offer2.htm',
    //     controller:'newMovieInfo'

    // })
    
    
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

// controllers.newMovieFetch = function($scope,$http,dataFactory){
//     const data = async function(){
//         console.log($scope.name)
//          console.log(await dataFactory.getMovieData($scope.name))
//          store = await dataFactory.getMovieData($scope.name)
         
//          $scope.movies = store.slice(store.length/2,store.length)

//     }
   
// }


controllers.movieFetch = function($scope,$http,dataFactory){
    $scope.movies=[]
   // $scope.name = "chicken"
    

  
    //console.log($http.get(url).then((data)=>data.data.hits))
    let store = {}
   
    const data = async function(){
       console.log($scope.name)
        console.log(await dataFactory.getMovieData($scope.name))
        store = await dataFactory.getMovieData($scope.name)
        
        $scope.movies = store
        //.slice(0,store.length/2)
        console.log("in")
        console.log(store.slice(0,store.length/2),"cut")
        
            // if(window.pageYOffset > 0 && window.pageYOffset < 600){
            //     console.log("hi")
            //     for(let i = 0;i<store.length/2;i++){
            //         console.log(store[i])
            //         $scope.movies.push(store[i])
            //     }
            // }
            // else{
            //     for(let i = store.length/2; store.length;i++){
            //         console.log(store[i])
            //         $scope.movies.push(store[i])
            //     }

            // }

        
        // for(let i=val1;i<val2;i++){
        //     $scope.movies.push(store[i])
        // }
        //$scope.movies.push(store.slice(val1,val2))
        console.log($scope.movies,"store")

        $scope.iterator = angular.element(document.getElementById('mov'))
       
        
       
     }

    $scope.lazyLoad = function(){
      
            //setTimeout(data(0,store.length/4),100)
            data()
            data()
            let cnt = document.querySelector('.container')
            let cnt1 = document.querySelector('.container-1')
            let cnt2 = document.querySelector('.container-2')
            console.log(window.pageYOffset)
            window.addEventListener('scroll',()=>{
                if(window.pageYOffset >= 50){
                    cnt.style.display="flex"
                }
                if(window.pageYOffset >= 600){
                    cnt1.style.display="flex"
                }
                if(window.pageYOffset >= 800){
                    cnt2.style.display="block"
                }

            })
            
                
            
            console.log(cnt)
            

            
            // $(function() {
            //     $('.image').Lazy();
                
            //     console.log("lazy")
            // });
              // get
            
            
                   
           
            
            
            
        
           
    }
    //console.log($document.querySelector('.container'))
   
    //$scope.lazyLoad()
    

    

    // const myScrollFunc = function () {
    //     let y = window.pageYOffset;
       
    //     let unit = document.getElementById('mov')
    //        for(let i = 0 ;i< unit.length/2;i++){
    //             console.log(div,"phase1")
    //        }
    //     if (y >= 100) {
    //        let unit = document.getElementById('mov')
    //        for(let i = 0 ;i< unit.length/2;i++){
    //             console.log(div,"phase1")
    //        }
    //     } 
    //     else if(y>=600){
    //         let unit = document.getElementById('mov')
    //        for(let i = unit.length/2 ;i< unit.length;i++){
    //             console.log(div,"phase2")
    //        }

    //     }
    //     else {
    //        console.log(y)
    //     }
    // };

    // window.addEventListener("scroll", myScrollFunc);
   
   
   

    
    
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
    // let count = 1
    
    //     window.addEventListener('scroll',()=>{
    //         //$scope.movies.push(store.slice(0,store.length/2))
    //         if(window.pageYOffset > 620){
               
                
                
    //             // $scope.movies.push(store.slice(store.length/4,store.length/2))
    //             data(store.length/4,store.length/2)
    //             count++
    //             console.log("loading...",$scope.movies,count)
    
    
    //         }
    //         else if(window.pageYOffset > 850){
               
                
                
    //             // $scope.movies.push(store.slice(store.length/4,store.length/2))
    //             data(store.length/2,store.length)
    //             count++
    //             console.log("loading...",$scope.movies,count)
    
    
    //         }
            
    //         // else if(window.pageYOffset > 1000){
                
                
    //         //     $scope.movies.push(store.slice(store.length/2,store.length))
    //         //     console.log("loading again",$scope.movies)
    
    
    //         // }
    
    //     })
        
    
    
    
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
    console.log("====#=====Det=====#====")
    console.log(item,newUrl)
    $http.get(newUrl).then((data)=> $scope.movies = data.data.hits)
    console.log($scope.movies)
    $scope.movie = bucket
    console.log($scope.movie)
}



// $(document).ready(function() {
//     $ ("#mov").lazyScrollLoading({
//     isDefaultLazyImageMode : true
//     });
//     });
    



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











