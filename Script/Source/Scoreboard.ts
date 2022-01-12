namespace Script {
    import f = FudgeCore;
    import dotenv = Dotenv;

    export class Scoreboard extends f.Mutable {
        private static instance: Scoreboard;
        private scoreboard: any;
        private domHud;

        private constructor() {
            super();
            Scoreboard.instance = this;
            dotenv.config();
            this.domHud = document.querySelector("#ui-scoreboard__inner");
            console.log("token", process.env.HOTLANE_SERVICE_TOKEN);
        }

        public static get(): Scoreboard {
            return Scoreboard.instance || new Scoreboard();
          }

        public generateUi(){
            const ol = document.createElement('ol');
            this.scoreboard.forEach((item: any) => {
                const li = document.createElement('li');
                ol.appendChild(li);
                li.innerHTML += item.name + ": " + item.score;
            });
            this.domHud.innerHTML = '';
            this.domHud.append(ol);
        }

        public async loadScoreboard(): Promise<any> {
            return new Promise(resolve => {
              fetch('https://hotlane-scoreboard.herokuapp.com/score',{
                method: 'GET'
              }).then(response => response.json())
                .then((data) => {            
                  this.scoreboard = data.scoreboard;
                  this.generateUi();
                  resolve(this.scoreboard);
                });
            })
          }
    
        public async postScore(name: string, score: number): Promise<any> {
          return new Promise(resolve => {
            fetch('https://hotlane-scoreboard.herokuapp.com/score?TOKEN=' + process.env.HOTLANE_SERVICE_TOKEN,{
              method: 'POST',
              body: JSON.stringify({
                "name": name,
                "score": score
              })
            }).then(response => response.json())
              .then((data) => {            
                this.scoreboard = data.scoreboard;
                this.generateUi();
                resolve(this.scoreboard);
              });
          })
        }

          protected reduceMutator(_mutator: f.Mutator): void {/* */ }
    }
}
