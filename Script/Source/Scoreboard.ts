namespace Script {
    import f = FudgeCore;

    export class Scoreboard extends f.Mutable {
        private static instance: Scoreboard;
        private scoreboard: any;
        private domHud;
        private scoreboardHud;

        private constructor() {
            super();
            Scoreboard.instance = this;
            this.domHud = document.querySelector("#ui-scoreboard");
            this.scoreboardHud = document.querySelector("#ui-scoreboard__inner");
        }

        public static get(): Scoreboard {
          return Scoreboard.instance || new Scoreboard();
        }

        public focusScoreboard(toggle: boolean): void {
          toggle ? this.domHud.classList.add('focus') : this.domHud.classList.remove('focus');
        }

        public generateUi(): void {
            const ol = document.createElement('ol');
            this.scoreboard.forEach((item: any) => {
                if(item.score > GameState.get().score) {
                  const li = document.createElement('li');
                  const name = document.createElement('span');
                  name.classList.add('scoreboard__name');
                  name.innerHTML = '[' + item.name + ']';
                  const score = document.createElement('span');
                  score.classList.add('scoreboard__score');
                  score.innerHTML =  item.score + "m";
                  li.appendChild(name);
                  li.appendChild(score);
                  ol.appendChild(li);
                }
                
            });
            this.scoreboardHud.innerHTML = '';
            this.scoreboardHud.append(ol);
        }

        public updateUi(): void {
          let scrollValue: number = 0;
          this.scoreboard.forEach((item: any) => {
            if(item.score > GameState.get().score) {
              scrollValue += 16;
            }
          });
          this.scoreboardHud.scrollTop = scrollValue;
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
