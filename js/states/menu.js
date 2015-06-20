ArgExp.MenuState = (function() {
    'use strict';

    function MenuState(game) {
        if (!(this instanceof MenuState)) {
            return new MenuState(game);
        }
        this.menuBackground = null;
        this.sunMenu = null;
        this.menuFrontBackground = null;
        this.playText = null;
        this.creditsText = null;
    }

    MenuState.prototype = {

        create: function () {
            var sunPosition = {
                x: (this.game.world.centerX)-90,
                y: (this.game.world.centerY)-280
            };
            var textPosition = {
                x: (this.game.world.centerX),
                y: (this.game.world.centerY)+58
            };
            this.menuBackground = this.add.sprite(0, 0, 'menuBackground');
            this.sunMenu = this.add.sprite(sunPosition.x, sunPosition.y, 'sunMenu');
            this.sunMenu.anchor.setTo(0.5, 0.5);
            this.menuFrontBackground = this.add.sprite(0, 0, 'menuFrontBackground');
            this.playText = this.add.text(textPosition.x, textPosition.y, 'JUGAR', { font: "90px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.playText.anchor.setTo(0.5, 0.5);
            this.playText.inputEnabled = true;
            this.playText.events.onInputDown.add(this.play, this);
            this.creditsText = this.add.text(textPosition.x, textPosition.y+155, 'CRÉDITOS', { font: "90px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.creditsText.anchor.setTo(0.5, 0.5);
            this.creditsText.inputEnabled = true;
            this.creditsText.events.onInputDown.add(this.credits, this);
        },

        update: function () {
            this.sunMenu.angle += 0.3;
        },

        play: function() {
            this.state.start('SelectArea');
        },

        credits: function() {
            this.state.start('Credits');
        }
    };

    return MenuState;
}());
