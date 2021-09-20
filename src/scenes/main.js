// @ts-nocheck
import kaboom from 'kaboom'
import { Actions, GameObjects } from 'phaser'

const k = kaboom({
	global: true,
	// fullscreen: false,
	scale: 1,
	debug: true,
	clearColor: [0,0,0,1],
	width: 480,
  	height: 480,
})

/* ---------------- FUNDAMENTAL VALUES ---------------- */

const PLAYER_SPEED = 100 //200
const ACTUAL_TIME_LEFT = 43200 //43200
let widgetSpeed = 25
let gapBetweenWidgets = 3

/* ---------------- LOADING ASSETS ---------------- */

loadRoot('sprites/') 
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
loadSprite('top-right-wall', '23.png')
loadSprite('top-left-wall', '22.png')
loadSprite('firepot', '6.png') //6
loadSprite('lanterns', '10.png') //10
loadSprite('slicer', '18.png')
loadSprite('left-door', '4.png')
loadSprite('bg', '5.png')
loadSprite('skeletor', '17.png')
loadSprite('guard', '17a.png')
loadSprite('top-door', '21.png')
loadSprite('stairs', '19.png')
loadSprite('bottom-door', '7.png')
loadSprite('kaboom', '9.png')
loadSprite('widget', '20.png')
loadSprite('worker', '12.png')
loadSprite('worker-up', '16.png')
loadSprite('cleaned', '8.png')

//MUSIC
loadRoot('sounds/') 
loadSound("title", "title.mp3");
loadSound("game1", "game1.mp3");
loadSound("game2", "game2.mp3");
loadSound("game3", "game3.mp3");
loadSound("bedtime", "bedtime.mp3");

//SFX
loadSound("up", "up.wav");
loadSound("spray", "spray.wav");
loadSound("fail", "fail.wav");

/* ---------------- START SCENE ---------------- */

scene('start', () => {

	let titleMusic = play("title", {
		volume: 1,
		loop: true,
		speed: 1,
		detune: 0,
	})

	// keyPress("=", () => music.detune(music.detune() + 100))
	// keyPress("-", () => music.detune(music.detune() - 100))

	keyPress("=", () => {
		titleMusic.speed(titleMusic.speed() + 0.05)
		//music.detune(music.detune() + 50)
	})

	keyPress("-", () => {
		titleMusic.speed(titleMusic.speed() - 0.05)
		//music.detune(music.detune() - 50)
	})

	layers(['bkg','top'], 'top')
  
	const title = add([
	  text('- ELECTRONICS FACTORY WORKER +'),
	  origin('center'),
	  pos(width() / 2, 215),
	  scale(1.8),
	])

	const sim = add([
		text('SIMULATOR!'),
		origin('center'),
		pos(width() / 2, 250),
		scale(4),
	  ])

	sim.action(() => {
		sim.scale = wave(5, 1, time());
		sim.angle = time() * 60;	
	})

  
	const pressSpace = add([
	  text('press space to begin'),
	  origin('center'),
	  pos(width() / 2, 380),
	  scale(1),
	])

	pressSpace.action(()=> {
		const t = time() * 100;
		pressSpace.color = rgb(
			wave(10, 255, t),
			wave(0, 255, t + 2),
			wave(0, 255, t + 4),
	)})
  
	keyPress('space', () => {
	  go('game', { level: 0, score: 0 })
	  titleMusic.stop();
	})

	mouseDown( () => {
		go('game', { level: 0, score: 0 })
		titleMusic.stop();
	  })

	// const bgColor = add([
	// 	rect(1000,1000),
	// 	origin('center'),
	// 	color(255, 0, 0),
	// 	layer('bkg'),
	// ])

	// bgColor.action( () => {
	// 	bgColor.color = rgb(
	// 		wave(0, 255, time() *1000 ),
	// 		wave(0, 255, (time() *1000) + 1),
	// 		wave(0, 255, (time() *1000) + 2),
	// )})

});

/* ---------------- GAME SCENE ---------------- */

