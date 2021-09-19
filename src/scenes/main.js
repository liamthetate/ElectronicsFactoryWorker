// @ts-nocheck
import kaboom from 'kaboom'
import { Actions } from 'phaser'

const k = kaboom({
	global: true,
	//fullscreen: true,
	scale: 1,
	debug: true,
	clearColor: [0,0,0,1],
	width: 480,
  	height: 480,
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
loadSprite('widget', '20.png')
loadSprite('worker', '12a.png')
loadSprite('worker-up', '16a.png')
loadSprite('hole', '8.png')

scene('game',({ level, score }) => {

		layers(['bkg','obj', 'top', 'ui'], 'obj')

		const maps = [
			[//simulator mode
				'yccccccccw',
				')________(',
				'aqqqqqqqqb',
				'a        b',
				'%        }',
				'a        *',
				'a        b',
				'apppp pppb',
				'(________)',
				'xddddddddz',
			],

			[//simulator mode
				'yccc  cccw',
				'a        b',
				'a        b',
				'a        b',
				'a        b',
				'a        b',
				'a        b',
				'apppp pppb',
				'(________)',
				'xddddddddz',
			],

			[//simulator mode
				'yccc  cccw',
				'a p    p b',
				'a__    __b',
				'a p    p b',
				'a__    __b',
				'a p    p b',
				'a__    __b',
				'appp  pppb',
				'(________)',
				'xddddddddz',
			],

			[//fun mode
				'yccc  cccw',
				'a p    p b',
				'a__o  o__b',
				'a p    p b',
				'a__o  o__b',
				'a p    p b',
				'a__o  o__b',
				'a        b',
				'(________)',
				'xddddddddz',
			],

			[//hallway
				'ycccc^cccw',
				'a         ',
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
			'%' : [sprite('left-door', 'hallway')],
			'^' : [sprite('top-door'), 'wall', 'next-level'],
			'$' : [sprite('stairs'), 'next-level'],
			'*' : [sprite('slicer'), 'slicer', 'dangerous', {dir: -1}], //{} = direction
			'}' : [sprite('skeletor'), solid(), 'skeletor', 'dangerous', {dir: -1, timer: -1}],
			')' : [sprite('lanterns'), 'wall', 'not-done', solid()],
			'(' : [sprite('firepot'), solid(), layer('ui')],
			'_' : [sprite('bottom-door'), solid(), 'wall'],
			'p' : [sprite('worker'), solid(), 'worker'],
			'q' : [sprite('worker-up'), solid(), 'worker'],
			'o' : [sprite('hole'), solid(), 'hole'],
		}

		addLevel(maps[level], levelCfg)

		add([sprite('bg'), layer('bkg')])

		// SCORE 
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
			sprite('link-going-down'),
			pos(225,200), ///pos(225,70),
			{
				dir: vec2(0,1)
			}
			
		])

		player.action(()=> {
			player.resolve() //stops player walking through solid shit
		})

		//UI ABOVE HEAD!
		player.action(() => {
			scoreLabel.pos = player.pos.add(player.dir.scale(-48)) //tracks/sticks to player
		  })
		
		// //PLAYER DIES WHEN...
		// player.overlaps('dangerous', () => {
		// 	go('lose', {score: scoreLabel.value})
		// })

		// player.overlaps('next-level', () => {
		// 	go('game', {
		// 		level: (level + 1) % maps.length,
		// 		score: scoreLabel.value,
		// 	})
		// })


		// if (WIDGET_SPEED < 60) {
		// 	GAP_BETWEEN_WIDGETS = 1
		// }

		// else if (WIDGET_SPEED < 90) {
		// 	GAP_BETWEEN_WIDGETS = 0.9
		// }

		// else if (WIDGET_SPEED < 120) {
		// 	GAP_BETWEEN_WIDGETS = 0.6
		// }

		// else if (WIDGET_SPEED < 150) {
		// 	GAP_BETWEEN_WIDGETS = 0.4
		// }

		// else if (WIDGET_SPEED < 210) {
		// 	GAP_BETWEEN_WIDGETS = 0.3
		// } 
		
		// else if (WIDGET_SPEED < 300) {
		// 	GAP_BETWEEN_WIDGETS = 0.3
		// } 

		//WIDGET
		let WIDGET_SPEED = 35
		let GAP_BETWEEN_WIDGETS = 2
		
		//SPEEDS UP
		collides('kaboom', 'skeletor', (k) => {
			camShake(1)
			wait(1, () => {
				destroy(k)
			})
			WIDGET_SPEED += 30
			GAP_BETWEEN_WIDGETS -= 0.3
			if (GAP_BETWEEN_WIDGETS < 0.1) {
				GAP_BETWEEN_WIDGETS = 0.1
			}
			theMachineLoop()			
		})

		//SLOWS DOWN
		collides('kaboom', 'slicer', (k) => {
			camShake(1)
			wait(1, () => {
				destroy(k)
			})
			WIDGET_SPEED -= 30
			// if (WIDGET_SPEED < 30) {
			// 	WIDGET_SPEED = 30
			// }
			GAP_BETWEEN_WIDGETS += 0.3
			// if (GAP_BETWEEN_WIDGETS > 2) {
			// 	GAP_BETWEEN_WIDGETS = 2
			// }
		})


		//WIDGET SPAWNER
		function spawnWidgets () {
			const obj = add([sprite('widget'), pos(0,385), 'widget'])
			obj.action( () => {
				obj.move(WIDGET_SPEED,0)
			})
			// wait(23, () => {
			// 	destroy(obj)
			// })
		}

		// gaps
		function theMachineLoop () {
			wait(1, ()=> {
				loop(GAP_BETWEEN_WIDGETS, () => { //n = gap between widgets
				spawnWidgets()
				npcSpawnWidgets() // NPC
				})
			})
	 	}

		theMachineLoop()
		

		//NPC WIDGET SPAWNER
		function npcSpawnWidgets () {
			const obj = add([sprite('hole'), pos(450,48), 'hole'])
			obj.action( () => {
				obj.move(-WIDGET_SPEED,0)
			})
			// wait(23, () => {
			// 	destroy(obj)
			// })
		}

		



		// // PLAYER PICKS UP WIDGET
		// collides('firepot', 'kaboom', (k) => {
		// 	scoreLabel.text = 'got widget'
		// })

		// PLAYER SUCCESSFULLY FITS COMPONANT
		collides('kaboom', 'widget', (k,w) => {
			wait(1, () => {
				destroy(k)
			})
			destroy(w)

			//update score & target
			scoreLabel.value++
			scoreLabel.text = scoreLabel.value
			dailyTarget.value--
			dailyTarget.text = dailyTarget.value

			// show new graphic for fitting widget
			const obj = add([sprite('hole'), pos(240,384), 'hole'])
			obj.action( () => {
				obj.move(WIDGET_SPEED,0)
			})
			wait(10, () => {
				destroy(obj)
			})
		})

		
		
		

		// MISSED ONE - BAD WORKER!
		collides('widget', 'not-done', (w) => {
			camShake(10)
			destroy(w)
			const message = add([text('FAIL!'), pos(270, 390), scale(5)])
			scoreLabel.value--
			scoreLabel.text = scoreLabel.value
			dailyTarget.value++
			dailyTarget.text = dailyTarget.value
			wait(1, ()=> {
				destroy(message)
			})
		})

		collides('hole', 'not-done', (h) => {
			destroy(h)
		})

	
	

		//CONTROLS
		const PLAYER_SPEED = 100 //200
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
			wait(0.3, () => {
				destroy(obj)
			})
		}

		keyPress('space', () => {
			spawnKaboom(player.pos.add(player.dir.scale(48)))
		})

		// WORKER INTERACTION
		const workerMessage = [
			['I am so happy'], //0
			['Work = meaning'], //1
			['Unionise?!'], //2
			['zzZ'], //3
			['Best time ever!'], //4
			["One day I'll be rich!"], //5
			["I'm productive!"], //6
			["Busy busy busy!"], //7
			["Steve is my hero!"], //8
			["I love job creators"], //9
			["Work hard!"], //10
			["I am disciplined"], //11
			["Stay focused!"], //12
			["You can achieve anything!"], //13
			["I'm a hard worker!"], //14
			["I'm my best self!"], //15
			["YOLO!"], //16
		]

		// mouse click = conversations
		clicks('worker', () => {
			const conversation = add([
				text(workerMessage[parseInt(rand(16))]),
				scale(2),
				pos(250,250),
				origin('center'),
			])

			wait(1, () => {
				destroy(conversation)
			})
		})



		// // space bar = conversations
		// collides('kaboom', 'worker', (k) => {
		// 	destroy(k)
		// 	const conversation = add([
		// 		text(workerMessage[parseInt(rand(6))]),
		// 		scale(2),
		// 		pos(250,250),
		// 		origin('center'),
		// 	])
		// 	wait(1, () => {
		// 		destroy(conversation)
		// 	})
			
		// })

		// mouse click = conversations
		clicks('widget', () => {
			spawnKaboom(player.pos.add(player.dir.scale(48)))
		})



/


		// //ENEMY
		// const ENEMY_SPEED = 120
		// action('slicer', (s) => {
		// 	s.move(s.dir * ENEMY_SPEED, 0)
		// })

		// collides('slicer', 'wall', (s) => {
		// 	s.dir = -s.dir
		// })

		// action('skeletor', (s) => {
		// 	s.move(0, s.dir * ENEMY_SPEED)
		// 	s.timer -= dt()
		// 	if (s.timer <= 0){
		// 		s.dir = -s.dir
		// 		s.timer = rand(5)
		// 	}
		// })

		// collides('skeletor', 'wall', (s) => {
		// 	s.dir = -s.dir
		// })

		// collides('kaboom', 'skeletor', (k,s) => {
		// 	camShake(4)
		// 	wait(1, () => {
		// 		destroy(k)
		// 	})
		// 	destroy(s)
		// 	scoreLabel.value++
		// 	scoreLabel.text = scoreLabel.value
		// })


		





		//UI

		// DAILY GOAL
		add([
			text('DAILY GOAL:'),
			pos(20, 10),
			scale(1),
		])

		const dailyTarget = add([
			text('1600'),
			layer('ui'),
			pos(20,25),
			{
				value: 1600
			},
			scale(2),
		])

		

		
		// const TIME_LEFT = 43200

		// add([
		// 	text('SHIFT ENDS:'),
		// 	pos(380, 10),
		// 	scale(1),
		// ])

		// const timer = add([
		// 	text('0'),
		// 	pos(380, 25),
		// 	scale(2),
		// 	layer('ui'),
		// 	{
		// 		time: TIME_LEFT
		// 	},
		// ])
		
		// /* calls on the timer const, then drills into it */
		// timer.action(() => { /* action is called every frame */
		// 	timer.time -= dt() /* delta time since last frame */
		// 	timer.text = timer.time.toFixed(0)
		// 	if (timer.time <= 0) {
		// 		go('bedtime', {score: score.value}) /*go to lose scene and take score with you*/
		// 	}
		// })


		//SHIFT TIME
		const ACTUAL_TIME_LEFT = 43200

		add([
			text('SHIFT ENDS:'),
			pos(380, 10),
			scale(1),
		])

		const actualTime = add([
			text('0'),
			pos(380, 25),
			scale(2),
			layer('ui'),
			{
				time: ACTUAL_TIME_LEFT,
			},
		])
		
		/* calls on the timer const, then drills into it */
		actualTime.action(() => { /* action is called every frame */
			actualTime.time -= dt() /* delta time since last frame */
			const totalSeconds = actualTime.time
			actualTime.text = totalSeconds.toFixed(0)
		})



		
		
		//3600secs in an hour
		
		// const hourTimer = add([
		// 	text('0'),
		// 	pos(380, 75),
		// 	scale(2),
		// 	layer('ui'),
		// ])

		// const minTimer = add([
		// 	text('0'),
		// 	pos(420, 75),
		// 	scale(2),
		// 	layer('ui'),
		// ])

		// const secTimer = add([
		// 	text('0'),
		// 	pos(460, 75),
		// 	scale(2),
		// 	layer('ui'),
		// ])

		// hourTimer.action(() => { 
		// 	let sec_value = ACTUAL_TIME_LEFT % (24 * 3600)
		// 	let hour_value = sec_value / 3600
		// 	sec_value %= 3600
		// 	let min_value = sec_value / 60
		// 	sec_value %= 60
		// 	hourTimer.text = hour_value
		// 	minTimer.text = min_value

		// 	sec_value += dt()
		// 	secTimer.text = sec_value.toFixed(0)
		// })



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