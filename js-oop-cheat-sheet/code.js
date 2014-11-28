/**
 * Created by jim on 28/11/14.
 */

// Object literal
// Useful for simple, one time use objects.
var LifeTheUniverseAndEverything = {
    theAnswer: 42,
    theQuestion: function() {
        return this.theAnswer;
    }
}

console.log(SimpleObj.theAnswer);
console.log(SimpleObj.theQuestion());

// Pseudo class with constructor and private members
// Useful if you need more than one similar objects that share some functionality
var SimpleBeerClass = function(malt, hops, yeast, water) {
    // This is the constructor

    // Private member:
    var brew = function() {
        return ((malt / water) * 100) + '%';
    };

    // instance variables - copied by each instance
    this.hops = hops;
    this.yeast = yeast;
    this.strength = brew();
};

// The prototype - shared by all instances
SimpleBeerClass.prototype.getBitterness = function() {
    return this.hops / this.malt
}
