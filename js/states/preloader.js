ArgExp.PreloaderState = (function() {
    'use strict';

    function PreloaderState(game) {
        if (!(this instanceof PreloaderState)) {
            return new PreloaderState(game);
        }
        this.background = null;
        this.preloadBarBack = null;
        this.progressBarLeft = null;
        this.progressBarMiddle = null;
        this.progressBarRight = null;
        this.preloadProgress = null;
        this.ready = false;
    }

    PreloaderState.prototype = {

        preload: function () {
            // Capture keys
            this.input.keyboard.addKeyCapture([
                Phaser.Keyboard.UP,
                Phaser.Keyboard.DOWN,
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT
            ]);
        },

        create: function () {
            var progressBarPosition = {
                x: (this.game.width/2)-(this.game.cache.getImage('progressBarBackground').width/2),
                y: (this.game.height/2)+350
            };
            // Loaded in Boot state
            this.preloadBackground = this.add.sprite(0, 0, 'preloadBackground');
            this.preloadBarBack = this.add.sprite(progressBarPosition.x, progressBarPosition.y, 'progressBarBackground');
            this.progressBarLeft = this.add.sprite(progressBarPosition.x+12, progressBarPosition.y+12, 'progressBarLeft');
            this.progressBarMiddle = this.add.sprite(progressBarPosition.x+50, progressBarPosition.y+12, 'progressBarMiddle');
            this.progressBarRight = this.add.sprite(progressBarPosition.x+50, progressBarPosition.y+12, 'progressBarRight');
            // Load assets
            this.load.image('trees', 'assets/misc/trees-h.png');
            this.load.image('background', 'assets/misc/clouds-h.png');
            this.load.image('platform', 'assets/misc/platform.png');
            this.load.image('cloud-platform', 'assets/misc/cloud-platform.png');
            this.load.spritesheet('dude', 'assets/misc/dude.png', 32, 48);

            this.load.onFileComplete.add(this.fileComplete, this);
            this.load.start();
        },

        fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
            this.preloadProgress = progress / 100;
            if(progress > 99) {
                this.ready = true;
            }
        },

        update: function () {
            //Make sure all our mp3s have decoded before starting the game
            this.progressBarMiddle.scale.x = (this.game.cache.getImage('progressBarBackground').width - 104) * this.preloadProgress;
            this.progressBarRight.position.x = this.progressBarMiddle.position.x + (this.game.cache.getImage('progressBarBackground').width - 104) * this.preloadProgress;
            if (this.ready){
                // var allDecoded = this.cache.isSoundDecoded('brickDeath') &&
                //     this.cache.isSoundDecoded('countdownBlip') &&
                //     this.cache.isSoundDecoded('powerdown') &&
                //     this.cache.isSoundDecoded('powerup') &&
                //     this.cache.isSoundDecoded('recover');
                // if (allDecoded) {
                    this.state.start('Menu');
                // }
            }
        }
    };

    return PreloaderState;
}());