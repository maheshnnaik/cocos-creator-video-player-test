const { ccclass, property } = cc._decorator;
cc.macro.ENABLE_TRANSPARENT_CANVAS = true; // make canvas transparent. In CC3, this can be done in project setting.
@ccclass
export default class Video extends cc.Component {

	@property(cc.Node)
	tapToContinue: cc.Node = null;

	@property(cc.Node)
	bg2: cc.Node = null;

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

	@property(cc.Node)
	audioBtn: cc.Node = null;

	HTMLVideoElement: HTMLVideoElement = null;
	isMuted: boolean = false;
	onLoad() {
	}

	start() {
		this.HTMLVideoElement = document.querySelector('video');
		if (this.isMuted) {
			this.HTMLVideoElement.muted = true;
		}
		else {
			this.HTMLVideoElement.muted = false;
		}
	}
	onStartButtonClick() {
		let self = this;
		self.tapToContinue.opacity = 0;
		self.overlayButton.interactable = false;
		self.instantiateVideo();
		self.videoPlayer.active = true;
		self.video.node.on(
			"completed",
			() => {
				self.video.node.parent = null;
				self.video.node.destroy(); // removes video element from DOM
				self.bg2.active = true;
				self.backBtn.active = true;
			},
			self
		);
		self.video.play();
	}
	instantiateVideo() {
		if (!cc.isValid(this.videoPlayer)) {
			this.videoPlayer = cc.instantiate(this.videoPlayerPrefab);
			this.video = this.videoPlayer.getComponent(cc.VideoPlayer);
			this.videoPlayer.parent = cc.find("Canvas");
		}
	}
	onBackButtonClick() {
		this.backBtn.active = false;
		this.bg2.active = false;
		this.instantiateVideo();
		this.tapToContinue.opacity = 255;
		this.overlayButton.interactable = true;
		this.HTMLVideoElement = document.querySelector('video');
		if (this.isMuted) {
			this.HTMLVideoElement.muted = true;
		}
		else {
			this.HTMLVideoElement.muted = false;
		}
	}
	onAudioBtnClicked(){
		if(this.isMuted){
			this.audioBtn.children[0].getComponent(cc.Label).string = "Mute";
			this.isMuted = false;
			this.HTMLVideoElement.muted = false;
		}else{
			this.audioBtn.children[0].getComponent(cc.Label).string = "Unmute";
			this.isMuted = true;
			this.HTMLVideoElement.muted = true;
		}
	}
	// update (dt) {}
}