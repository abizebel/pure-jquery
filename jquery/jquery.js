(function() {
    // return to us an intance of something has all of html elements as array
    // var list = new $('li');
    // list[0]
    $ = function(selector) {
        //get elements using selector
        //go thorough each element and copy to "this"
        //set a property length

        //call new $(selector) automatically
        if (!(this instanceof $)) {
            return new $(selector)
        }

        var elements = [];

        if (typeof selector === 'string') {
            var elements = document.querySelectorAll(selector);

        } else {
            //assume array
            elements = selector
        }



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
        return false
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


    var getText = function(el) {
        var txt = "";

        $.each(el.childNodes, function(i, childNode) {
            if (childNode.nodeType === Node.TEXT_NODE) {
                txt = txt + childNode.nodeValue
            } else if (childNode.nodeType === Node.ELEMENT_NODE) {
                txt = txt + getText(childNode)

            }
        })

        return txt;
    }



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
        text: function(newText) {
            if (arguments.length) {
                this.html("")
                return $.each(this, function(i, el) {
                    var text = document.createTextNode(newText);
                    el.appendChild(text)
                })
            } else {
                return this[0] && getText(this[0])
            }
        },
        find: function(selector) {
            var elements = [];

            $.each(this, function(i, el) {
                var els = el.querySelectorAll(selector);
                //hijack push form array
                [].push.apply(elements, els)
            })

            return $(elements)
        },
        next: function() {
            var elements = [];

            $.each(this, function(i, el) {
                var current = el.nextSibling;

                while (current && current.nodeType !== 1) {
                    current = current.nextSibling;
                }


                if (current) {
                    elements.push(current)
                }
            })

            return $(elements)

        },
        prev: function() {
            var elements = [];

            $.each(this, function(i, el) {
                var current = el.previousSibling;

                while (current && current.nodeType !== 1) {
                    current = current.previousSibling;
                }


                if (current) {
                    elements.push(current)
                }
            })

            return $(elements)

        },
        parent: function() {
            var elements = [];

            $.each(this, function(i, el) {
                elements.push(el.parentNode)
            })

            return $(elements)
        }
    })
})()