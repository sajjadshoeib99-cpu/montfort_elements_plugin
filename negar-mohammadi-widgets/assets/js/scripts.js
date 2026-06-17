(function($) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */
    const NMGlobalEffectsHandler = function($scope, $) {
        const cursor = $scope.find('.nm-custom-cursor-dot');
        const cursorOuter = $scope.find('.nm-custom-cursor-outer');

        if (cursor.length && cursorOuter.length) {
            $(document).on('mousemove', (e) => {
                const { clientX: x, clientY: y } = e;
                cursor.css('transform', `translate3d(${x}px, ${y}px, 0)`);
                cursorOuter.css('transform', `translate3d(${x}px, ${y}px, 0)`);
            });
        }
    };

    const NMMetamorphosisHandler = function($scope, $) {
        const container = $scope.find('.nm-metamorphosis-container');
        const slider = $scope.find('.nm-metamorphosis-slider');
        const line = $scope.find('.nm-metamorphosis-line');
        const overlay = $scope.find('.nm-metamorphosis-overlay');

        if (container.length && slider.length && line.length && overlay.length) {
            container.on('mousemove touchmove', (e) => {
                const rect = container[0].getBoundingClientRect();
                let clientX = e.clientX || (e.originalEvent.touches ? e.originalEvent.touches[0].clientX : 0);
                let x = ((clientX - rect.left) / rect.width) * 100;
                x = Math.max(0, Math.min(100, x));
                line.css('left', `${x}%`);
                overlay.css('clip-path', `inset(0 ${100 - x}% 0 0)`);
            });
        }
    };

    const NMTestimonialsHandler = function($scope, $) {
        const buttons = $scope.find('.nm-testimonial-button');
        const items = $scope.find('.nm-testimonial-item');

        buttons.on('click', function() {
            const index = $(this).data('index');

            buttons.removeClass('active');
            $(this).addClass('active');

            items.css({
                'opacity': '0',
                'pointer-events': 'none',
                'filter': 'blur(10px)',
                'transform': 'translateY(10px)'
            });

            const currentItem = items.eq(index);
            currentItem.css({
                'opacity': '1',
                'pointer-events': 'auto',
                'filter': 'blur(0px)',
                'transform': 'translateY(0)'
            });
        });
    };

    // Make sure you run this code under Elementor.
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/nm_global_effects.default', NMGlobalEffectsHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/nm_metamorphosis.default', NMMetamorphosisHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/nm_testimonials.default', NMTestimonialsHandler);
    });
})(jQuery);
