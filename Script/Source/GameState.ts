namespace Script {
    import f = FudgeCore;
    import fui = FudgeUserInterface;
  
    export class GameState extends f.Mutable {
      private uiPanel: HTMLDivElement;
      private static controller: fui.Controller;
      private static instance: GameState;
      public score: number;
      public hundreds: number;
      public startTime: number;
      public isGameOver: boolean;
      
      private constructor() {
        super();
        let domHud: HTMLDivElement = document.querySelector("#ui");
        this.uiPanel = document.querySelector("#ui-scorepanel");
        GameState.instance = this;
        GameState.controller = new fui.Controller(this, domHud);
        console.log(GameState.controller);
        this.startTime = Date.now();
        this.hundreds = 0;
        this.score = 0;
        this.isGameOver = false;

        document.getElementById('ui-scoreboard__form').addEventListener('submit', (e: any) => {
          e.preventDefault();
          let name: any = e.target[0].value;
          if (name !== null || name !== "") {
            Scoreboard.get().postScore(name,this.score).then((newScoreboard)=>{
              console.log(newScoreboard);
            });
          }
        });
      }

      public animateScore(): void{
        GameState.get().uiPanel.classList.add("animate");
        setTimeout(()=>{
          GameState.get().uiPanel.classList.remove("animate");
        },1000);
      }
  
      public static get(): GameState {
        return GameState.instance || new GameState();
      }

      public gameOver() {
        this.isGameOver = true;
        this.pauseLoop();
        Scoreboard.get().generateUi();
      }

      public toggleLoop(): void {
        document.hidden ? GameState.get().pauseLoop() : GameState.get().startLoop();
      }
    
      public startLoop(): void {
        if(!this.isGameOver) {
          graph.addEventListener("GameOverEvent", this.gameOver.bind(this));
          document.addEventListener("RestartGameEvent", this.restart.bind(this));
          this.uiPanel.classList.add("visible");
          Scoreboard.get().focusScoreboard(false);
          f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        }
      }

      public restart(): void {
        if(this.isGameOver) {
          this.score = 0;
          this.hundreds = 0;
          this.isGameOver = false;
          this.startLoop();
        } 
      }
    
      public pauseLoop(): void  {
        f.Loop.stop();
        Scoreboard.get().focusScoreboard(true);
      }
  
      protected reduceMutator(_mutator: f.Mutator): void {/* */ }
    }
  }