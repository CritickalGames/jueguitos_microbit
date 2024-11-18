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
let jugador: game.LedSprite = null
let estado = false
let Muro: game.LedSprite = null
estado = false
game.setLife(3)
game.setScore(0)
jugador = game.createSprite(2, 5)
Muro = game.createSprite(0, 0)
basic.showString("SACUDE")
basic.forever(function () {
    basic.pause(300)
    if (estado == true) {
        Muro.change(LedSpriteProperty.Y, 1)
        if (Muro.isTouching(jugador)) {
            game.addScore(1)
            music.play(music.tonePlayable(988, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            basic.showNumber(game.score())
            reinciar_muro()
        } else if (Muro.y() == 4) {
            game.removeLife(1)
            music.play(music.tonePlayable(330, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            basic.showNumber(game.life())
            reinciar_muro()
        }
    }
})
