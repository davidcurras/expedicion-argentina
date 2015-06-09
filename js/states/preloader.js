ArgExp.PreloaderState = (function() {
    'use strict';

    function PreloaderState(game) {
        if (!(this instanceof PreloaderState)) {
            return new PreloaderState(game);
        }
        this.progressBarWidth = 1105;
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
                x: (this.game.width/2)-582,
                y: (this.game.height/2)+302
            };
            // Loaded in Boot state
            this.preloadBackground = this.add.sprite(0, 0, 'preloadBackground');
            this.progressBarLeft = this.add.sprite(progressBarPosition.x, progressBarPosition.y, 'progressBarLeft');
            this.progressBarMiddle = this.add.sprite(progressBarPosition.x+30, progressBarPosition.y, 'progressBarMiddle');
            this.progressBarRight = this.add.sprite(progressBarPosition.x+30, progressBarPosition.y, 'progressBarRight');
            // Load assets
            this.load.image('menuBackground', 'assets/backgrounds/menu-back.png');
            this.load.image('menuFrontBackground', 'assets/backgrounds/menu-front.png');
            this.load.image('selectAreaBackground', 'assets/backgrounds/select-area.png');
            this.load.image('cloudsBackground', 'assets/backgrounds/clouds.png');
            this.load.image('mountainsBackground', 'assets/backgrounds/mountains.png');
            this.load.image('sunMenuSprite', 'assets/sprites/sun-menu.png');
            this.load.image('heroeSmSprite', 'assets/sprites/heroe-sm.png');
            this.load.image('heroeSprite', 'assets/sprites/heroe.png');
            this.load.image('ground_1x1', 'assets/tilemaps/ground_1x1.png');
            this.load.image('walls_1x2', 'assets/tilemaps/walls_1x2.png');
            this.load.image('tiles2', 'assets/tilemaps/tiles2.png');
            this.load.tilemap('map', 'assets/tilemaps/map.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.spritesheet('dude', 'assets/spritesheets/dude.png', 64, 96);
            this.load.script('webfont', 'js/utils/google-webfont.js');
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