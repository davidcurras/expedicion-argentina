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
            this.load.image('preloaderBackground', 'assets/misc/preloader_background.jpg');
            this.load.image('preloaderBar', 'assets/misc/preloader_bar.png');
        },

        create: function () {
            // Not multi-touch
            this.input.maxPointers = 1;
            // Scale game size
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.maxWidth = (window.innerHeight * 640) / 480;
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
