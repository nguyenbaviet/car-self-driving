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

    // LIFE-CYCLE CALLBACKS:
    i:number = 0

    onLoad () {
        var manager = cc.director.getCollisionManager()
        // this.i = 0
        manager.enabled = true
    }
    onCollisionEnter(selfCollider, otherCollider){
        var final_path = this.node.getParent().getComponent('main').final_path
        var coordinate = this.node.getParent().getComponent('main').coordinate
        console.log(final_path)
        if(final_path.length > 1){
            if(coordinate[final_path[0]][1] == coordinate[final_path[1]][1]){
                if(coordinate[final_path[0]][0] < coordinate[final_path[1]][0]){
                    this.node.getParent().getComponent('main').xInc = true
                    this.node.getParent().getComponent('main').xDec = false
                    this.node.getParent().getComponent('main').yInc = false
                    this.node.getParent().getComponent('main').yDec = false
                } else{
                    this.node.getParent().getComponent('main').xInc = false
                    this.node.getParent().getComponent('main').xDec = true
                    this.node.getParent().getComponent('main').yInc = false
                    this.node.getParent().getComponent('main').yDec = false
                }
            } else {
                if(coordinate[final_path[0]][1] < coordinate[final_path[1]][1]){
                    this.node.getParent().getComponent('main').xInc = false
                    this.node.getParent().getComponent('main').xDec = false
                    this.node.getParent().getComponent('main').yInc = true
                    this.node.getParent().getComponent('main').yDec = false
                } else{
                    this.node.getParent().getComponent('main').xInc = false
                    this.node.getParent().getComponent('main').xDec = false
                    this.node.getParent().getComponent('main').yInc = false
                    this.node.getParent().getComponent('main').yDec = true
                }
            }
            this.node.getParent().getComponent('main').final_path.shift()
        } else(this.node.getParent().getComponent('main').car.destroy())
        this.node.destroy()
    }
    start () {

    }

    // update (dt) {}
}
