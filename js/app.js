'use strict';

window.onload = function () {
    //  Create Phaser game
    var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'game');
    //Add game states
    game.state.add('Boot', ArgExp.BootState);
    game.state.add('Preloader', ArgExp.PreloaderState);
    game.state.add('Menu', ArgExp.MenuState);
    game.state.add('Credits', ArgExp.CreditsState);
    game.state.add('SelectArea', ArgExp.SelectAreaState);
    game.state.add('SelectLevel', ArgExp.SelectLevelState);
    game.state.add('Game', ArgExp.GameState);
    game.state.add('Congratulations', ArgExp.Congratulations);
    game.state.add('GameOver', ArgExp.GameOver);
    //Start the Boot state.
    game.state.start('Boot');
};
