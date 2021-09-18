// @ts-nocheck
import kaboom from 'kaboom'
import { Actions } from 'phaser'

const k = kaboom({
	global: true,
	//fullscreen: true,
	scale: 1,
	debug: true,
	clearColor: [0,0,0,1],
})

loadRoot('sprites/Zelda/')
loadSprite('top-wall', '24.png')
loadSprite('link-going-left', '14.png')
loadSprite('link-going-right', '15.png')
loadSprite('link-going-down', '12.png')
loadSprite('link-going-up', '16.png')
loadSprite('left-wall', '25.png')
loadSprite('right-wall', '26.png')
loadSprite('bottom-wall', '2.png')
loadSprite('bottom-right-wall', '1.png')
loadSprite('bottom-left-wall', '3.png')
loadSprite('top-right-wall', '23.jpg')
loadSprite('top-left-wall', '22.png')
loadSprite('firepot', '6.png')
loadSprite('lanterns', '10.png')
loadSprite('slicer', '18.png')
loadSprite('left-door', '4.png')
loadSprite('bg', '5.png')
loadSprite('skeletor', '17.png')
loadSprite('top-door', '21.png')
loadSprite('stairs', '19.png')
loadSprite('bottom-door', '7.png')
loadSprite('kaboom', '9.png')


// k.scene('main', () =>{
// 	k.add([
// 		k.text('hello cunt', 32),
// 		k.pos(k.width() * 0.5, k.height() *0.5),
// 		k.color(1,1,1,1),
// 		k.origin('center'),
// 	])
// })
// k.start('main')

scene('game',({ level, score }) => {

		layers(['bkg','obj','ui'], 'obj')

		const maps = [
			[
				'y)ccc^cc)w',
				'a        b',
				'a    }   b',
				'a        b',
				'%        $',
				'a        b',
				'a    *   b',
				'a        b',
				'a(      (b',
				'xdddd_dddz',
			],

			[
				'yccccccccw',
				'a) }    )b',
				'a        b',
				'a        b',
				'a    $   b',
				'a        b',
				'a        b',
				'a        b',
				'a(      (b',
				'xddddddddz',
			],
		]

		const levelCfg = {
			width: 48,
			height: 48,
			'a' : [sprite('left-wall'), 'wall', solid()],
			'b' : [sprite('right-wall'), 'wall', solid()],
			'c' : [sprite('top-wall'), 'wall', solid()],
			'd' : [sprite('bottom-wall'), 'wall', solid()],
			'w' : [sprite('top-right-wall'), 'wall', solid()],
			'x' : [sprite('bottom-left-wall'), 'wall', solid()],
			'y' : [sprite('top-left-wall'), 'wall', solid()],
			'z' : [sprite('bottom-right-wall'), 'wall', solid()],
			'%' : [sprite('left-door')],
			'^' : [sprite('top-door'), 'wall', 'next-level'],
			'$' : [sprite('stairs'), 'next-level'],
			'*' : [sprite('slicer'), 'slicer', 'dangerous', {dir: -1}], //{} = direction
			'}' : [sprite('skeletor'), 'skeletor', 'dangerous', {dir: -1, timer: -1}],
			')' : [sprite('lanterns'), 'wall', solid()],
			'(' : [sprite('firepot'), solid()],
			'_' : [sprite('bottom-door'), 'next-level', 'wall'],


		}

		addLevel(maps[level], levelCfg)

		add([sprite('bg'), layer('bkg')])

		const scoreLabel = add([
			text('0'),
			layer('ui'),
			pos(500,10),
			{
				value: score,
			},
			scale(4)
		])

		//PLAYER
		const player = add([
			sprite('link-going-right'),
			pos(5,190),
			{
				dir: vec2(1,0)
			}
		])

		player.action(()=> {
			player.resolve() //stops player walking through solid shit
		})

		//PLAYER DIES WHEN...
		player.overlaps('dangerous', () => {
			go('lose', {score: scoreLabel.value})
		})

		player.overlaps('next-level', () => {
			go('game', {
				level: (level + 1) % maps.length,
				score: scoreLabel.value,
			})
		})

		//CONTROLS
		const PLAYER_SPEED = 200
		keyDown('left', () => {
			player.changeSprite('link-going-left')
			player.move(-PLAYER_SPEED,0)
			player.dir = vec2(-1,0)
		})

		keyDown('right', () => {
			player.changeSprite('link-going-right')
			player.move(PLAYER_SPEED,0)
			player.dir = vec2(1,0)
		})

		keyDown('up', () => {
			player.changeSprite('link-going-up')
			player.move(0,-PLAYER_SPEED)
			player.dir = vec2(0,-1)
		})

		keyDown('down', () => {
			player.changeSprite('link-going-down')
			player.move(0, PLAYER_SPEED)
			player.dir = vec2(0,1)
		})

		function spawnKaboom (p) {
			const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
			wait(1, () => {
				destroy(obj)
			})
		}

		keyPress('space', () => {
			spawnKaboom(player.pos.add(player.dir.scale(48)))
		})

		//ENEMY
		const ENEMY_SPEED = 120
		action('slicer', (s) => {
			s.move(s.dir * ENEMY_SPEED, 0)
		})

		collides('slicer', 'wall', (s) => {
			s.dir = -s.dir
		})

		action('skeletor', (s) => {
			s.move(0, s.dir * ENEMY_SPEED)
			s.timer -= dt()
			if (s.timer <= 0){
				s.dir = -s.dir
				s.timer = rand(5)
			}
		})

		collides('skeletor', 'wall', (s) => {
			s.dir = -s.dir
		})

		collides('kaboom', 'skeletor', (k,s) => {
			camShake(4)
			wait(1, () => {
				destroy(k)
			})
			destroy(s)
			scoreLabel.value++
			scoreLabel.text = scoreLabel.value
		})


		// mouse click destroyrs things with the tag dangerous
		clicks('dangerous', (s) => {
			destroy(s)
		})

		// end screen
		scene('lose', ({score}) => {
			add([
				text(score),
				pos(width() /2, height() /2),
				origin('center'),
				scale(10)
			])
		})

})



start('game', { level: 0, score: 0 })
