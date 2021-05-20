interface Position {
    x: number;
    y: number;
}
interface Direction {
    value: "N" | "E" | "S" | "W"
    turnRight(): Direction
    getDelta(): Position
}
class North implements Direction {
    constructor(){}
    turnRight(): Direction {
        return new East()
    }

    readonly value = "N"

    getDelta(): Position {
        return {x:0, y:1};
    }
}

class East implements Direction {
    constructor(){}
    turnRight(): Direction {
        return new South()
    }
    readonly value = "E"

    getDelta(): Position {
        return {x:1, y:0};
    }

}

class South implements Direction {
    constructor(){}
    turnRight(): Direction {
        return new West()
    }
    readonly value = "S"

    getDelta(): Position {
        return {x:0, y:-1};
    }
}

class West implements Direction {
    constructor(){}
    turnRight(): Direction {
        return new North()
    }
    readonly value = "W"

    getDelta(): Position {
        return {x:-1, y:0};
    }
}


const addDelta = (currentPos: number, delta: number) => {
    const next = currentPos + delta;
    if (next === -1) {
        return 9;
    }
    if (next === 10) {
        return 0;
    }

    return next;
}

export class Rover {
    private direction: Direction = new North();
    private position: Position = {x:0, y:0}

    moveRight(): void {
        this.direction = this.direction.turnRight();
    }

    moveForward(): void {
        const {x,y} = this.direction.getDelta()
        const newPosition = addDelta(this.position.x, x);
        this.position.x = newPosition;

        const newYPosition = addDelta(this.position.y, y);
        this.position.y = newYPosition;

    }

    execute(command: string) {
        execute(parseCommands(this, command))
        return this.getCurrentPosition()
    }

    getCurrentPosition = () => `${this.position.x}:${this.position.y}:${this.direction.value}`

}

const parseCommands = (rover:Rover, commands:string): Command[] => {
    const commandz: Command[] = [];
    for(const c of commands) {
        if (c === "R") {
            commandz.push(new RightCommand(rover))
        }
        if (c === "M") {
            commandz.push(new ForwardCommand(rover))
        }
    }
    return commandz; // TODO Rename
}

const execute = (commands: Command[]): void => {
    for(const c of commands) {
        c.execute();
    }
}

interface Command {
    execute(): void
}

class RightCommand implements Command {
    constructor(private readonly rover: Rover){}
    execute(): void {
        this.rover.moveRight();
    }
}

class ForwardCommand implements Command {
    constructor(private readonly rover: Rover){}
    execute(): void {
        this.rover.moveForward();
    }
}