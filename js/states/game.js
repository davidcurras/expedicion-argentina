ArgExp.GameState = (function() {
    'use strict';

    function GameState(game) {
        if (!(this instanceof GameState)) {
            return new GameState(game);
        }

        /**
         * When a State is added to Phaser it automatically has the following properties set on it
         * even if they already exist, and do consider them as being 'reserved words':
            this.game        a reference to the currently running game
            this.add        used to add sprites, text, groups, etc
            this.camera        a reference to the game camera
            this.cache         the game cache
            this.input         the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
            this.load         for preloading assets
            this.math         lots of useful common math operations
            this.sound         the sound manager - add a sound, play one, set-up markers, etc
            this.stage         the game stage
            this.time         the clock
            this.tweens     the tween manager
            this.world         the game world
            this.particles     the particle manager
            this.physics     the physics manager
            this.rnd         he repeatable random number generator
        */

        this.debug = false;
        this.bg = null;
        this.mountains = null;
        this.player = null;
        this.facing = 'left';
        this.jumpTimer = 0;
        this.cursors = null;
        this.jumpButton = null;
        this.map = null;
        this.layer = null;
    }

    GameState.prototype = {

        init: function () {
            this.physics.startSystem(Phaser.Physics.P2JS);
        },

        create: function () {
            this.physics.startSystem(Phaser.Physics.P2JS);
            this.stage.backgroundColor = '#2d2d2d';
            this.map = this.add.tilemap('pampa');
            this.map.addTilesetImage('pampa');
            this.layer = this.map.createLayer('ground');
            this.layer.resizeWorld();
            //  Set the tiles for collision.
            //  Do this BEFORE generating the p2 bodies below.
            this.map.setCollisionBetween(1, 12);
            //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
            //  This call returns an array of body objects which you can perform addition actions on if
            //  required. There is also a parameter to control optimising the map build.
            this.physics.p2.convertTilemap(this.map, this.layer);
            this.physics.p2.restitution = 0.5;
            this.physics.p2.gravity.y = 600;
            this.player = this.add.sprite(145, 174, 'hero');
            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
            this.player.animations.add('turn', [4], 20, true);
            this.player.animations.add('right', [4, 5, 6, 7], 10, true);
            this.physics.p2.enable(this.player);
            this.player.body.fixedRotation = true;
            // player.body.setMaterial(characterMaterial);
            this.camera.follow(this.player);
            this.cursors = this.input.keyboard.createCursorKeys();
            this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        },

        update: function () {
            if (this.cursors.left.isDown) {
                this.player.body.moveLeft(400);
                if (this.facing != 'left') {
                    this.player.animations.play('left');
                    this.facing = 'left';
                }
            } else if (this.cursors.right.isDown) {
                this.player.body.moveRight(400);
                if (this.facing != 'right') {
                    this.player.animations.play('right');
                    this.facing = 'right';
                }
            } else {
                this.player.body.velocity.x = 0;
                if (this.facing != 'idle') {
                    this.player.animations.stop();
                    if (this.facing == 'left') {
                        this.player.frame = 0;
                    } else {
                        this.player.frame = 5;
                    }
                    this.facing = 'idle';
                }
            }
            if (this.jumpButton.isDown && this.game.time.now > this.jumpTimer && this.checkIfCanJump()) {
                this.player.body.moveUp(600);
                this.jumpTimer = this.game.time.now + 750;
            }
        },

        render: function () { },

        checkIfCanJump: function() {
            var i, c, d, yAxis = p2.vec2.fromValues(0, 1), result = false;
            for (i = 0; i < this.physics.p2.world.narrowphase.contactEquations.length; i++) {
                c = this.physics.p2.world.narrowphase.contactEquations[i];
                if (c.bodyA === this.player.body.data || c.bodyB === this.player.body.data) {
                    d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                    if (c.bodyA === this.player.body.data) {
                        d *= -1;
                    }
                    if (d > 0.5) {
                        result = true;
                    }
                }
            }
            return result;
        }
    };

    return GameState;
}());
