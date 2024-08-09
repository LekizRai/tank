(()=>{"use strict";var t,e={43:(t,e,s)=>{s(440);class i extends Phaser.Scene{constructor(){super("preload")}preload(){this.createLoadingGraphics(),this.load.on("progress",(t=>{this.progressBar.clear(),this.progressBar.fillStyle(8971347,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*t,16)}),this),this.load.on("complete",(()=>{this.progressBar.destroy(),this.loadingBar.destroy()}),this),this.load.pack("preload","./assets/pack.json","preload"),this.load.image("gun-1","./assets/images/gun-1.png"),this.load.image("hull-1","./assets/images/hull-1.png"),this.load.image("track-1","./assets/images/track-1.png"),this.load.image("bullet-1","./assets/images/bullet-1.png"),this.load.image("pause","./assets/images/pause.png"),this.load.image("replay","./assets/images/replay.png"),this.load.image("menu","./assets/images/menu.png"),this.load.image("board","./assets/images/board-1.png"),this.load.image("button","./assets/images/button.png"),this.load.image("track","./assets/images/effects/track/track.png"),this.load.image("banner","./assets/images/banner.png"),this.load.image("muted","./assets/images/muted.png"),this.load.image("unmuted","./assets/images/unmuted.png"),this.load.image("arrow","./assets/images/arrow.png"),this.load.atlas("bullet-explosion","./assets/images/effects/bullet-explosion/bullet-explosion.png","./assets/images/effects/bullet-explosion/bullet-explosion.json"),this.load.atlas("gun-flash","./assets/images/effects/gun-flash/gun-flash.png","./assets/images/effects/gun-flash/gun-flash.json"),this.load.audio("tank-shooting","./assets/audios/tank-shooting.mp3"),this.load.audio("hit-obstacle","./assets/audios/hit-obstacle.mp3"),this.load.audio("hit-tank","./assets/audios/hit-tank.mp3"),this.load.audio("click-down","./assets/audios/click-down.mp3"),this.load.audio("click-up","./assets/audios/click-up.mp3")}create(){this.anims.create({key:"bullet-explosion",frames:this.anims.generateFrameNames("bullet-explosion",{prefix:"bullet-explosion-",start:1,end:8}),frameRate:30,hideOnComplete:!0}),this.anims.create({key:"gun-flash",frames:this.anims.generateFrameNames("gun-flash",{prefix:"gun-flash-",start:1,end:5}),frameRate:20,hideOnComplete:!0}),this.sound.add("tank-shooting"),this.sound.add("hit-obstacle"),this.sound.add("hit-tank"),this.sound.add("click-down"),this.sound.add("click-up"),this.scene.start("menu")}createLoadingGraphics(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(16777215,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}class a extends Phaser.GameObjects.Sprite{constructor(t){super(t.scene,t.x,t.y,t.texture),this.rotation=t.rotation,this.initImage(),this.scene.add.existing(this),this.setScale(.7)}initImage(){this.bulletSpeed=1e3,this.setOrigin(.5,.5),this.setDepth(2),this.scene.physics.world.enable(this),this.body.setSize(10,10),this.scene.physics.velocityFromRotation(this.rotation-Math.PI/2,this.bulletSpeed,this.body.velocity)}doExplosion(){this.body.setEnable(!1),this.play("bullet-explosion").setScale(.3).on("animationcomplete",(()=>{this.destroy()}))}update(){}}class n extends Phaser.Events.EventEmitter{constructor(){super()}static getInstance(){return this.instance||(this.instance=new n),this.instance}}class o{constructor(){}static addScore(t){this.currentScore+=t}static updateHighScore(){this.highScore<this.currentScore&&(this.highScore=this.currentScore)}static getCurrentScore(){return this.currentScore}static getHighScore(){return this.highScore}static resetCurrentScore(){this.currentScore=0}static reset(){this.resetCurrentScore(),this.highScore=0}}o.currentScore=0,o.highScore=0;class h extends Phaser.GameObjects.Container{constructor(t,e,s){super(t,e,s),this.initTank(),this.scene.add.existing(this),this.eventEmitter=n.getInstance()}getBullets(){return this.bullets}initTank(){var t;this.flashSprite=this.scene.add.sprite(0,0,"gun-flash","gun-flash-1").setVisible(!1).setDepth(100),this.health=1,this.lastShoot=0,this.speed=100,this.directionArrow=this.scene.add.image(0,-120,"arrow").setScale(.2),this.tankLeftTrack=this.scene.add.image(-35,-15,"track-1").setScale(.6),this.tankRightTrack=this.scene.add.image(35,-15,"track-1").setScale(.6),this.tankHull=this.scene.add.image(0,0,"hull-1").setScale(.7).setOrigin(.5,.6),this.tankBody=this.scene.add.container(0,0),this.tankBody.add(this.directionArrow),this.tankBody.add(this.tankLeftTrack),this.tankBody.add(this.tankRightTrack),this.tankBody.add(this.tankHull),this.tankGun=this.scene.add.image(0,0,"gun-1").setScale(.7),this.addTrackTime=0,this.lifeBar=this.scene.add.graphics(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.add(this.tankBody),this.add(this.tankGun),this.add(this.lifeBar),this.redrawLifebar(),this.pointer=this.scene.input.activePointer,this.cursors=null===(t=this.scene.input.keyboard)||void 0===t?void 0:t.createCursorKeys(),this.scene.physics.world.enable(this),this.setSize(65,100),this.body.setSize(60,100)}update(t,e){this.active?(this.handleInput(e),this.handleShooting()):(this.destroy(),this.lifeBar.destroy())}handleInput(t){this.pointer.updateWorldPoint(this.scene.cameras.main);let e=Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.tankGun.x,this.tankGun.y,this.pointer.worldX-this.x,this.pointer.worldY-this.y)+Math.PI/2);Phaser.Math.Angle.ShortestBetween(this.tankGun.angle,e)>0?this.tankGun.angle+=1:this.tankGun.angle-=1,this.cursors.up.isDown?this.scene.physics.velocityFromAngle(this.tankBody.angle-90,this.speed,this.body.velocity):this.cursors.down.isDown?this.scene.physics.velocityFromAngle(this.tankBody.angle-90,-this.speed,this.body.velocity):this.body.setVelocity(0,0),this.cursors.left.isDown?this.tankBody.angle-=1:this.cursors.right.isDown&&(this.tankBody.angle+=1),this.flashSprite.setX(this.tankGun.x+this.x+100*Math.sin(Phaser.Math.DegToRad(this.tankGun.angle))),this.flashSprite.setY(this.tankGun.y+this.y-100*Math.cos(Phaser.Math.DegToRad(this.tankGun.angle))),this.flashSprite.setRotation(this.tankGun.rotation)}handleShooting(){(this.cursors.space.isDown||this.pointer.leftButtonDown())&&this.scene.time.now>this.lastShoot&&this.bullets.getLength()<10&&this.scene.time.now>this.lastShoot&&(this.scene.sound.play("tank-shooting",{volume:.3}),this.bullets.add(new a({scene:this.scene,rotation:this.tankGun.rotation,x:this.tankGun.x+this.x+100*Math.sin(this.tankGun.rotation),y:this.tankGun.y+this.y-100*Math.cos(this.tankGun.rotation),texture:"bullet-1"})),this.flashSprite.play("gun-flash").setVisible(!0),this.lastShoot=this.scene.time.now+100)}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(255,1),this.lifeBar.fillRect(-50,100,100*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-50,100,100,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.05,this.redrawLifebar()):(this.health=0,o.updateHighScore(),this.eventEmitter.emit("playerdead"),this.active=!1)}}class r extends Phaser.GameObjects.Container{getBullets(){return this.bullets}constructor(t,e,s){super(t,e,s),this.initTank(),this.scene.add.existing(this),this.eventEmitter=n.getInstance()}initTank(){this.scene.tweens.add({targets:this,props:{y:this.y-200},delay:0,duration:2e3,ease:"Linear",easeParams:null,hold:0,repeat:-1,repeatDelay:0,yoyo:!0}),this.health=1,this.lastShoot=0,this.speed=100,this.tankLeftTrack=this.scene.add.image(-35,-15,"track-1").setScale(.6),this.tankRightTrack=this.scene.add.image(35,-15,"track-1").setScale(.6),this.tankHull=this.scene.add.image(0,0,"hull-1").setScale(.7).setOrigin(.5,.6),this.tankBody=this.scene.add.container(0,0),this.tankBody.add(this.tankLeftTrack),this.tankBody.add(this.tankRightTrack),this.tankBody.add(this.tankHull),this.tankGun=this.scene.add.image(0,0,"gun-1").setScale(.7),this.lifeBar=this.scene.add.graphics(),this.bullets=this.scene.add.group({active:!0,maxSize:10,runChildUpdate:!0}),this.add(this.tankBody),this.add(this.tankGun),this.add(this.lifeBar),this.redrawLifebar(),this.scene.physics.world.enable(this),this.setSize(65,100),this.body.setSize(60,100)}update(){this.active?this.handleShooting():(this.destroy(),this.lifeBar.destroy())}handleShooting(){this.scene.time.now>this.lastShoot&&this.bullets.getLength()<10&&(this.bullets.add(new a({scene:this.scene,rotation:this.tankGun.rotation,x:this.tankGun.x+this.x+100*Math.sin(Phaser.Math.DegToRad(this.tankGun.angle)),y:this.tankGun.y+this.y-100*Math.cos(Phaser.Math.DegToRad(this.tankGun.angle)),texture:"bullet-1"})),this.lastShoot=this.scene.time.now+400)}redrawLifebar(){this.lifeBar.clear(),this.lifeBar.fillStyle(16711680,1),this.lifeBar.fillRect(-50,100,100*this.health,15),this.lifeBar.lineStyle(2,16777215),this.lifeBar.strokeRect(-50,100,100,15),this.lifeBar.setDepth(1)}updateHealth(){this.health>0?(this.health-=.05,this.redrawLifebar()):(this.health=0,o.addScore(25),this.eventEmitter.emit("enemydead"),this.active=!1)}setGunAngle(t){Phaser.Math.Angle.ShortestBetween(this.tankGun.angle,t)>0?this.tankGun.angle+=1:this.tankGun.angle-=1}}class l extends Phaser.GameObjects.Image{constructor(t){super(t.scene,t.x,t.y,t.texture),this.initImage(),this.scene.add.existing(this)}initImage(){this.setOrigin(0,0),this.scene.physics.world.enable(this),this.body.setImmovable(!0)}update(){}}class d extends Phaser.Scene{constructor(){super("gameplay")}init(){}create(){this.cameras.main.setBackgroundColor(0),this.map=this.make.tilemap({key:"levelMap"}),this.tileset=this.map.addTilesetImage("tiles"),this.layer=this.map.createLayer("tileLayer",this.tileset,0,0),this.layer.setCollisionByProperty({collide:!0}),this.obstacles=this.add.group({runChildUpdate:!0}),this.enemies=this.add.group({}),this.convertObjects(),this.physics.add.collider(this.player,this.layer),this.physics.add.collider(this.player,this.obstacles),this.physics.add.collider(this.player.getBullets(),this.layer,this.bulletHitLayer,void 0,this),this.physics.add.collider(this.player.getBullets(),this.obstacles,this.bulletHitObstacles,void 0,this),this.enemies.getChildren().forEach((t=>{const e=t;this.physics.add.overlap(this.player.getBullets(),e,this.playerBulletHitEnemy,void 0,this),this.physics.add.overlap(e.getBullets(),this.player,this.enemyBulletHitPlayer,void 0,this),this.physics.add.collider(e.getBullets(),this.obstacles,this.bulletHitObstacles,void 0,this),this.physics.add.collider(e.getBullets(),this.layer,this.bulletHitLayer,void 0,this)})),this.cameras.main.startFollow(this.player),this.eventEmitter=n.getInstance(),this.eventEmitter.on("transitiondone",(()=>{this.scene.launch("pause")})),this.eventEmitter.on("playerdead",(()=>{this.scene.launch("gameover"),this.scene.pause("gameplay"),this.scene.stop("pause")}))}update(t,e){this.player.update(t,e),this.enemies.getChildren().forEach((t=>{const e=t;if(e.update(),this.player.active&&e.active){const t=Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(e.body.x,e.body.y,this.player.body.x,this.player.body.y)+Math.PI/2);e.setGunAngle(t)}}))}convertObjects(){var t;(null===(t=this.map.getObjectLayer("objects"))||void 0===t?void 0:t.objects).forEach((t=>{if("player"===t.type)this.player=new h(this,t.x,t.y);else if("enemy"===t.type){const e=new r(this,t.x,t.y);this.enemies.add(e)}else{const e=new l({scene:this,x:t.x,y:t.y-40,texture:t.type});this.obstacles.add(e)}}))}bulletHitLayer(t){t.doExplosion()}bulletHitObstacles(t,e){t.doExplosion()}enemyBulletHitPlayer(t,e){this.sound.play("hit-tank",{volume:.2}),t.doExplosion(),e.updateHealth()}playerBulletHitEnemy(t,e){this.sound.play("hit-tank",{volume:.2}),t.doExplosion(),e.updateHealth()}doTransition(t){const e=this.cameras.main.postFX.addWipe(.3,1,1);this.scene.transition({target:"menu",duration:2e3,allowInput:!1,moveBelow:!0,onUpdate:t=>{e.progress=t}})}startPauseScene(){this.scene.launch("pause")}}const c=1500,u=1e3;class p extends Phaser.Scene{constructor(){super("transition")}preload(){}create(){this.leftDoor=this.add.image(-c-10,0,"door").setOrigin(0),this.rightDoor=this.add.image(c,0,"door").setOrigin(0)}doTransition(){this.add.tween({targets:this.leftDoor,x:-c/2,duration:500,ease:Phaser.Math.Easing.Expo.In,onComplete:()=>{this.add.tween({targets:this.leftDoor,x:-2e3,delay:600,duration:500,ease:Phaser.Math.Easing.Expo.In})}}),this.add.tween({targets:this.rightDoor,x:c/2,duration:500,ease:Phaser.Math.Easing.Expo.In,onComplete:()=>{this.add.tween({targets:this.rightDoor,x:2e3,delay:600,duration:500,ease:Phaser.Math.Easing.Expo.In})}})}}class g extends Phaser.Scene{constructor(){super("menu"),this.bitmapTexts=[]}create(){var t;this.cameras.main.setBackgroundColor(0);const e=null===(t=this.input.keyboard)||void 0===t?void 0:t.addKey(Phaser.Input.Keyboard.KeyCodes.S);e&&(this.startKey=e,this.startKey.isDown=!1);const s=this.add.bitmapText(this.sys.canvas.width/2-400,this.sys.canvas.height/2+100,"font","CLICK TO PLAY",60);this.add.tween({targets:s,alpha:.2,duration:500,yoyo:!0,repeat:-1}),this.add.bitmapText(this.sys.canvas.width/2-400,this.sys.canvas.height/2-100,"font","TANK",200),this.input.once("pointerdown",(()=>{this.doTransition("menu")})),this.scene.launch("transition"),this.eventEmitter=n.getInstance()}update(){}doTransition(t){const e=this.scene.get("transition");e instanceof p&&e.doTransition();const s=this.cameras.main.postFX.addWipe(.3,1,1);this.scene.transition({target:"gameplay",duration:2e3,allowInput:!1,moveBelow:!0,onUpdate:t=>{1==t&&this.eventEmitter.emit("transitiondone"),s.progress=t}})}}class m extends Phaser.GameObjects.Container{constructor(t,e,s,i,a,n){var o;super(t,e,s),this.isDown=!1,this.texture=this.scene.add.image(0,0,i).setInteractive(),this.text=this.scene.add.bitmapText(0,0,"font","",70,1),this.add(this.texture),this.add(this.text),a&&(n?this.setText(a,n):this.setText(a)),this.glow=null===(o=this.postFX)||void 0===o?void 0:o.addGlow(16777215,0),this.scene.add.existing(this),this.texture.on("pointerover",(()=>{this.isDown=!1})),this.texture.on("pointerout",(()=>{this.isDown=!1})),this.texture.on("pointerdown",(()=>{this.isDown=!0}))}setText(t,e){this.text.setText(t),e&&this.text.setFontSize(e),this.text.setX(-this.text.width/2),this.text.setY(-this.text.height/2.5)}setTexture(t){this.texture.setTexture(t)}enableGlow(t,e=8){this.glow.outerStrength=t?e:0}setGlowColor(t){this.glow.color=t}fade(t=.5,e=200,s=0){this.scene.add.tween({targets:this,alpha:t,duration:e,delay:s})}resize(t=.8,e=200,s=0){this.scene.add.tween({targets:this,scale:t,duration:e,delay:s})}onOver(t){this.texture.on("pointerover",t)}onOut(t){this.texture.on("pointerout",t)}onDown(t){this.texture.on("pointerdown",t)}onUp(t){this.texture.on("pointerup",t)}onClick(t){this.texture.on("pointerup",(()=>{this.isDown&&(this.isDown=!1,t())}))}}const y=(t,e,s=0,i=0)=>{Phaser.Display.Align.In.Center(t,e,s,i)},b=(t,e,s=0,i=0)=>{let a=(e.height-e.displayHeight)/2;a-=(t.height-t.displayHeight)/2,Phaser.Display.Align.In.TopCenter(t,e,s,-Math.floor(a)+i)};class k extends Phaser.GameObjects.Container{constructor(t,e,s){super(t,e,s),this.screenZone=this.scene.add.zone(c/2,u/2,c,u),this.init(),this.scene.add.existing(this),this.eventEmitter=n.getInstance()}init(){this.pauseButton=new m(this.scene,100,100,"pause","").setScale(.7),this.pauseButton.onClick((()=>{this.controlBoard.setScale(0),this.controlBoard.setAngle(-180),this.controlBoard.setVisible(!0),this.scene.add.tween({targets:this.controlBoard,angle:0,scale:.8,duration:200}),this.scene.add.tween({targets:this.pauseButton,scale:0,duration:200,onComplete:()=>{this.pauseButton.setVisible(!1)}}),this.scene.scene.pause("gameplay")})),this.pauseButton.onOver((()=>{this.pauseButton.enableGlow(!0)})),this.pauseButton.onOut((()=>{this.pauseButton.enableGlow(!1),this.pauseButton.fade(1,0)})),this.pauseButton.onDown((()=>{this.scene.sound.play("click-down"),this.pauseButton.fade(.8,0)})),this.pauseButton.onUp((()=>{this.scene.sound.play("click-up"),this.pauseButton.fade(1,0)})),this.controlBoard=this.scene.add.container(0,0).setScale(.8).setVisible(!1);const t=this.scene.add.image(0,0,"board"),e=new m(this.scene,0,0,"banner","PAUSE",100);b(e,t,0,-100);const s=new m(this.scene,0,0,"unmuted").setScale(.6);let i=!1;s.onClick((()=>{i?(i=!1,s.setTexture("unmuted"),this.scene.sound.setVolume(1)):(i=!0,s.setTexture("muted"),this.scene.sound.setVolume(0),this.scene.sound.get("click-down").setVolume(1),this.scene.sound.get("click-up").setVolume(1))})),s.onOver((()=>{s.enableGlow(!0)})),s.onOut((()=>{s.enableGlow(!1)})),s.onDown((()=>{this.scene.sound.play("click-down")})),s.onUp((()=>{this.scene.sound.play("click-up")})),y(s,t);const a=new m(this.scene,0,0,"button","CONTINUE",100).setScale(.6);a.onClick((()=>{this.scene.add.tween({targets:this.controlBoard,angle:180,scale:0,duration:200,onComplete:()=>{this.controlBoard.setVisible(!1)}}),this.pauseButton.setVisible(!0),this.scene.add.tween({targets:this.pauseButton,scale:.7,duration:200}),this.scene.scene.resume("gameplay")})),a.onOver((()=>{a.enableGlow(!0)})),a.onOut((()=>{a.enableGlow(!1),a.fade(1,0)})),a.onDown((()=>{this.scene.sound.play("click-down"),a.fade(.8,0)})),a.onUp((()=>{this.scene.sound.play("click-up"),a.fade(1,0)})),y(a,t,-300,200);const n=new m(this.scene,0,0,"button","RESTART",100).setScale(.6);n.onClick((()=>{this.scene.add.tween({targets:this.controlBoard,angle:180,scale:0,duration:200,onComplete:()=>{this.controlBoard.setVisible(!1)}}),this.pauseButton.setVisible(!0),this.scene.add.tween({targets:this.pauseButton,scale:.7,duration:200}),this.scene.scene.start("gameplay"),this.eventEmitter.emit("transitiondone")})),n.onOver((()=>{n.enableGlow(!0)})),n.onOut((()=>{n.enableGlow(!1),n.fade(1,0)})),n.onDown((()=>{this.scene.sound.play("click-down"),n.fade(.8,0)})),n.onUp((()=>{this.scene.sound.play("click-up"),n.fade(1,0)})),y(n,t,300,200),this.controlBoard.add(t),this.controlBoard.add(e),this.controlBoard.add(s),this.controlBoard.add(a),this.controlBoard.add(n),this.add(this.pauseButton),this.add(this.controlBoard),y(this.controlBoard,this.screenZone)}}class w extends Phaser.Scene{constructor(){super("pause")}preload(){}create(){this.pauseUI=new k(this,0,0),o.resetCurrentScore(),this.currentScore=this.add.bitmapText(c/2,50,"font","SCORE: "+String(o.getCurrentScore()),50,1),this.eventEmitter=n.getInstance(),this.eventEmitter.on("enemydead",(()=>{this.currentScore.setText("SCORE: "+String(o.getCurrentScore()))}))}update(t,e){}}class f extends Phaser.Scene{constructor(){super("init")}preload(){this.load.image("background","./assets/images/bg.png"),this.load.image("door","./assets/images/iron-wall.png")}create(){this.scene.start("preload"),this.scene.launch("transition")}}class B extends Phaser.GameObjects.Container{constructor(t,e,s){super(t,e,s),this.screenZone=this.scene.add.zone(c/2,u/2,c,u),this.init(),this.scene.add.existing(this),this.eventEmitter=n.getInstance()}init(){this.controlBoard=this.scene.add.container(0,0).setScale(.8).setVisible(!0);const t=this.scene.add.image(0,0,"board"),e=new m(this.scene,0,0,"banner","GAME OVER",100);b(e,t,0,-100);const s=new m(this.scene,0,0,"button","RESTART",100).setScale(.6);s.onClick((()=>{this.controlBoard.setScale(0),this.controlBoard.setAngle(-180),this.scene.add.tween({targets:this.controlBoard,angle:0,scale:.8,duration:200,onComplete:()=>{this.controlBoard.setVisible(!1)}}),this.scene.scene.start("gameplay"),this.eventEmitter.emit("transitiondone")})),s.onOver((()=>{s.enableGlow(!0)})),s.onOut((()=>{s.enableGlow(!1),s.fade(1,0)})),s.onDown((()=>{this.scene.sound.play("click-down"),s.fade(.8,0)})),s.onUp((()=>{this.scene.sound.play("click-up"),s.fade(1,0)})),y(s,t,-300,250);const i=new m(this.scene,0,0,"button","HOME",100).setScale(.6);i.onClick((()=>{this.controlBoard.setScale(0),this.controlBoard.setAngle(-180),this.scene.add.tween({targets:this.controlBoard,angle:0,scale:.8,duration:200,onComplete:()=>{this.controlBoard.setVisible(!1)}}),this.scene.scene.stop("gameover");const t=this.scene.scene.get("gameplay");t instanceof d&&t.doTransition("menu")})),i.onOver((()=>{i.enableGlow(!0)})),i.onOut((()=>{i.enableGlow(!1),i.fade(1,0)})),i.onDown((()=>{this.scene.sound.play("click-down"),i.fade(.8,0)})),i.onUp((()=>{this.scene.sound.play("click-up"),i.fade(1,0)})),y(i,t,300,250);const a=this.scene.add.bitmapText(0,0,"font","SCORE: "+String(o.getCurrentScore()),60,1),n=this.scene.add.bitmapText(0,0,"font","HIGHSCORE: "+String(o.getHighScore()),60,1);y(a,t,0,-50),y(n,t,0,50),this.controlBoard.add(t),this.controlBoard.add(e),this.controlBoard.add(s),this.controlBoard.add(i),this.controlBoard.add(a),this.controlBoard.add(n),this.add(this.controlBoard),y(this.controlBoard,this.screenZone)}}class x extends Phaser.Scene{constructor(){super("gameover")}preload(){}create(){this.gameoverUI=new B(this,0,0)}}const S={title:"Tank",url:"https://github.com/digitsensitive/phaser3-typescript",version:"0.0.1",width:c,height:u,zoom:.6,type:Phaser.AUTO,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},parent:"game",scene:[f,i,g,d,w,x,p],input:{keyboard:!0},physics:{default:"arcade",arcade:{gravity:{x:0,y:0}}},backgroundColor:"#000000",render:{antialias:!0}};class v extends Phaser.Game{constructor(t){super(t)}}window.addEventListener("load",(()=>{new v(S)}))}},s={};function i(t){var a=s[t];if(void 0!==a)return a.exports;var n=s[t]={exports:{}};return e[t].call(n.exports,n,n.exports,i),n.exports}i.m=e,t=[],i.O=(e,s,a,n)=>{if(!s){var o=1/0;for(d=0;d<t.length;d++){for(var[s,a,n]=t[d],h=!0,r=0;r<s.length;r++)(!1&n||o>=n)&&Object.keys(i.O).every((t=>i.O[t](s[r])))?s.splice(r--,1):(h=!1,n<o&&(o=n));if(h){t.splice(d--,1);var l=a();void 0!==l&&(e=l)}}return e}n=n||0;for(var d=t.length;d>0&&t[d-1][2]>n;d--)t[d]=t[d-1];t[d]=[s,a,n]},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t={792:0};i.O.j=e=>0===t[e];var e=(e,s)=>{var a,n,[o,h,r]=s,l=0;if(o.some((e=>0!==t[e]))){for(a in h)i.o(h,a)&&(i.m[a]=h[a]);if(r)var d=r(i)}for(e&&e(s);l<o.length;l++)n=o[l],i.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return i.O(d)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var a=i.O(void 0,[96],(()=>i(43)));a=i.O(a)})();