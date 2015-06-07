ArgExp.CreditsState = (function() {
    'use strict';

    function CreditsState(game) {
        if (!(this instanceof CreditsState)) {
            return new CreditsState(game);
        }
        this.creditsBackground = null;
        this.creditsText = null;
        this.backText = null;
    }

    CreditsState.prototype = {

        create: function () {
            var sunPosition = {
                x: (this.game.world.centerX)-90,
                y: (this.game.world.centerY)-280
            };
            var textPosition = {
                x: (this.game.world.centerX),
                y: (this.game.world.centerY)+58
            };
            this.creditsBackground = this.add.sprite(0, 0, 'menuBackground');
            this.creditsText = this.add.text(textPosition.x, textPosition.y-100, 'CRÉDITOS... integrantes del equipo', { font: "90px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.creditsText.anchor.setTo(0.5, 0.5);
            this.backText = this.add.text(textPosition.x, textPosition.y+150, 'VOLVER', { font: "90px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.backText.anchor.setTo(0.5, 0.5);
            this.backText.inputEnabled = true;
            this.backText.events.onInputDown.add(this.back, this);
        },

        back: function() {
            this.state.start('Menu');
        }
    };

    return CreditsState;
}());
