ArgExp.PreloaderState = (function() {
    'use strict';

    function PreloaderState(game) {
        if (!(this instanceof PreloaderState)) {
            return new PreloaderState(game);
        }
        this.background = null;
        this.preloadBar = null;
        this.ready = false;
    }

    PreloaderState.prototype = {

        preload: function () {
            // Loaded in Boot state
            this.background = this.add.sprite(0, 0, 'preloaderBackground');
            this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');
            // Set the preloadBar sprite as a loader sprite.
            this.load.setPreloadSprite(this.preloadBar);
            // Load assets
            this.load.image('trees', 'assets/misc/trees-h.png');
            this.load.image('background', 'assets/misc/clouds-h.png');
            this.load.image('platform', 'assets/misc/platform.png');
            this.load.image('cloud-platform', 'assets/misc/cloud-platform.png');
            this.load.spritesheet('dude', 'assets/misc/dude.png', 32, 48);

            // Capture keys
            this.input.keyboard.addKeyCapture([
                Phaser.Keyboard.UP,
                Phaser.Keyboard.DOWN,
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT
            ]);
        },

        create: function () {
            // Disable the crop to wait in the update loop for the music decodes
            this.preloadBar.cropEnabled = false;
        },

        update: function () {
            //Make sure all our mp3s have decoded before starting the game
            if (!this.ready){
                // var allDecoded = this.cache.isSoundDecoded('brickDeath') &&
                //     this.cache.isSoundDecoded('countdownBlip') &&
                //     this.cache.isSoundDecoded('powerdown') &&
                //     this.cache.isSoundDecoded('powerup') &&
                //     this.cache.isSoundDecoded('recover');
                // if (allDecoded) {
                    this.ready = true;
                    this.state.start('Menu');
                // }
            }
        }
    };

    return PreloaderState;
}());