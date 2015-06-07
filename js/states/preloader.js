ArgExp.PreloaderState = (function() {
    'use strict';

    function PreloaderState(game) {
        if (!(this instanceof PreloaderState)) {
            return new PreloaderState(game);
        }
        this.progressBarWidth = 1110;
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
                x: (this.game.width/2)-554,
                y: (this.game.height/2)+302
            };
            // Loaded in Boot state
            this.preloadBackground = this.add.sprite(0, 0, 'preloadBackground');
            this.progressBarLeft = this.add.sprite(progressBarPosition.x, progressBarPosition.y, 'progressBarLeft');
            this.progressBarMiddle = this.add.sprite(progressBarPosition.x+30, progressBarPosition.y, 'progressBarMiddle');
            this.progressBarRight = this.add.sprite(progressBarPosition.x+30, progressBarPosition.y, 'progressBarRight');
            // Load assets
            this.load.image('selectAreaBackground', 'assets/backgrounds/select-area.png');
            this.load.image('cloudsBackground', 'assets/backgrounds/clouds.png');
            this.load.image('mountainsBackground', 'assets/backgrounds/mountains.png');
            this.load.image('heroeSprite', 'assets/sprites/heroe.png');
            this.load.image('platform', 'assets/sprites/platform.png');
            this.load.image('cloud-platform', 'assets/sprites/cloud-platform.png');
            this.load.spritesheet('dude', 'assets/spritesheets/dude.png', 96, 144);

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
            this.progressBarMiddle.scale.x = this.progressBarWidth * this.preloadProgress;
            this.progressBarRight.position.x = this.progressBarMiddle.position.x + (this.progressBarWidth * this.preloadProgress);
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