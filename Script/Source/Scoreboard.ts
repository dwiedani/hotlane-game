namespace Script {
    import f = FudgeCore;

    export class Scoreboard extends f.Mutable {
        private static instance: Scoreboard;
        private scoreboard: any;
        private domHud;

        private constructor() {
            super();
            Scoreboard.instance = this;
            this.domHud = document.querySelector("#ui-scoreboard__inner");
        }

        public static get(): Scoreboard {
            return Scoreboard.instance || new Scoreboard();
          }

        public generateUi(){
            const ol = document.createElement('ol');
            this.scoreboard.forEach((item: any) => {
                const li = document.createElement('li');
                ol.appendChild(li);
                li.innerHTML += item.name + ": " + item.score + "m";
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
            fetch('https://hotlane-scoreboard.herokuapp.com/score?TOKEN=' + '3t3tg34ff34fwsdfagh',{
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
