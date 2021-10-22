const {ccclass, property} = cc._decorator;
cc.macro.ENABLE_TRANSPARENT_CANVAS = true;
@ccclass
export default class Video extends cc.Component {

    @property(cc.Node)
    enterScreen: cc.Node = null;

    @property(cc.Node)
    tapToContinue: cc.Node = null;
    
    @property(cc.Node)
    Games: cc.Node = null;

    @property(cc.Node)
    videoPlayer: cc.Node = null;

    @property(cc.VideoPlayer)
    video: cc.VideoPlayer = null;

    @property(cc.Button)
    overlayButton: cc.Button = null;

    @property(cc.Prefab)
    videoPlayerPrefab: cc.Prefab = null;

    @property(cc.Node)
    backBtn: cc.Node = null;
    isload = false;
    onLoad () {
        this.ShowTapToContinue();
        this.videoPlayer.on('meta-loaded',this.playTest,this);
    }

    start () {
    }
    playTest(){
      this.isload = true;
    }
    ShowTapToContinue() {
        // this.video.node.on('meta-loaded', ()=>{console.log("loaded")}, this);
        cc.tween(this.tapToContinue)
          .delay(2)
          .call(() => {
            var self = this;
            this.tapToContinue.active = true;
            cc.tween(this.tapToContinue).to(0.5, { opacity: 255 }).start();
            this.overlayButton.interactable = true;
            // this.video.isFullscreen = false;
            this.instantiateVideo();
            this.videoPlayer.active = true;
            this.Games.active = false;
          })
          .start();
    }
    onStartButtonClick() {
      console.log('onStartButtonClick',this.isload)
      let self = this;
      let testFunc = ()=>{
        self.enterScreen.active = false;
        self.tapToContinue.opacity = 0;
        self.overlayButton.interactable = false;
        self.instantiateVideo();
        self.videoPlayer.active = true;
        self.video.node.on(
          "completed",
          () => {
            // this.videoPlayer.setScale(1);
            self.video.stop();
            self.video.node.parent = null;
            self.video.node.destroy();
            self.Games.active = true;
            self.backBtn.active = true;
          },
          self
        );
        
      }
      if(this.isload){
        self.scheduleOnce(()=>{
          testFunc()
          
          },0.5)
          self.video.play();
      }
    }
    instantiateVideo(){
        if(!cc.isValid(this.videoPlayer)){
            this.videoPlayer = cc.instantiate(this.videoPlayerPrefab);
            this.video = this.videoPlayer.getComponent(cc.VideoPlayer);
            this.videoPlayer.parent = cc.find("Canvas");
        }
    }
    onBackButtonClick() {
        this.backBtn.active = false;
        this.Games.active = false;
        this.enterScreen.active = true;
        this.ShowTapToContinue();
      }
    // update (dt) {}
}