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
        {
            imgUrl: "https://www.bookcoversclub.com/wp-content/uploads/2018/02/book-cover-352.jpg",
            name: "Wildlife",
            price: 36.8,
            rating: 5,
            binding: "Paperback",
            publisher: "Wild Life",
            releaseDate: "11-03-2001",
            details: "A book about animals"
        },
        {
            imgUrl: "https://i.pinimg.com/originals/1e/c5/df/1ec5df963765d4bcf151467c99d1dae7.jpg",
            name: "Finding Moana",
            price: 4.8,
            rating: 2,
            binding: "Paperback",
            publisher: "Rubbish Company",
            releaseDate: "24-01-1997",
            details: "A trash book, don't buy! Don't you dare..."
        },
        {
            imgUrl: "https://static.wixstatic.com/media/9c4410_876c178659774d75aa6d9ec9fadfa4a2~mv2_d_1650_2550_s_2.jpg/v1/fill/w_270,h_412,al_c,q_80,usm_0.66_1.00_0.01/WILD%20LIGHT%20EBOOK.webp",
            name: "Wild Light",
            price: 99.9,
            rating: 4,
            binding: "Paperback",
            publisher: "Wild Life",
            releaseDate: "29-02-2004",
            details: "Our Wild Life book was a bestseller, so we decided to publish a book about Wild Light"
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