'use strict';

var ArgExp = {};

ArgExp.BootState = (function() {

    function BootState(game) {
        if (!(this instanceof BootState)) {
            return new BootState(game);
        }
    }

    BootState.prototype = {
        preload: function () {
            this.load.image('preloadBackground', 'assets/backgrounds/preload.png');
            this.load.image('progressBarBackground', 'assets/backgrounds/progress-bar.png');
            this.load.image('progressBarLeft', 'assets/misc/progress-bar-left.png');
            this.load.image('progressBarRight', 'assets/misc/progress-bar-right.png');
            this.load.image('progressBarMiddle', 'assets/misc/progress-bar-middle.png');
        },

        create: function () {
            // Not multi-touch
            this.input.maxPointers = 1;
            // Scale game size
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.maxWidth = (window.innerHeight * 2640) / 1440;
            this.scale.maxHeight = window.innerHeight;
            this.scale.setScreenSize(true);
            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
            // Set arcade physics
            this.physics.startSystem(Phaser.Physics.ARCADE);
            // Load next state
            this.state.start('Preloader');
        }
    };

    return BootState;
}());
