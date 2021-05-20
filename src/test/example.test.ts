import {Rover} from "../main/example";

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
