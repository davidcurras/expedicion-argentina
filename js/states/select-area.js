ArgExp.SelectAreaState = (function() {
    'use strict';

    function SelectAreaState(game) {
        if (!(this instanceof SelectAreaState)) {
            return new SelectAreaState(game);
        }
        this.selectAreaBackground = null;
        this.heroeSprite = null;
        this.areaText = null;
        this.playText = null;
        this.backText = null;
        this.areas = {
            'cuyo': {'name': 'CUYO', 'x': 475, 'y': 10, 'width': 200, 'height': 335},
            'norte': {'name': 'EL NORTE', 'x': 825, 'y': 10, 'width': 255, 'height': 355},
            'litoral': {'name': 'EL LITORAL', 'x': 1200, 'y': 10, 'width': 290, 'height': 365},
            'pampa': {'name': 'LA PAMPA', 'x': 825, 'y': 370, 'width': 260, 'height': 355},
            'patagonia': {'name': 'PATAGONIA', 'x': 430, 'y': 375, 'width': 290, 'height': 440}
        };
        for(var key in this.areas) {
            if(this.areas.hasOwnProperty(key)) {
               this.areas[key].centerX = this.areas[key].x + (this.areas[key].width / 2);
               this.areas[key].centerY = this.areas[key].y + (this.areas[key].height / 2);
            }
        }
    }

    SelectAreaState.prototype = {

        create: function () {
            var textPosition = {
                x: 180,
                y: this.game.world.centerY
            };
            this.selectAreaBackground = this.add.sprite(0, 0, 'selectAreaBackground');
            this.heroeSprite = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'heroeSprite');
            this.heroeSprite.anchor.setTo(0.5, 0.5);
            this.heroeSprite.x = this.game.world.width*2;//Putting sprite out of screen
            this.areaText = this.add.text(textPosition.x, textPosition.y, '', { font: "90px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.areaText.anchor.setTo(0.5, 0.5);
            this.playText = this.add.text(textPosition.x, textPosition.y+300, '', { font: "90px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.playText.anchor.setTo(0.5, 0.5);
            this.playText.inputEnabled = true;
            this.playText.events.onInputDown.add(this.play, this);
            this.backText = this.add.text(textPosition.x, textPosition.y+450, 'VOLVER', { font: "90px 'Yanone Kaffeesatz'", fill: "#000000", align: "center" });
            this.backText.anchor.setTo(0.5, 0.5);
            this.backText.inputEnabled = true;
            this.backText.events.onInputDown.add(this.back, this);
            this.game.input.onDown.add(this.selectArea, this);
        },

        selectArea: function(pointer, evt) {
            var heroePosition = this.getSelectedArea(pointer.x, pointer.y);
            if(heroePosition) {
                this.heroeSprite.x = heroePosition.x;
                this.heroeSprite.y = heroePosition.y;
            }
            //this.music.stop();
            //this.state.start('Game');
        },

        getSelectedArea: function (x, y) {
            for(var key in this.areas) {
                if(this.areas.hasOwnProperty(key)) {
                    if((this.areas[key].x < x) && (this.areas[key].x + this.areas[key].width > x) && (this.areas[key].y < y) && (this.areas[key].y + this.areas[key].height > y)) {
                        this.playText.setText('JUGAR');
                        this.areaText.setText(this.areas[key].name);
                        return {
                            x: this.areas[key].x + (this.areas[key].width/2),
                            y: this.areas[key].y + (this.areas[key].height/2)
                        };
                    }
                }
            }
            return false;
        },

        play: function() {
            //this.music.stop();
            this.state.start('SelectLevel');
        },

        back: function() {
            this.state.start('Menu');
        }
    };

    return SelectAreaState;
}());
