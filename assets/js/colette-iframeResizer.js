colette.iframeResizer = (function() {
    'use strict';

    var pub = {},
        cfg = {
            selector: '#iframeContent',
            el: null,
            delay: 0,
            resizeInternal: false
        };

    pub.init = function(args)
    {
        if (undefined !== args.selector) {
            cfg.selector = args.selector;
        }

        if (undefined !== args.delay) {
            cfg.delay = args.delay;
        }

        cfg.el = document.querySelector(cfg.selector);

        window.addEventListener('message', function(event) {
            // resizeComplete
            if ('resizeComplete' === event.data) {
                iframeResizeComplete();
            }
        });

        window.addEventListener('load', function(e) {
            height();
        });

        window.addEventListener('resize', function(e) {
            height();
        });

    };

    var iframeResizeComplete = function()
    {
        setTimeout(function() {
            cfg.resizeInternal = false;
        }, 500);
    };

    var height = function()
    {
        if (!cfg.resizeInternal) {
            setTimeout(function() {
                sendHeight();
            }, cfg.delay);
        }
    };

    var sendHeight = function()
    {
        window.top.postMessage({type: 'doResize', height: cfg.selector.offsetHeight}, '*');
        cfg.resizeInternal = true;
    };

    return pub;
})();