// scene('game',( args = { level, score, target, time }) => {
scene('game',({ level, score, target, time }) => {

	layers(['bkg','obj', 'top', 'ui'], 'obj')

		const maps = [
			[//0 (simulator mode)
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

			[//1 (hallway)
				'yccccccccw',
				'a        b',
				'a        b',
				'ycccc cccw',
				'a        $',
				'xdddd dddz',
				'a        b',
				'a        b',
				'a        b',
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
			'%' : [sprite('left-door'), 'hall'],
			'^' : [sprite('top-door'), 'wall', 'next-level'],
			'$' : [sprite('stairs'), 'first-level'],
			'*' : [sprite('slicer'), 'slicer', 'dangerous', {dir: -1}], //{} = direction
			'}' : [sprite('skeletor'), solid(), 'skeletor', 'dangerous', {dir: -1, timer: -1}],
			')' : [sprite('lanterns'), 'wall', 'not-done', solid()],
			'(' : [sprite('firepot'), solid(), layer('ui')],
			'_' : [sprite('bottom-door'), solid(), 'wall'],
			'p' : [sprite('worker'), solid(), 'worker'],
			'q' : [sprite('worker-up'), solid(), 'worker'],
			'o' : [sprite('cleaned'), solid(), 'cleaned'],
			'g' : [sprite('guard'), solid(), 'guard'],
			'k' : [sprite('kaboom'), 'kaboom', layer['top']],
		}

		addLevel(maps[level], levelCfg)
		// const theLevels = addLevel(maps[0], levelCfg)

		add([sprite('bg'), layer('bkg')])

		
		const musicTracks = [["game1"], ["game2"], ["game3"]]
		const randomMusicTrack = musicTracks[parseInt(rand(3))]

		let music = play(randomMusicTrack, {
			volume: 1,
			loop: true,
			speed: 1,
			detune: 0,
		})

		/* ---------------- PLAYER ---------------- */
		const player = add([
			sprite('link-going-down'),
			pos(225,200), ///pos(225,70),
			scale(0.9),
			{
				dir: vec2(0,1)
			}
			
		])

		//stops player walking through solid shit
		player.action(()=> {
			player.resolve() 
		})

		// PLAYER SUCCESSFULLY FITS COMPONANT
		collides('kaboom', 'widget', (k,w) => {
			destroy(w)
			destroy(k)
			
			// wait(1, () => {
			// 	destroy(k)
			// })
			
			//update score & target
			scoreLabel.value++
			scoreLabel.text = scoreLabel.value
			dailyTarget.value--
			dailyTarget.text = dailyTarget.value

			// show new replacement graphic for fitting widget
			const obj = add([sprite('cleaned'), pos(240,384), 'cleaned'])
			const overlay = add([sprite('kaboom'), pos(240,384), 'kaboom'])
			wait(0.3, () => {
				destroy(overlay)
			})

			obj.action( () => {
				obj.move(widgetSpeed,0)
			})
			wait(10, () => {
				destroy(obj)
			})

			wait(0.2, () => {
				play("up")
			})
		})

		/* ---------------- UI ---------------- */

		//SCORE 
		const scoreLabel = add([
			text('0'),
			layer('ui'),
			pos(500,10),
			{
				value: score,
			},
			scale(4)
		])

		//SCORE ABOVE HEAD!
		player.action(() => {
			scoreLabel.pos = player.pos.add(player.dir.scale(-48)) //tracks/sticks to player
		  })
		
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

		//SHIFT TIME
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
		
		actualTime.action(() => { /* action is called every frame */
			actualTime.time -= dt() /* delta time since last frame */
			const totalSeconds = actualTime.time
			actualTime.text = totalSeconds.toFixed(0)
		})


		/* ---------------- CONTROLS ---------------- */

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
			const obj = add([sprite('kaboom'), pos(p), 'kaboom', scale(0.8)])
			wait(0.3, () => {
				destroy(obj)
			})
		}

		keyPress('space', () => {
			spawnKaboom(player.pos.add(player.dir.scale(48)))
			play("spray", () => {
				volume(0.5)
			})
		})

		/* ---------------- WORKER INTERACTION ---------------- */
		
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

		const guard = add([
			sprite('guard'),
			pos(80,220),
			origin('center'),
			layer('obj'),
		])

		//stops guard walking through solid shit
		guard.action(()=> {
			guard.resolve() 
		})

		guard.action( () => {
			wait(60, () => {
				guard.move(0,10)
			})
		})

		collides('guard', 'worker', (s) => {
			guard.move(0,-10)
		})
		
		/* ---------------- WIDGETS ---------------- */
		
		
				//WIDGET SPAWNER
		function spawnWidgets () {
			const obj = add([sprite('widget'), pos(0,385), 'widget'])
			obj.action( () => {
				obj.move(widgetSpeed,0)
			})
			// wait(23, () => {
			// 	destroy(obj)
			// })
		}

		// gaps between widgets
		function theMachineLoop () {
			wait(1, ()=> {
				loop(gapBetweenWidgets, () => { //n = gap between widgets
				spawnWidgets()
				npcSpawnWidgets() // NPC
				})
			})
	 	}

		if (level == 0) {
			theMachineLoop() // starts the machines
		}
		
		/* ----------------------- CHEATS! INTERACTIONS ------------------- */

		 //SPEEDS UP MACHINE WITH INTERACTION
		collides('kaboom', 'skeletor', (k) => {
			camShake(1)
			wait(1, () => {
				destroy(k)
			})
			widgetSpeed += 30
			gapBetweenWidgets -= 0.3
			music.speed(music.speed() + 0.05)
			
			if (gapBetweenWidgets < 0.1) {
				gapBetweenWidgets = 0.1
			}
			theMachineLoop()
						
		})

		//SLOWS DOWN MACHINE WITH INTERACTION
		collides('kaboom', 'slicer', (k) => {
			camShake(1)
			wait(1, () => {
				destroy(k)
			})
			widgetSpeed -= 30
			gapBetweenWidgets += 0.3
			music.speed(music.speed() - 0.05)
		})

		/* ----------------------- CHEATS! KEYS ------------------- */

		 //SPEEDS UP MACHINE WITH KEYS
		 keyPress('=', () => {
			camShake(2)
			widgetSpeed += 30
			gapBetweenWidgets -= 0.3
			if (gapBetweenWidgets < 0.1) {
				gapBetweenWidgets = 0.1
			}
			theMachineLoop()		
			music.speed(music.speed() + 0.05)
		})

		//SLOWS DOWN MACHINE WITH INTERACTION
		keyPress('-', () => {
			camShake(4)
			widgetSpeed -= 30
			// if (WIDGET_SPEED < 30) {
			// 	WIDGET_SPEED = 30
			// }
			gapBetweenWidgets += 0.3
			// if (GAP_BETWEEN_WIDGETS > 2) {
			// 	GAP_BETWEEN_WIDGETS = 2
			// }
			music.speed(music.speed() - 0.05)	
		})




		//NPC WIDGET SPAWNER
		function npcSpawnWidgets () {
			const obj = add([sprite('cleaned'), pos(450,48), 'cleaned'])
			obj.action( () => {
				obj.move(-widgetSpeed,0)
			})
			// wait(23, () => {
			// 	destroy(obj)
			// })
		}

		// // PLAYER PICKS UP WIDGET
		// collides('firepot', 'kaboom', (k) => {
		// 	scoreLabel.text = 'got widget'
		// })
	
		// MISSED A WIDGET!
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
			play("fail", () => {
				volume(0.1)
			})
		})

		// CLEANS UP WIDGETS THAT ARE DONE
		collides('cleaned', 'not-done', (h) => {
			destroy(h)
		})


		/* ----------------------- TIOLET! ------------------- */

		player.overlaps('hall', () => {
			go('game', {
				level: (level + 1), //% maps.length,
				score: scoreLabel.value,
				target: dailyTarget.value,
				time: actualTime.time,
				
			})
		})

		player.overlaps('first-level', () => {
			go('game', {
				level: (level - 1), //% maps.length,
				score: scoreLabel.value,
				target: dailyTarget.value,
				time: actualTime.time,
			})
		})

		/* ----------------------- TIOLET SCENE! ------------------- */





		/* ----------------------- CONGRATS! ------------------- */
		
		player.action( () => {
			if (scoreLabel.value > 1600) {
				const congrats = add([
					text('CONGRATULATIONS!'),
					pos(250, 200),
					origin('center'),
					scale(3),
					layer('ui'),
				])

				const keepGoing = add([
					text('You are a good employee'),
					pos(250, 230),
					origin('center'),
					scale(1.5),
					layer('ui'),
				])

				wait(3, () => {
					destroy(congrats)
					destroy(keepGoing)
				})
			}
			
		})

		/* ----------------------- END OF SHIFT ------------------- */

		player.action( () => {
			if (actualTime.time < 0.0) {
				go('bedtime')
				// add([
				// 	text('well done'),
				// 	pos(250, 230),
				// 	origin('center'),
				// 	scale(3),
				// 	layer('ui'),
				// ])	
				music.stop()
			}
		})

		/* ----------------------- BEDTIME SCENE ------------------- */

		scene('bedtime', () => {
			
			const bedMusic = play("bedtime", {
				volume: 1,
				loop: false,
			})


			add([
			  text('Bedtime!'),
			  origin('center'),
			  pos(width() / 2, height() /2),
			  scale(5),
			])
		  
			add([
			  text('press space to go again'),
			  origin('center'),
			  pos(width() / 2, 380),
			  scale(2),
			])
		  
			keyPress('space', () => {
			  go('game', { level: 0, score: 0 })
			  bedMusic.stop()
			})
		
		  });		
	})


start('start', { level: 0, score: 0 })
