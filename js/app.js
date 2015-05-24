'use strict';

window.onload = function () {
    //  Create Phaser game
    var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');
    //Add game states
    game.state.add('Boot', ArgExp.BootState);
    game.state.add('Preloader', ArgExp.PreloaderState);
    game.state.add('Menu', ArgExp.MenuState);
    game.state.add('Game', ArgExp.GameState);
    game.state.add('Congratulations', ArgExp.Congratulations);
    game.state.add('GameOver', ArgExp.GameOver);
    //Start the Boot state.
    game.state.start('Boot');
};
