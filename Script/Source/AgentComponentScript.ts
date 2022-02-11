namespace Script {
  import f = FudgeCore;
  f.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class AgentComponentScript extends f.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = f.Component.registerSubclass(AgentComponentScript);
    // Properties may be mutated by users in the editor via the automatically created user interface
    private canMove: boolean = true;
    private speed: number = 5000.0;
    private control: f.Control;
    //private agentTransform: f.Matrix4x4;
    private body: f.ComponentRigidbody; 
    private zPosition: number;
    private collisions: any;

    constructor() {
      super();
      this.control = new f.Control("Movement", 1, f.CONTROL_TYPE.PROPORTIONAL);
      this.control.setDelay(1);

      // Don't start when running in editor
      if (f.Project.mode == f.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(f.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(f.EVENT.COMPONENT_REMOVE, this.hndEvent);
    }


    public create = () => {
      //this.agentTransform = this.node.getComponent(f.ComponentTransform).mtxLocal;
      this.body = this.node.getComponent(f.ComponentRigidbody);
      this.body.addEventListener(f.EVENT_PHYSICS.COLLISION_ENTER, this.handleCollisionEnter);
    
      setTimeout(()=>{
        this.zPosition = this.node.mtxWorld.translation.z;
      },1000);
      
      f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
    }

    public update = (_event: Event) => {
      let moveValue: number = f.Keyboard.mapToTrit([f.KEYBOARD_CODE.ARROW_RIGHT, f.KEYBOARD_CODE.D], [f.KEYBOARD_CODE.ARROW_LEFT, f.KEYBOARD_CODE.A]);
      
      if(this.canMove) {
        this.control.setInput(moveValue);
      }
      
      this.body.applyForce(f.Vector3.SCALE(f.Vector3.X(), this.speed * this.control.getOutput()));
      this.body.setRotation(new f.Vector3(0, -this.body.getVelocity().x,0));
      if(this.zPosition) {
        this.body.setPosition(new f.Vector3(this.node.mtxWorld.translation.x,this.node.mtxWorld.translation.y, this.zPosition));
      }
    }

    public destroy = () => {
      // TODO: add destroy logic here
    }

    public handleCollisionEnter(): void {
      this.collisions.forEach((element: f.ComponentRigidbody) => {
          if( element.node.name === "Obstacle" ){
              const gameOverEvent = new Event("GameOverEvent", {"bubbles":true, "cancelable":false});
              graph.dispatchEvent(gameOverEvent);
          }
      });
  }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event) => {
      switch (_event.type) {
        case f.EVENT.COMPONENT_ADD:
          this.create();
          break;
        case f.EVENT.COMPONENT_REMOVE:
          this.destroy();
          this.removeEventListener(f.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(f.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
      }
    }
  }
}