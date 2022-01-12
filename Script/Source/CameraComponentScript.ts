namespace Script {
  import f = FudgeCore;
  f.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class CameraComponentScript extends f.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = f.Component.registerSubclass(CameraComponentScript);
    public agent: f.Node;
    private transform: f.ComponentTransform;
    public offset: f.Vector3 = new f.Vector3(0,0,0);
    public rotation: f.Vector3 = new f.Vector3(0,0,0);

    constructor() {
      super();

      // Don't start when running in editor
      if (f.Project.mode == f.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(f.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(f.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(f.EVENT.NODE_DESERIALIZED, this.hndEvent);
      f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
    }

    public update = (_event: Event): void => {
      if(this.agent) {
        this.transform.mtxLocal.mutate({
          translation: new f.Vector3(this.agent.mtxWorld.translation.x + this.offset.x, this.agent.mtxWorld.translation.y + this.offset.y, this.agent.mtxWorld.translation.z + this.offset.z)
        });
      }
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case f.EVENT.COMPONENT_ADD:
          this.transform = this.node.getComponent(f.ComponentTransform);
          this.transform.mtxLocal.mutate({
            rotation: this.rotation
          });
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