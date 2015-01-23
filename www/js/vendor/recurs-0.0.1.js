(function () {
    // Recurs returns new Library object that hold our selector. Ex: Recurs('.wrapper')
    var Recurs = function (params) {
        return new Library(params);
    };

    // In our Library we get our selector with querySelectorAll (we do not support < ie8)
    var Library = function (params) {
        // Get params
        var selector = document.querySelectorAll(params),
            i = 0;
        // Get selector length
        this.length = selector.length;
        this.version = '0.1.0';

        // Add selector to object for method chaining
        for (; i < this.length; i++) {
            this[i] = selector[i];
        }

        // Return as object
        return this;
    };

    // create web audio api context
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Begin extending Library object.
    Recurs.fn = Library.prototype =
    {
        /**
         * Hide element(s) from DOM
         * @returns {*}
         */
        hide: function () {
            var len = this.length;
            // Here we simply loop through our object (this) and set the css to display none.
            //If you got more that 1 node from DOM selected with querySelectorAll, you would hide them all.
            while (len--) {
                this[len].style.display = 'none';
            }

            // It's important to return this if you want to chain methods!
            return this;
        },

        /**
         * Show element(s) from DOM
         * @returns {*}
         */
        show: function () {
            var len = this.length;
            while (len--) {
                this[len].style.display = 'block';
            }

            return this;
        },

        /**
         * Log element(s) from DOM
         * @returns {*}
         */
        logg: function () {
            var len = this.length;

            console.log(this[0].innerHTML);

            // It's important to return this if you want to chain methods!
            return this;
        },

        /**
         * Start element(s) from DOM
         * @returns {*}
         */
        node: function (type, value) {

            // create Oscillator node
            this.oscillator = audioCtx.createOscillator();
            this.gainNode = audioCtx.createGain();

            this.oscillator.connect(this.gainNode);
            this.gainNode.connect(audioCtx.destination);

            this.oscillator.type = type;
            this.oscillator.frequency.value = value; // value in hertz

            return this;
        },

        /**
         * Start node
         * @returns {*}
         */
        start: function () {

            this.oscillator.start();

            return this;
        },

        /**
         * Stop node
         * @returns {*}
         */
        stop: function () {

            this.oscillator.stop();

            return this;
        }
    };

    // Assign our Recurs object to global window object.
    if(!window.Recurs) {
        window.Recurs = Recurs;
    }
})();
