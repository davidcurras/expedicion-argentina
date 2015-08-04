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
            this.load.image('selectLevelBackground', 'assets/backgrounds/select-level.png');
            this.load.image('cloudsOrangeBackground', 'assets/backgrounds/clouds-orange.png');
            this.load.image('cloudsBlueBackground', 'assets/backgrounds/clouds-blue.png');
            this.load.image('mountainsFarBackground', 'assets/backgrounds/mountains-far.png');
            this.load.image('mountainsNearBackground', 'assets/backgrounds/mountains-near.png');
            this.load.image('sunMenu', 'assets/misc/sun.png');
            this.load.image('blackboard', 'assets/misc/blackboard.png');
            this.load.image('heroeSprite', 'assets/misc/heroe.png');
            this.load.image('strawberrySprite', 'assets/sprites/strawberry.png');
            this.load.image('orangeSprite', 'assets/sprites/orange.png');
            this.load.image('grapesSprite', 'assets/sprites/grapes.png');
            this.load.image('bushSprite', 'assets/sprites/bush.png');
            this.load.image('treeSprite', 'assets/sprites/tree.png');
            this.load.tilemap('pampaMap', 'assets/tilemaps/pampa.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('pampa', 'assets/tilemaps/pampa.png');
            this.load.spritesheet('hero', 'assets/spritesheets/hero.png', 179, 180);
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