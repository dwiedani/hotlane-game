namespace Script {
  import f = FudgeCore;
  f.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class RoadComponentScript extends f.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = f.Component.registerSubclass(CustomComponentScript);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public message: string = "RoadComponentScript added to ";

    private transform: f.Matrix4x4;
    private startPosition: f.Vector3;
    private roadWidth: number;
    private roadLength: number;
    private speedInc: number = 50;
    private maxSpeed: number = 100;
    private obstacleWidthMin: number = 2;
    private spawnTrigger: boolean = true;


    constructor() {
      super();

      // Don't start when running in editor
      if (f.Project.mode == f.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(f.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(f.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(f.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    public create = (_event: Event): void => {
      this.roadWidth = this.node.getComponent(f.ComponentMesh).mtxPivot.scaling.x;
      this.roadLength = this.node.getComponent(f.ComponentMesh).mtxPivot.scaling.z;
      this.transform = this.node.getComponent(f.ComponentTransform).mtxLocal;
      this.startPosition = new f.Vector3(this.transform.translation.x,this.transform.translation.y,-this.roadLength);
      this.maxSpeed = 125;
      f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
    }

    public update = (_event: Event): void => {
      // ISSUE: Roads start to seperate when using frameTime
      let speed: number = this.speedInc * (f.Loop.timeFrameReal / 1000);
      this.speedInc += this.speedInc <= this.maxSpeed ? 0.03 : 0;

      if(this.transform.translation.z >= 0){
        GameState.get().score = GameState.get().hundreds + Math.floor(this.transform.translation.z);
      }

      this.reset();
      this.transform.translateZ(speed);
    }

    public spawnObstacle(): void{
      if(this.spawnTrigger){
        this.spawnTrigger = false;
        let obstacleWidth: number = (Math.random() * (this.roadWidth/4 - this.obstacleWidthMin)) + this.obstacleWidthMin;
        let obstaclePosition: number = (Math.random() * (this.roadWidth - obstacleWidth));
        this.node.addChild(new Obstacle("Obstacle", obstaclePosition,obstacleWidth));
        setTimeout(()=>{
          this.spawnTrigger = true;
        },1000);
      }
    }

    public reset(): void{
      if(this.transform.translation.z >= this.roadLength){
        this.transform.mutate({
          translation: this.startPosition,
        });

        this.node.getChildrenByName("Obstacle").forEach((obstacle)=>{
          this.node.removeChild(obstacle);
        });
             
        GameState.get().hundreds += this.roadLength;
        if(GameState.get().score >= 1000){
          if(Math.floor(GameState.get().hundreds) % 1000 === 0) {
            GameState.get().animateScore();
          }
        } else {
          GameState.get().animateScore();
        }
        
        Scoreboard.get().updateUi();
        
        this.spawnObstacle();
      } 
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case f.EVENT.COMPONENT_ADD:
          f.Debug.log(this.message, this.node);
          this.create(_event);
          break;
        case f.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(f.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(f.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case f.EVENT.NODE_DESERIALIZED:
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }

    // protected reduceMutator(_mutator: f.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
  }
}