// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.VideoPlayer)
    video: cc.VideoPlayer = null;

    // onLoad(){}

    start () {
    }

    onClickedPlay(){
        if(!this.video.isPlaying())
            this.video.play();
    }
    onClickedPause(){
        if(this.video.isPlaying())
            this.video.pause();
    }
    onClickedStop(){
        this.video.stop();
    }
    // update (dt) {}
}
