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

scene('bedtime',({ score }) => {

add([
    text(args.score), /* args is anything we pass through into this scene */
    origin('center'),
    scale(10),
    pos(width() / 2, height() / 2)
  ])
  
  add([
    text('you got'),
    origin('center'),
    scale(4),
    pos(width() / 2, 120)
  ])

  start('bedtime')