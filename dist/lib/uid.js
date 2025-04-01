class Snowflake {
    offset;
    mid;
    seq;
    lastTime;
    constructor(options) {
        const { offset, mid } = options ?? {};
        this.offset = offset ?? 0;
        this.mid = (mid ?? 0) % 1023;
        this.seq = 0;
        this.lastTime = 0;
    }
    generate() {
        let time = Date.now();
        if (time < this.lastTime || time < this.offset) {
            throw Error('Abnormal');
        }
        if (time === this.lastTime) {
            this.seq++;
            if (this.seq > 4095) {
                this.seq = 0;
                while (time <= this.lastTime) {
                    time = Date.now();
                }
            }
        }
        else {
            this.seq = 0;
        }
        this.lastTime = time;
        const bTime = (time - this.offset).toString(2).padStart(42, '0');
        const bMid = this.mid.toString(2).padStart(10, '0');
        const bSeq = this.seq.toString(2).padStart(12, '0');
        let result = String(BigInt('0b' + bTime + bMid + bSeq)).padStart(19, '0');
        return result;
    }
}
const snowflake = new Snowflake({ offset: new Date('2025').valueOf() });
export function uid() {
    return snowflake.generate();
}
