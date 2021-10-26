const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.VideoPlayer)
    video: cc.VideoPlayer = null;

    @property(cc.Slider)
    slider: cc.Slider = null;

    @property(cc.Sprite)
    audioSprite: cc.Sprite = null;

    @property(cc.SpriteFrame)
    muteIcon: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    unmuteIcon: cc.SpriteFrame = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let v = this.video.volume;
        this.slider.progress = v;
    }

    start () {

    }

    onClickVolume(){
        if(this.video.volume > 0){
            this.slider.progress = 0;
            this.video.volume = this.slider.progress;
            this.audioSprite.spriteFrame = this.muteIcon;
            
        } else{
            this.slider.progress = 0.1;
            this.video.volume = this.slider.progress;
            this.audioSprite.spriteFrame = this.unmuteIcon;
        }
    }
    onSlide(){
        this.video.volume = this.slider.progress;
        if(this.slider.progress > 0){
            this.audioSprite.spriteFrame = this.unmuteIcon;
        }else{
            this.audioSprite.spriteFrame = this.muteIcon;
        }
    }
    // update (dt) {}
}
