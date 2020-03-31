var myApp = angular.module("myApp", ["ngRoute", "ngAnimate"]);

// Replace the ng-controller='CtrlName' with this routing function
myApp.config(function($routeProvider) {
    $routeProvider.when("/books", {
        templateUrl: "partials/book-list.html",
        controller: "BookListCtrl"
    }).when("/cart", {
        templateUrl: "partials/cart-list.html",
        controller: "CartListCtrl"
    }).otherwise({
        redirectTo: "/books"
    });
});

myApp.factory("cartService", function() {
    var cart = [];

    return {
        getCart: function() {
            return cart;
        },
        addToCart: function(book) {
            cart.push(book);
        },
        purchase: function(book) {
            alert("Thanks for purchasing: ", book.name);
        }
    }
});

myApp.factory("bookService", function() {
    var books = [
        {
            imgUrl: "https://www.bookcoversclub.com/wp-content/uploads/2018/07/book-cover-354.jpg",
            name: "Adultery",
            price: 20.5,
            rating: 4,
            binding: "Paperback",
            publisher: "Random House",
            releaseDate: "12-09-2014",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae modi saepe distinctio voluptates vel placeat porro ut consequuntur culpa fuga vero totam at praesentium mollitia corporis dolorem aspernatur, consequatur aliquam."
        },
        {
            imgUrl: "https://www.bookcoversclub.com/wp-content/uploads/2017/07/book-cover-338.jpg",
            name: "Geronimo Silton Spacemice #2",
            price: 16.8,
            rating: 5,
            binding: "Paperback",
            publisher: "Scholastic",
            releaseDate: "07-12-2020",
            details: "A random book with random description."
        },
    ];

    return {
        getBooks: function() {
            return books;
        }
    }
});

myApp.controller("HeaderCtrl", function($scope, $location) {
    $scope.appDetails = {
        title: "BooKart",
        tagline: "We have over a million books for you!"
    };

    $scope.nav = {};
    $scope.nav.isActive = function(path) {
        if (path === $location.path()) {
            return true;
        }

        return false;
    }
});

myApp.controller("CartListCtrl", function($scope, cartService) {
    $scope.cart = cartService.getCart();

    $scope.purchase = function(book) {
        cartService.purchase(book);
    }
});

myApp.controller("BookListCtrl", function($scope, bookService, cartService) {
    $scope.books = bookService.getBooks();

    $scope.addToCart = function(book) {
        cartService.addToCart(book);
    }
});

/* OLD WAY TO DO THIS - NOT MODULAR
var BookListCtrl = function($scope) {
    $scope.books = [
        {
            imgUrl: "https://www.bookcoversclub.com/wp-content/uploads/2018/07/book-cover-354.jpg",
            name: "Adultery",
            price: 20.5,
            rating: 4,
            binding: "Paperback",
            publisher: "Random House",
            releaseDate: "12-09-2014",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae modi saepe distinctio voluptates vel placeat porro ut consequuntur culpa fuga vero totam at praesentium mollitia corporis dolorem aspernatur, consequatur aliquam."
        },
        {
            imgUrl: "https://www.bookcoversclub.com/wp-content/uploads/2017/07/book-cover-338.jpg",
            name: "Geronimo Silton Spacemice #2",
            price: 16.8,
            rating: 5,
            binding: "Paperback",
            publisher: "Scholastic",
            releaseDate: "07-12-2020",
            details: "A random book with random description."
        },
    ];

    $scope.addToCart = function(book) {
        console.log("Add to Cart: ", book);
    }
}*/