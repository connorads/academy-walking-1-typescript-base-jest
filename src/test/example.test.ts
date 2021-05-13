import {Example} from "../main/example";

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

type Direction = "N" | "E" | "S" | "W"

class Rover {
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

describe('Rover', () => {
    [{command: "M", expectedOutput: "0:1:N"},
    {command: "MRMRMRM", expectedOutput:"0:0:W"},
    {command: "MRRRMRMM", expectedOutput:"9:3:N"},
    {command: "MRRRMRMMRRRM", expectedOutput:"8:3:W"},
    {command: "MRRRMRMMRM", expectedOutput:"0:3:E"},
    {command: "RRM", expectedOutput: "0:9:S"},
    {command: "RRMRRM", expectedOutput: "0:0:N"},
    ].forEach(({command, expectedOutput}) => {
       it(`${command} returns ${expectedOutput}`, ()=>{
            const rover = new Rover();
            const pos = rover.execute(command);
            expect(pos).toBe(expectedOutput);
       }) 
    })
    it("can move forward", () => {
        const rover = new Rover();
        const pos = rover.execute("M");
        expect(pos).toBe("0:1:N");
    })
    it("can move forward twice", () => {
        const rover = new Rover();
        const pos = rover.execute("MM");
        expect(pos).toBe("0:2:N");
    })    
    it("can move forward thrice", () => {
        const rover = new Rover();
        const pos = rover.execute("MMM");
        expect(pos).toBe("0:3:N");
    })
    it("can turn right", () => {
        const rover = new Rover();
        const pos = rover.execute("R");
        expect(pos).toBe("0:0:E");
    })
    it("can turn right twice", () => {
        const rover = new Rover();
        const pos = rover.execute("RR");
        expect(pos).toBe("0:0:S");
    })
    it("can turn right thrice", () => {
        const rover = new Rover();
        const pos = rover.execute("RRR");
        expect(pos).toBe("0:0:W");
    })
    it("can turn right 4uice", () => {
        const rover = new Rover();
        const pos = rover.execute("RRRR");
        expect(pos).toBe("0:0:N");
    })
    it("can move and turn right", () => {
        const rover = new Rover();
        const pos = rover.execute("MR");
        expect(pos).toBe("0:1:E");
    })
    it("can move and turn right and move", () => {
        const rover = new Rover();
        const pos = rover.execute("MRM");
        expect(pos).toBe("1:1:E");
    })
    it("can move and turn right and move and right and move", () => {
        const rover = new Rover();
        const pos = rover.execute("MRMRM");
        expect(pos).toBe("1:0:S");
    })
    it("can move and turn right and move and right and move", () => {
        const rover = new Rover();
        const pos = rover.execute("MRMRMRM");
        expect(pos).toBe("0:0:W");
    })
})