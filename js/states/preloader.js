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
            var progressBarPosition = {
                x: (this.game.width/2)-(this.game.cache.getImage('progressBarBack').width/2),
                y: (this.game.height/2)+350
            };
            // Loaded in Boot state
            this.background = this.add.sprite(0, 0, 'loadingBackground');
            this.preloadBarBack = this.add.sprite(progressBarPosition.x, progressBarPosition.y, 'progressBarBack');
            this.progressBarLeft = this.add.sprite(progressBarPosition.x+12, progressBarPosition.y+12, 'progressBarLeft');
            this.progressBarMiddle = this.add.sprite(progressBarPosition.x+52, progressBarPosition.y+12, 'progressBarMiddle');
            // Set the preloadBar sprite as a loader sprite.
            this.load.setPreloadSprite(this.progressBarMiddle);
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
            this.progressBarMiddle.cropEnabled = false;
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
                    //this.state.start('Menu');
                // }
            }
        }
    };

    return PreloaderState;
}());