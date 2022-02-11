declare namespace Script {
    import f = FudgeCore;
    class Agent extends f.Node {
        constructor(name: string);
    }
}
declare namespace Script {
    import f = FudgeCore;
    class AgentComponentScript extends f.ComponentScript {
        static readonly iSubclass: number;
        private canMove;
        private speed;
        private control;
        private body;
        private zPosition;
        private initialPosition;
        constructor();
        create: () => void;
        update: (_event: Event) => void;
        destroy: () => void;
        handleCollisionEnter(): void;
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    import f = FudgeCore;
    class CameraComponentScript extends f.ComponentScript {
        static readonly iSubclass: number;
        agent: f.Node;
        private transform;
        offset: f.Vector3;
        rotation: f.Vector3;
        constructor();
        update: (_event: Event) => void;
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    import f = FudgeCore;
    class CustomComponentScript extends f.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    import f = FudgeCore;
    class GameState extends f.Mutable {
        private uiPanel;
        private static controller;
        private static instance;
        score: number;
        hundreds: number;
        startTime: number;
        isGameOver: boolean;
        private constructor();
        animateScore(): void;
        static get(): GameState;
        gameOver(): void;
        toggleLoop(): void;
        startLoop(): void;
        restart(): void;
        pauseLoop(): void;
        protected reduceMutator(_mutator: f.Mutator): void;
    }
}
declare namespace Script {
    import f = FudgeCore;
    let graph: f.Graph;
}
declare namespace Script {
    import f = FudgeCore;
    class Obstacle extends f.Node {
        private body;
        constructor(name: string, position: number, width: number);
    }
}
declare namespace Script {
    import f = FudgeCore;
    class RoadComponentScript extends f.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        private transform;
        private restartPosition;
        private startPosition;
        private roadWidth;
        private roadLength;
        private speedInc;
        private initialSpeedInc;
        private maxSpeed;
        private obstacleWidthMin;
        private spawnTrigger;
        constructor();
        create: (_event: Event) => void;
        update: (_event: Event) => void;
        spawnObstacle(): void;
        reset(): void;
        clean(): void;
        restart(): void;
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    import f = FudgeCore;
    class SFX extends f.Node {
        private audio;
        constructor(name: string, audioFileUri: string, eventTrigger: string);
        play(_event: Event): void;
    }
}
declare namespace Script {
    import f = FudgeCore;
    class Scoreboard extends f.Mutable {
        private static instance;
        private scoreboard;
        private domHud;
        private scoreboardHud;
        private constructor();
        static get(): Scoreboard;
        focusScoreboard(toggle: boolean): void;
        generateListItem(itemName: String, itemScore: number): HTMLElement;
        generateUi(): void;
        updateUi(): void;
        loadScoreboard(): Promise<any>;
        postScore(name: string, score: number): Promise<any>;
        protected reduceMutator(_mutator: f.Mutator): void;
    }
}
