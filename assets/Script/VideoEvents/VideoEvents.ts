// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
let  getStatus =(event)=> {
    switch (event) {
        case cc.VideoPlayer.EventType.PLAYING:
            return 'PLAYING';
        case cc.VideoPlayer.EventType.PAUSED:
            return 'PAUSED';
        case cc.VideoPlayer.EventType.STOPPED:
            return 'STOPPED';
        case cc.VideoPlayer.EventType.COMPLETED:
            return 'COMPLETED';
        case cc.VideoPlayer.EventType.META_LOADED:
            return 'META_LOADED';
        case cc.VideoPlayer.EventType.CLICKED:
            return 'CLICKED';
        case cc.VideoPlayer.EventType.READY_TO_PLAY:
            return 'READY_TO_PLAY';
        default:
            return 'NONE';
    }
  }
@ccclass
export default class VideoEvents extends cc.Component {

    @property(cc.Label)
    status: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    video: cc.VideoPlayer = null;
    onLoad () {
        this.video = this.node.getComponent(cc.VideoPlayer);
        this.node.on('clicked', this.onClicked, this);
        // this.node.on('completed', this.onCompleted, this);
    }

    start () {

    }

    onVideoPlayerEvent (sender, event) {
        console.log('status: '+getStatus(event))
        this.status.string = getStatus(event);
        // if (event === cc.VideoPlayer.EventType.CLICKED) {
        //     this.onClicked();
        // }else if (event === cc.VideoPlayer.EventType.READY_TO_PLAY || event === cc.VideoPlayer.EventType.META_LOADED) {
            
        // }else if (event === cc.VideoPlayer.EventType.PLAYING) {
            
        // }
    }
    onClicked(){
        if(this.video.isPlaying()){
            this.video.pause();
        }else{
            this.video.play();
        }
    }
    onCompleted(){

    }
    // update (dt) {}
}
