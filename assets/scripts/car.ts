// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // horizontal : 40
    // vertical : 60
    // center: road1 - Y-303
    
    @property
    accel:number = 0
    @property
    duration:number = 0
    
    move: any
    actXInc: boolean
    actXDec: boolean
    actYInc: boolean
    actYDec: boolean
    speed: number
    timer:number
    passLight: boolean
    direction:number
    //t = 0 -> giua 
    //t = 1 -> trai
    //t = 2 -> phai


    // LIFE-CYCLE CALLBACKS:

    // onKeyDown(event){
    //     var moveStraight = cc.moveBy(this.duration,cc.v2(this.speed, 0)).easing(cc.easeCubicActionInOut());
    //     var moveTurnAround = cc.moveBy(this.duration,cc.v2(-this.speed, 0)).easing(cc.easeCubicActionInOut());
    //     var moveLeft = cc.moveBy(this.duration,cc.v2(0, -this.speed)).easing(cc.easeCubicActionInOut());
    //     var moveRight = cc.moveBy(this.duration,cc.v2(0, this.speed)).easing(cc.easeCubicActionInOut());
    //     // var rotateLeft = cc.rotateBy(this.duration, -90);
    //     // var rotateRight = cc.rotateBy(this.duration, 180);
    //     switch(event.keyCode){
    //         case cc.macro.KEY.a:
    //             this.move = moveTurnAround;
    //             this.actXDec = true;
    //             break;
    //         case cc.macro.KEY.d:
    //             this.move = moveStraight;
    //             this.actXInc = true;
    //             // this.move = this.speedDown;
    //             break;
    //         case cc.macro.KEY.s:
    //             this.move = moveLeft;
    //             this.actYDec = true;
    //             break;
    //         case cc.macro.KEY.w:
    //             this.move = moveRight;
    //             this.actYInc = true;
    //             break;
    //         // case cc.macro.KEY.q:
    //         //     this.move = rotateLeft;
    //         //     break;
    //         // case cc.macro.KEY.e:
    //         //     this.move = rotateRight;
    //         //     break;
    //     };
    // }

    // onKeyUp(){
    //     this.actXDec = false;
    //     this.actXInc = false;
    //     this.actYDec = false;
    //     this.actYInc = false;
    //     // console.log('X : ', this.node.x);
    //     // console.log('Y : ', this.node.y);
    // }

    onLoad () {
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);

        this.actXDec = false;
        this.actXInc = true;
        this.actYDec = false;
        this.actYInc = false;
        this.timer = 0;
        this.passLight = false;
        this.direction = 0
    }

    speedUp(){
        this.speed += 1;
    }

    speedDown(){
        while(this.accel > 0){
            this.accel -= 100;
        }
    }

    start () {

    }

    update (dt) {
    //     var d = this.node.getParent().getComponent('main').getDistance();
    //     if(d < 100 && !this.passLight){
    //         this.timer += dt;
    //         this.actXInc = false;
    //     }

    //     if(this.timer > 10){
    //         this.passLight = true;
    //         this.timer = 0;
    //         this.actXInc = true;
    //     }

    //     this.speed = this.accel * dt;
    //     if(this.actXInc){
    //         this.node.x += this.speed; 
    //     } else if(this.actXDec){
    //         this.node.x -= this.speed;
    //     } else if(this.actYInc){
    //         this.node.y += this.speed;
    //     } else if(this.actYDec){
    //         this.node.y -= this.speed;
    //     }
    // }
}
