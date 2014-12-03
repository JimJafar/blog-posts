# An Object Oriented JavaScript cheat sheet for people who are new to the language

This list is not exhaustive - it's just a collection of the most common patterns beginning JavaScripters are likely to encounter.

I have tried to demonstrate how the concepts work, and when they are useful. I hope it helps some people.

If you just want the code, you can clone my [GitHub repo](https://github.com/JimSangwine/oop-js-cheat-sheet).


## Object literal
The simplest way of logically grouping variables and functions.
`{}` is analogous to `new Object()`

<pre lang="js" toggle="no">
var ObjectLiteral = {
    property: 42,
    method: function() {
        return this.property;
    }
};

console.log(ObjectLiteral.property); // 42
console.log(ObjectLiteral.method()); // 42
</pre>


## Pseudo Class
Useful if you need more than one similar objects that share some functionality.
This pattern attempts to mimic the way classes in other OOP languages like C#, Java etc. with constructors and private members.
JavaScript does not support the traditional concept of classes (although the `class` keyword is being introduced in ES6) and instead uses prototypal inheritance.
See the [Further Reading](#further) section below for more information.

<pre lang="js" toggle="no">
var PseudoClass = function(arg) {
    // This is the constructor

    // Private members:
    var privateProperty = 42;

    var privateMethod = function() {
        return 'private';
    };

    // instance variables - copied by each instance
    this.instanceVariable = arg;

    this.getPrivateProperty = function() {
        return privateProperty;
    };

    this.callPrivateMethod = function() {
        return privateMethod();
    };
};

// The prototype - shared by all instances (NOT copied)
PseudoClass.prototype.instanceVarToString = function() {
    return 'my instanceVariable is ' + this.instanceVariable;
};

// Make some instances
var instanceOne = new PseudoClass('A');
var instanceTwo = new PseudoClass('B');

console.log(instanceOne.privateProperty); // undefined
console.log(instanceTwo.privateProperty); // undefined

console.log(instanceOne.getPrivateProperty()); // 42
console.log(instanceTwo.getPrivateProperty()); // 42

console.log(typeof instanceOne.privateMethod); // undefined
console.log(typeof instanceTwo.privateMethod); // undefined

console.log(instanceOne.callPrivateMethod()); // private
console.log(instanceTwo.callPrivateMethod()); // private

console.log(instanceOne.instanceVariable); // A
console.log(instanceTwo.instanceVariable); // B

console.log(instanceOne.instanceVarToString()); // my instanceVariable is A
console.log(instanceTwo.instanceVarToString()); // my instanceVariable is B
</pre>


## Immediately Invoked Function Expression (IIFE)
Useful for wrapping code so you don't pollute the global scope.

<pre lang="js" toggle="no">
(function() {
    var wrappedVar = 42; // this will not be visible outside the function's scope

    // do something useful here

})(); // <-- the () causes the function to be invoked as soon as it is created

console.log(wrappedVar); // undefined
</pre>


## Closure
A closure is a function or object that is returned from an outer function. 
Functions or objects created in this way maintain access to any other variables, parameters or inner functions created in the scope of the outer function.
Useful for maintaining state using private members.

<pre lang="js" toggle="no">
function Factory(arg) {

    // The returned object or function (closure) will retain access to this function's scope

    // Private (closed) members:
    var privateProperty = arg;

    var privateMethod = function() {
        return 'private';
    };

    // The closure
    return {
        publicProperty: 42,

        getprivateProperty: function() {
            return privateProperty;
        },

        callPrivateMethod: function() {
            return privateMethod();
        },

        setState: function(to) {
            privateProperty = to;
        }
    };
};

var closure = Factory('on');

console.log(typeof privateProperty); // undefined
console.log(typeof privateMethod); // undefined

console.log(closure.privateProperty); // undefined
console.log(typeof closure.privateMethod); // undefined

console.log(closure.publicProperty); // 42

console.log(closure.callPrivateMethod()); // private

console.log(closure.getprivateProperty()); // on
closure.setState('off');
console.log(closure.getprivateProperty()); // off
</pre>


## Module Pattern
The module pattern in it's simplest form is basically a closure wrapped in an IIFE.
Useful for isolating code, for example a library or a namespace. 
Supports private members and exposing a public API. 
Well designed modules operate independently of other code so can be dropped in and out as needed. 
There are many variations on this pattern - see links in the [Further Reading](#further) section below.

<pre lang="js" toggle="no">
var Module = (function() {
    // Private members:
    var privateProperty = 42;

    var privateMethod = function() {
        return 'private';
    };

    // Public members
    return {
        publicProperty: 'pan galactic gargle blaster',

        getprivateProperty: function() {
            return privateProperty;
        },

        callPrivateMethod: function() {
            return privateMethod();
        }
    };
})();
</pre>


<a name="further"></a>
## Further reading

There are many other patterns, and many articles that explain the ones here in more depth.

Here are some that helped me:

 - [Sebastian Porto &raquo; A Plain English Guide to JavaScript Prototypes](http://sporto.github.io/blog/2013/02/22/a-plain-english-guide-to-javascript-prototypes/)
 - [Ben Alman &raquo; Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
 - [Ilya Kantor &raquo; Pseudo classical pattern](http://javascript.info/tutorial/pseudo-classical-pattern)
 - [Ilya Kantor &raquo; Factory constructor pattern](http://javascript.info/tutorial/factory-constructor-pattern)
 - [Jack Franklin &raquo; An introduction to ES6 classes](http://javascriptplayground.com/blog/2014/07/introduction-to-es6-classes-tutorial/)
 - [Ben Cherry &raquo; JavaScript Module Pattern: In-Depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)
 - [Todd Motto &raquo; Mastering the Module Pattern](http://toddmotto.com/mastering-the-module-pattern/)
 - [Carl Danley &raquo; The Revealing Module Pattern](https://carldanley.com/js-revealing-module-pattern/)
 - [Carl Danley &raquo; The Singleton Pattern](https://carldanley.com/js-singleton-pattern/)
 - [Addy Osmani &raquo; Essential JavaScript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)
 - [Addy Osmani &raquo; Essential JavaScript Namespacing Patterns](http://addyosmani.com/blog/essential-js-namespacing/)
 
 
Any comments, suggested changes or additions would be very welcome!