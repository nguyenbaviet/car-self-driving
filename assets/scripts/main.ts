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

    @property(cc.Node)
    car:cc.Node = null;
    @property(cc.Node) light:cc.Node = null;
    @property(cc.Prefab) rock: cc.Prefab = null;
    @property(cc.Prefab) flag: cc.Prefab = null;
    // @property(cc.Button) btn_Start:cc.Button = null;

    checkStart:boolean
    checkMap:boolean = false
    endPoisition:number = 8
    timer: number;
    distance: number;
    final_path:number[]
    cost_matrix:number[][]
    coordinate: any[]
    check: boolean[]
    rockArray: number[][]

    xInc:boolean
    xDec:boolean
    yInc:boolean
    yDec:boolean

    // LIFE-CYCLE CALLBACKS:
    
    onKeyDown(event){
        switch(event.keyCode){
            case cc.macro.KEY.s:
                this.checkStart = true
                console.log('s')
                console.log(this.checkStart)
                break
            case cc.macro.KEY.m:
                this.checkMap = true
                break
            case cc.macro.KEY.f1:
                this.endPoisition = 1
                break
            case cc.macro.KEY.f2:
                this.endPoisition = 2
                break
            case cc.macro.KEY.f3:
                this.endPoisition = 3
                console.log(this.endPoisition)
                break
            case cc.macro.KEY.f4:
                this.endPoisition = 4
                break
            case cc.macro.KEY.f9:
                this.endPoisition = 5
                break
            case cc.macro.KEY.f6:
                this.endPoisition = 6
                break
            case cc.macro.KEY.f7:
                this.endPoisition = 7
                break
            case cc.macro.KEY.f8:
                this.endPoisition = 8
                break
        }
    }

    getDistance(){
        return this.light.x - this.car.x;
    }
    setCostMatrix(){
        this.cost_matrix = new Array()
        for(var i = 0; i < 9; i++){
            this.cost_matrix.push([100, 100, 100, 100, 100, 100, 100, 100, 100]);
            // penalty_matrix.push([1, 1, 1, 1, 1, 1, 1 , 1, 1]);
        }
        for(var i = 0; i< 9; i++){
            this.cost_matrix[i][i] =0;
        }
        this.cost_matrix[0][1] = this.cost_matrix[1][0] = 1;
        this.cost_matrix[1][2] = this.cost_matrix[2][1] = 1;
        this.cost_matrix[1][6] = this.cost_matrix[6][1] = 1;
        this.cost_matrix[2][3] = this.cost_matrix[3][2] = 1;
        this.cost_matrix[2][4] = this.cost_matrix[4][2] = 1;
        this.cost_matrix[2][6] = this.cost_matrix[6][2] = 1;
        this.cost_matrix[4][5] = this.cost_matrix[5][4] = 1;
        this.cost_matrix[4][6] = this.cost_matrix[6][4] = 1;
        this.cost_matrix[4][7] = this.cost_matrix[7][4] = 1;
        this.cost_matrix[7][6] = this.cost_matrix[6][7] = 1;
        this.cost_matrix[7][8] = this.cost_matrix[8][7] = 1;
    }
    addFlag(i, j){
        var flag:number[]
        flag = new Array()
        if(i == 7 && j == 6){
            flag.push(17)
            flag.push(13)
            flag.push(12)
        } else if(i == 4 && j == 6){
            flag.push(10)
            flag.push(15)
            flag.push(14)
        } else if((i == 6 && j == 2) || (i == 2 && j == 6)){
            flag.push(11)
        } else if((i == 2 && j == 4) || (i == 4 && j == 2)){
            flag.push(9)
        } else if(i == 6 && j == 4){
            flag.push(14)
            flag.push(15)
            flag.push(10)
        } else if((i == 4 && j == 7) || (i == 7 && j == 4)){
            flag.push(16)
        } else if(i == 6 && j == 7){
            flag.push(12)
            flag.push(13)
            flag.push(17)
        }
        return flag
    }
    // choose road for car
    setFlag(){

        this.final_path.reverse()
        this.coordinate = new Array()
        this.coordinate.push([-530, -300]) // 0
        this.coordinate.push([-186, -300]) // 1
        this.coordinate.push([189, -300])  // 2
        this.coordinate.push([189, -391])  // 3
        this.coordinate.push([568, -170])  // 4
        this.coordinate.push([642, -170])  // 5
        this.coordinate.push([-186, -106]) // 6
        this.coordinate.push([10, 317])    // 7
        this.coordinate.push([-631, 317])  //8

        //put fix flag
        this.coordinate.push([568, -300])  // 9
        this.coordinate.push([322, -170])  // 10
        this.coordinate.push([189, -106])  // 11
        this.coordinate.push([-502, -106]) // 12
        this.coordinate.push([-502, 205])  // 13
        this.coordinate.push([-186, 107])  // 14
        this.coordinate.push([322, 107])   // 15
        this.coordinate.push([568, 317])   // 16
        this.coordinate.push([10, 205])    // 17
        var i = this.final_path.length - 1
        for(i; i>0; i--){
            var nFlag = new Array()
            nFlag = this.addFlag(this.final_path[i-1], this.final_path[i])
            if(nFlag.length != 0){
                var a = this.final_path.slice(0, i)
                var b = this.final_path.slice(i, this.final_path.length)
                a = a.concat(nFlag)
                a = a.concat(b)
                this.final_path = a
                // console.log(this.final_path)
            }
        }
        for(let i of this.final_path){
            var newFlag = cc.instantiate(this.flag)
            newFlag.addComponent(cc.CircleCollider)
            newFlag.group = 'flag'
            this.node.addChild(newFlag)
            newFlag.setPosition(cc.v2(this.coordinate[i][0], this.coordinate[i][1]))
        }

    }
    setRock(){
        this.rockArray = new Array()
        for(var i = 0; i < this.final_path.length - 1; i ++){
            // x : x, y: y
            var maxAppear = Math.floor(Math.random()*4)
            if(this.coordinate[this.final_path[i]][0] == this.coordinate[this.final_path[i+1]][0]){
                var x:number[] = new Array()
                x.push(this.coordinate[this.final_path[i]][0])
                x.push(this.coordinate[this.final_path[i]][0] - 8)
                x.push(this.coordinate[this.final_path[i]][0] + 8)
                for(var j = 0; j < maxAppear; j++){
                    var y;
                    if(this.coordinate[this.final_path[i]][1] < this.coordinate[this.final_path[i+1]][1]){
                        y = Math.floor(Math.random()*Math.abs(this.coordinate[this.final_path[i]][1] - this.coordinate[this.final_path[i+1]][1]) +this.coordinate[this.final_path[i]][1])
                    } else{
                        y = Math.floor(Math.random()*Math.abs(this.coordinate[this.final_path[i]][1] - this.coordinate[this.final_path[i+1]][1]) + this.coordinate[this.final_path[i+1]][1])
                    }
                    var t = Math.floor(Math.random() * 10)
                    this.rockArray.push([x[t%3], y])
                }
                // x : y, y : x(do phai dat nhieu bien :)) )
            } else{
                var x:number[] = new Array()
                x.push(this.coordinate[this.final_path[i]][1])
                x.push(this.coordinate[this.final_path[i]][1] - 8)
                x.push(this.coordinate[this.final_path[i]][1] + 8)
                for(var j = 0; j < maxAppear; j++){
                    var y;
                    if(this.coordinate[this.final_path[i]][0] < this.coordinate[this.final_path[i+1]][0]){
                        y = Math.floor(Math.random()*Math.abs(this.coordinate[this.final_path[i]][0] - this.coordinate[this.final_path[i+1]][0]) + this.coordinate[this.final_path[i]][0])
                    } else{
                        y = Math.floor(Math.random()*Math.abs(this.coordinate[this.final_path[i]][0] - this.coordinate[this.final_path[i+1]][0]) + this.coordinate[this.final_path[i+1]][0])
                    }
                    var t = Math.floor(Math.random() * 10)
                    this.rockArray.push([y, x[t%3]])
                }
            }
        }
        for(var i = 0; i < this.rockArray.length; i ++){
            var new_rock = cc.instantiate(this.rock)
            new_rock.addComponent(cc.CircleCollider)
            new_rock.group = 'rock'
            this.node.addChild(new_rock)
            new_rock.setPosition(cc.v2(this.rockArray[i][0], this.rockArray[i][1]))
        }
    }
    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        
    }
    dijiktra(start, end, cost_matrix){
        var d:number[] = new Array()
        var u:boolean[] = new Array()
        var path:number[] = new Array()
        this.final_path = new Array()
        for(var i = 0; i < 9; i++){
            d.push(100)
            u.push(false)
            path.push(-1)
        }
        d[start] = 0
        
        for(var i = 0; i< 9; i++){
            var v = -1;
            for(var j = 0; j < 9; j++){
                if(!u[j] && (v == -1 || d[j] < d[v])){
                    v = j;
                    break;
                }
            }
            // if(d[v] == 100){
            //     break;
            // }
            u[v] = true;
            for(var ind = 0; ind < 9; ind++){
                var distance = cost_matrix[v][ind];
                if(d[v] + distance < d[ind]){
                    d[ind] = d[v] + distance;
                    path[ind] = v;
                }
            }
        }
        while(true){
            this.final_path.push(end)
            if(path[end] == start){
                this.final_path.push(start)
                break
            }
            end = path[end]

        }
    }

    start () {

    }

    update (dt) {
        if(this.checkMap){
            this.setCostMatrix()
            this.dijiktra(0, this.endPoisition, this.cost_matrix)
            this.setFlag()
            this.setRock()
            this.checkMap = false
        }
        if(this.checkStart){
            this.xInc = true
            this.checkStart = false
        }
        if(this.xInc){
            this.node.getChildByName('car').x += 1
        } else if (this.xDec){
            this.node.getChildByName('car').x -= 1
        } else if(this.yInc){
            this.node.getChildByName('car').y += 1
        } else if(this.yDec){
            this.node.getChildByName('car').y -= 1
        }
    }
}
