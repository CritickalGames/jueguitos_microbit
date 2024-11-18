input.onButtonPressed(Button.A, function () {
    jugador.move(-1)
})
function iniciar_juego () {
    estado = true
    game.setLife(3)
    game.setScore(0)
    jugador.set(LedSpriteProperty.X, 2)
    jugador.set(LedSpriteProperty.Y, 4)
    Muro.set(LedSpriteProperty.X, randint(0, 4))
    Muro.set(LedSpriteProperty.Y, 0)
}
input.onGesture(Gesture.Shake, function () {
    FIN_DEL_JUEGO = true
    estado = false
    basic.showIcon(IconNames.Heart)
    iniciar_juego()
})
input.onButtonPressed(Button.B, function () {
    jugador.move(1)
})
function reinciar_muro () {
    basic.pause(300)
    Muro.set(LedSpriteProperty.X, randint(0, 4))
    Muro.set(LedSpriteProperty.Y, 0)
}
let FIN_DEL_JUEGO = false
let jugador: game.LedSprite = null
let estado = false
let Muro: game.LedSprite = null
estado = false
game.setLife(3)
game.setScore(0)
jugador = game.createSprite(2, 5)
Muro = game.createSprite(0, 0)
FIN_DEL_JUEGO = false
basic.showString("SACUDE")
basic.forever(function () {
    basic.pause(300)
    if (FIN_DEL_JUEGO) {
        Muro.change(LedSpriteProperty.Y, 1)
        if (Muro.isTouching(jugador)) {
            game.addScore(1)
            music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            basic.showNumber(game.score())
            reinciar_muro()
        } else if (Muro.y() == 4) {
            music.play(music.tonePlayable(330, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            basic.showNumber(game.life())
            if (game.life() - 1 != 0) {
                game.removeLife(1)
                reinciar_muro()
            } else {
                FIN_DEL_JUEGO = false
                estado = true
            }
        }
    } else if (estado) {
        basic.showString("GAME OVER")
        basic.showString("SCORE")
        basic.showNumber(game.score())
    }
})
