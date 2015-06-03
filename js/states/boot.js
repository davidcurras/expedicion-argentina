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
            this.load.image('loadingBackground', 'assets/backgrounds/background.png');
            this.load.image('progressBarBack', 'assets/backgrounds/progress-bar-back.png');
            this.load.image('progressBarLeft', 'assets/backgrounds/progress-bar-left.png');
            this.load.image('progressBarRight', 'assets/backgrounds/progress-bar-right.png');
            this.load.image('progressBarMiddle', 'assets/backgrounds/progress-bar-middle.png');
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
