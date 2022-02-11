namespace Script {
    import f = FudgeCore;
  
    export class SFX extends f.Node {

        private audio: f.ComponentAudio;

        constructor(name: string, audioFileUri: string, eventTrigger: string) {
            super(name);
            this.audio = new f.ComponentAudio(new f.Audio(audioFileUri), false, false);
            this.audio.volume = 25;
            this.addComponent(this.audio);
            graph.addEventListener(eventTrigger, this.play.bind(this));
        }

        public play(_event: Event):void {
            this.audio.play(true);
        }
    }
}