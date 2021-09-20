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
loadSprite('left-door', '4.png')
loadSprite('floor', '5.png')
loadSprite('conveyor-belt', '7.png')
// loadSprite('conveyor-belt-top', '7alt.png')

loadSprite('open-belt', '6.png') 
loadSprite('close-belt', '10.png')
loadSprite('open-belt-inv', '6i.png') 
loadSprite('close-belt-inv', '10i.png')

loadSprite('slow', '18.png')
loadSprite('fast', '17.png')

loadSprite('guard', '17a.png')
loadSprite('spray', '9.png')
loadSprite('worker', '12.png')
loadSprite('worker-up', '16.png')

loadSprite('widget', '20.png')
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
loadSound("bell", "bell.mp3");

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

	wait(1, () => {
		play("bell")
	})

	layers(['bkg','obj', 'top', 'ui'], 'obj')

		const maps = [
			[//0 (simulator mode)
				'yccccccccw',
				'[________]',
				'aqqqqqqqqb',
				'a        b',
				'%        b',
				'%        b',
				'a        b',
				'apppp pppb',
				'(________)',
				'xddddddddz',
			],

			// [//0 (simulator mode)
			// 	'yccccccccw',
			// 	')________(',
			// 	'aqqqqqqqqb',
			// 	'a        b',
			// 	'%        }',
			// 	'%        *',
			// 	'a        b',
			// 	'apppp pppb',
			// 	'(________)',
			// 	'xddddddddz',
			// ],

			// [//1 (hallway)
			// 	'yccccccccw',
			// 	'a        b',
			// 	'a        b',
			// 	'ycccc cccw',
			// 	'a        $',
			// 	'xdddd dddz',
			// 	'a        b',
			// 	'a        b',
			// 	'a        b',
			// 	'xddddddddz',
			// ],
			
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
			'%' : [sprite('left-door'), 'hall', solid()],
			'*' : [sprite('slow'), 'slow', {dir: -1}], //{} = direction
			'}' : [sprite('fast'), solid(), 'fast', {dir: -1, timer: -1}],
			')' : [sprite('close-belt'), 'wall', 'not-done', solid()],
			'(' : [sprite('open-belt'), solid(), layer('ui')],
			'_' : [sprite('conveyor-belt'), solid(), 'wall'],
			'p' : [sprite('worker'), solid(), 'worker'],
			'q' : [sprite('worker-up'), solid(), 'worker'],
			'o' : [sprite('cleaned'), solid(), 'cleaned'],
			'g' : [sprite('guard'), solid(), 'guard'],
			'k' : [sprite('spray'), 'spray'],
			']' : [sprite('open-belt-inv'), layer('top')],
			'[' : [sprite('close-belt-inv'), 'not-done'],
			

		}

		addLevel(maps[level], levelCfg)
		// const theLevels = addLevel(maps[0], levelCfg)

		add([sprite('floor'), layer('bkg')])

		
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
		collides('spray', 'widget', (k,w) => {
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
			const overlay = add([sprite('spray'), pos(240,384), 'spray'])
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
		

		// add([
		// 	rect(500, 40),
		// 	// outline(4),
		// 	// area(),
		// 	layer('ui'),
		// 	color(127, 200, 255),
		// ]);

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
		
		//this animates the clock countdown
		actualTime.action(() => { /* action is called every frame */
			actualTime.time -= dt() /* delta time since last frame */
			const totalSeconds = actualTime.time
			actualTime.text = totalSeconds.toFixed(0)

			// secsDisplay.time += dt()
			// secsDisplay.text = secsDisplay.time.toFixed(0)

			// minsDisplay.time = secsDisplay.time / 60
			// minsDisplay.text = minsDisplay.time.toFixed(0)

			// hoursDisplay.time = secsDisplay.time / 360
			// hoursDisplay.text = hoursDisplay.time.toFixed(0)

		})


		
		// // STOLEN CODE FOR DISPLAY
		// let totalSeconds = ACTUAL_TIME_LEFT //totalSeconds.toFixed(0) // ; 
		// let hours = Math.floor(totalSeconds / 3600);
		// totalSeconds %= 3600;
		// let minutes = Math.floor(totalSeconds / 60);
		// let seconds = totalSeconds % 60;
		// // STOLEN CODE

		// const hoursDisplay = add([
		// 	text(hours),
		// 	pos(350, 50),
		// 	scale(2),
		// 	layer('ui'),
		// 	{
		// 		time: hours,
		// 	},
		// ])

		// const minsDisplay = add([
		// 	text(minutes),
		// 	pos(390, 50),
		// 	scale(2),
		// 	layer('ui'),
		// 	{
		// 		time: minutes,
		// 	},
		// ])

		// const secsDisplay = add([
		// 	text('0'),
		// 	pos(430, 50),
		// 	scale(2),
		// 	layer('ui'),
		// 	{
		// 		time: seconds,
		// 	},
		// ])

		
		




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

		function spawnSpray (p) {
			const obj = add([sprite('spray'), pos(p), 'spray', scale(0.8)])
			wait(0.3, () => {
				destroy(obj)
			})
		}

		keyPress('space', () => {
			spawnSpray(player.pos.add(player.dir.scale(48)))
			play("spray", () => {
				volume(0.5)
			})
		})

		/* ---------------- WORKER INTERACTION ---------------- */
		
		const workerMessage = [
			["I am so happy"], 
			["Work = meaning"], 
			["Unionise?!"], 
			["zzZ"], 
			["Best time ever!"], 
			["One day I'll be rich!"], 
			["I'm productive!"], 
			["Busy busy busy!"], 
			["Steve is my hero!"], 
			["I love job creators"], 
			["Work hard!"], 
			["I am disciplined"], 
			["Stay focused!"], 
			["You can achieve anything!"], 
			["I'm a hard worker!"], 
			["I'm my best self!"], 
			["#YOLO!"], 
			["Think +positive+!"], 
			["I'm achieving my goals!"],
			["I know a secret..."], 
			["...a way to escape..."],
			["This is MY journey"],  
			["...beyond these walls"],
			["Stay positive!"],
			["Don't think negatively -"],
			["Think positive +"],
			["...a hidden code..."],
			["...control beyond control"],
			["Speed up?"],
			["Slow down?"],
			["...a different approach"],
			["...a different way"],
			["...a hidden power..."],
			["...an alternative"],
			["...stay positive, HAHA!"],
			["...think positive!"],
			["...think..."],
			["...it's in your hands!"],
			["...everything is in hand"],
			// ["'-'"],
			// ["'+'"],
			["...master & slave"],
			["...lord & serf"],
			["...employer & employee"],
			["There is no alternative :)"],
			["I LOVE MY JOB!"],
			["...fail..."],
			["...failure..."],
			["...lets shake things up..."],
			["Luddite?!"],
			["I have anxiety LOL!"],
			["Clean my room?!"],
			["Pratice mindfulness!"],
			["...my eyes burn..."],
			["...dizzy..."],
			["Just do your work"],
			["Stop talking to me"],
			["...I had dreams..."],
			["Working towards my dreams!"],
			["I feel great!"],
			["Subservient is my MO!"],
			["...mindless..."],
			["...I heard a rumour"],
			["Can you hear music?!"],
			["...the source of power"],
			["...something beyond this"],
			["...it's outside this room"],
			["...think outside this box"],
			["12 hours = 43200 seconds!"],
			["Have you ever finished a shift?"],
			["You're new here, right?"],
			["...a hidden key!"],
			["If only we could find it..."],
		]

		// mouse click = conversations
		clicks('worker', () => {
			const conversation = add([
				text(workerMessage[parseInt(rand(workerMessage.length))]),
				scale(2),
				pos(250,250),
				origin('center'),
				layer('ui'),
				color(0,0,0),
			])

			const speechBubble = add([
				rect(440,80),
				pos(250,250),
				origin('center'),
				layer('top'),
			])

			const speechBubbleBg = add([
				rect(460,100),
				pos(250,250),
				origin('center'),
				color(0,0,0),
			])

			wait(1, () => {
				destroy(conversation)
				destroy(speechBubble)
				destroy(speechBubbleBg)
				
				
			})
		})

		// // space bar = conversations
		// collides('spray', 'worker', (k) => {
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

			// const objTop = add([sprite('conveyor-belt-top'), pos(0,385), 'conveyor-belt-top'])
			// objTop.action( () => {
			// 	objTop.move(widgetSpeed,0)
			// 	wait(1, () => {
			// 	destroy(objTop)
			// })
			
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

		// if (level == 0) {
		// 	theMachineLoop() // starts the machines
		// }
		
		
		theMachineLoop() // starts the machines
		

		/* ----------------------- CHEATS! INTERACTIONS ------------------- */

		 //SPEEDS UP MACHINE WITH INTERACTION
		collides('spray', 'fast', (k) => {
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
		collides('spray', 'slow', (k) => {
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
		// collides('firepot', 'spray', (k) => {
		// 	scoreLabel.text = 'got widget'
		// })
	
		// MISSED A WIDGET!
		collides('widget', 'not-done', (w) => {
			camShake(10)
			destroy(w)
			const message = add([
				text('FAIL!'),
				pos(395, 400),
				scale(2),
				rotate(30),
				color(0,0,0),
				layer('top'),
				])

			const failBubble = add([
				rect(150,30),
				pos(390, 390),
				color(255,0,0),
				// rotate(15),
				])

			wait(1, ()=> {
				destroy(message)
				destroy(failBubble)
			})

			scoreLabel.value--
			scoreLabel.text = scoreLabel.value
			dailyTarget.value++
			dailyTarget.text = dailyTarget.value
			
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
