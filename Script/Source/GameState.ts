namespace Script {
    import f = FudgeCore;
    import fui = FudgeUserInterface;
  
    export class GameState extends f.Mutable {
      private static controller: fui.Controller;
      private static instance: GameState;
      public score: number;
      public hundreds: number;
      public startTime: number;
      private isGameOver: boolean;
      
      private constructor() {
        super();
        let domHud: HTMLDivElement = document.querySelector("#ui");
        GameState.instance = this;
        GameState.controller = new fui.Controller(this, domHud);
        console.log("Hud-Controller", GameState.controller);
        this.startTime = Date.now();
        this.hundreds = 0;
        this.score = 0;
        this.isGameOver = false;
      }
  
      public static get(): GameState {
        return GameState.instance || new GameState();
      }

      public gameOver() {
        this.isGameOver = true;
        this.pauseLoop();
          let name = prompt("Game Over at: " + this.score +"m, Please enter your name", "anonymous");
        if (name !== null || name !== "") {
          Scoreboard.get().postScore(name,this.score).then((newScoreboard)=>{
            console.log(newScoreboard);
          });
        }
      }

      public toggleLoop(): void {
        document.hidden ? GameState.get().pauseLoop() : GameState.get().startLoop();
      }
    
      public startLoop(): void {
        if(!this.isGameOver)
          f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
      }
    
      public pauseLoop(): void  {
        f.Loop.stop();
      }
  
      protected reduceMutator(_mutator: f.Mutator): void {/* */ }
    }
  }