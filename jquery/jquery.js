(function() {
    // return to us an intance of something has all of html elements as array
    // var list = new $('li');
    // list[0]
    $ = function(selector) {
        //get elements using selector
        //go thorough each element and copy to "this"
        //set a property length
        var elements = document.querySelectorAll(selector);

        for (var i = 0; i < elements.length; i++) {
            this[i] = elements[i]
        }


        Array.prototype.push.apply(this, elements)

        this.length = elements.length;
    }


    $.extend = function(target, object) {
        //ensure copy properties directly from object not proto chain
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                target[prop] = object[prop]
            }

        }

        return target
    }

    //Static Method
    var isArrayLike = function(obj) {
        if (typeof obj.length === "number") {
            if (obj.length === 0) {
                return true;
            } else if (obj.length > 0) {
                return obj.length - 1 in obj
            }
        }
    }

    //Static Method Extends
    $.extend($, {
        each: function(collection, cb) {
            if (isArrayLike(collection)) {
                for (var i = 0; i < collection.length; i++) {
                    var value = collection[i];
                    cb.call(value, i, value)

                }
            } else {
                for (var prop in collection) {
                    if (collection.hasOwnProperty(prop)) {
                        var value = collection[prop];
                        cb.call(value, i, value)
                    }
                }
            }


            return collection
        },

        makeArray: function(arr) {
            var array = [];
            $.each(function(i, val) {
                array.push(val)
            })

            return array;
        },

        isArray: function(value) {
            return Object.prototype.toString.call(value) === "[object Array]"
        },
    })

    $.extend($.prototype, {
        html: function(newHtml) {
            if (arguments.length) {
                $.each(this, function(i, el) {
                    el.innerHTML = newHtml
                })
                return this;
            } else {
                return this[0].innerHTML;
            }
        },
    })
})()