// @ts-nocheck
import kaboom from 'kaboom'
import { Actions, GameObjects } from 'phaser'

const k = kaboom({
	global: true,
	//fullscreen: true,
	scale: 1,
	debug: true,
	clearColor: [0,0,0,1],
	width: 480,
  	height: 480,
})

scene('start', () => {
  
	add([
	  text('ELECTRONICS FACTORY WORKER!'),
	  origin('center'),
	  pos(width() / 2, height() /2),
	  scale(1.8),
	])
  
	add([
	  text('press space to begin'),
	  origin('center'),
	  pos(width() / 2, 380),
	  scale(1),
	])
  
	keyPress('space', () => {
	  go('main', { level: 0, score: 0 })
	})
  
  });

  start('start')