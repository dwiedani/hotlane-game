namespace Script {
    import f = FudgeCore;
  
    export class Obstacle extends f.Node {

        private body: f.ComponentRigidbody;

        constructor(name: string, position: number, width: number) {
            super(name);
            
            let obstacleTexture: f.TextureImage = new f.TextureImage();
            obstacleTexture.load("./assets/obstacleTexture.png");
            let coat: f.CoatTextured = new f.CoatTextured(new f.Color(255,255,255,255), obstacleTexture);

            const cmpTransform = new f.ComponentTransform;
            this.addComponent(cmpTransform);
            const cmpMesh = new f.ComponentMesh(new f.MeshCube("ObstacleMesh"));
            cmpMesh.mtxPivot.mutate({
                translation: new f.Vector3(width/2,0,0),
            });
            
            cmpMesh.mtxPivot.mutate({
                scaling: new f.Vector3(width,1,0.25),
            });

            this.addComponent(cmpMesh);
            this.addComponent(new f.ComponentMaterial(new f.Material("mtrObstacle", f.ShaderTextureFlat, coat)));
            
            this.body = new f.ComponentRigidbody(100,f.BODY_TYPE.KINEMATIC, f.COLLIDER_TYPE.CUBE, f.COLLISION_GROUP.DEFAULT, cmpTransform.mtxLocal);
            this.body.initialization = f.BODY_INIT.TO_MESH;
        
            this.addComponent(this.body);

            cmpTransform.mtxLocal.mutate({
                translation: new f.Vector3(position, cmpMesh.mtxPivot.scaling.y/2, 0),
            });            
        }
    }
}