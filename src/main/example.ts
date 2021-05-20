
type Direction = "N" | "E" | "S" | "W"

const getNextRight = (direction: Direction): Direction => {
    switch(direction) {
        case "N":
            return "E";
        case "E":
            return "S";
        case "S":
            return "W";
        case "W":
            return "N";
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

interface Position {
    x: number;
    y: number;
}

const getPositionDelta = (position: Position, direction: Direction): Position  => {
    switch(direction) {
        case "N":
            return {x:0, y:1};
        case "E":
            return {x:1, y:0};
        case "S":
            return {x:0, y:-1};
        case "W":
            return {x:-1, y:0};
        default: return {x:0, y:0}
    }
}



export class Rover {
    private direction: Direction = "N";
    private position: Position = {x:0, y:0}

    private moveRight(): void {
        this.direction = getNextRight(this.direction);
    }

    private moveForward(): void {
        const {x,y} = getPositionDelta(this.position, this.direction)
        const newPosition = addDelta(this.position.x, x);
        this.position.x = newPosition;

        const newYPosition = addDelta(this.position.y, y);
        this.position.y = newYPosition;

    }

    execute(command: string) {
        const commands = command.split("");
        for(const c of commands) {
            if (c === "R") {
                this.moveRight();
            }
            if (c === "M") {
                this.moveForward();
            }
        }
        return `${this.position.x}:${this.position.y}:${this.direction}`;
    }

}
