/* AutoGenerated Code, changes may be overwritten
* INPUT GRAMMAR:
* SUM  := head=FAC tail={ op='\+|-' sm=FAC }*;
* FAC  := head=ATOM tail={ op='\*|/' sm=ATOM }*;
* ATOM := _ val=INT _ | _ '\(' val=SUM '\)' _;
* INT  := val='[0-9]+';
* _    := '\s*';
*/
type Nullable<T> = T | null;
type $$RuleType<T> = (log? : (msg : string) => void) => Nullable<T>;
export interface ContextRecorder {
    record(pos: number, depth : number, result: any, extraInfo : string[]) : void;
}
interface ASTNodeIntf {
    kind: ASTKinds;
}
export class $$StrMatch implements ASTNodeIntf {
    kind: ASTKinds.$$StrMatch = ASTKinds.$$StrMatch;
    match : string;
    constructor(val : string){
        this.match = val;
    }
}
export enum ASTKinds {
    $$StrMatch,
    SUM,
    SUM_$0,
    FAC,
    FAC_$0,
    ATOM_1,
    ATOM_2,
    INT,
    _,
}
export class SUM implements ASTNodeIntf {
    kind : ASTKinds.SUM = ASTKinds.SUM;
    head : FAC;
    tail : SUM_$0[];
    constructor(head : FAC,tail : SUM_$0[]){
        this.head = head;
        this.tail = tail;
    }
}
export class SUM_$0 implements ASTNodeIntf {
    kind : ASTKinds.SUM_$0 = ASTKinds.SUM_$0;
    op : $$StrMatch;
    sm : FAC;
    constructor(op : $$StrMatch,sm : FAC){
        this.op = op;
        this.sm = sm;
    }
}
export class FAC implements ASTNodeIntf {
    kind : ASTKinds.FAC = ASTKinds.FAC;
    head : ATOM;
    tail : FAC_$0[];
    constructor(head : ATOM,tail : FAC_$0[]){
        this.head = head;
        this.tail = tail;
    }
}
export class FAC_$0 implements ASTNodeIntf {
    kind : ASTKinds.FAC_$0 = ASTKinds.FAC_$0;
    op : $$StrMatch;
    sm : ATOM;
    constructor(op : $$StrMatch,sm : ATOM){
        this.op = op;
        this.sm = sm;
    }
}
export type ATOM = ATOM_1 | ATOM_2;
export class ATOM_1 implements ASTNodeIntf {
    kind : ASTKinds.ATOM_1 = ASTKinds.ATOM_1;
    val : INT;
    constructor(val : INT){
        this.val = val;
    }
}
export class ATOM_2 implements ASTNodeIntf {
    kind : ASTKinds.ATOM_2 = ASTKinds.ATOM_2;
    val : SUM;
    constructor(val : SUM){
        this.val = val;
    }
}
export class INT implements ASTNodeIntf {
    kind : ASTKinds.INT = ASTKinds.INT;
    val : $$StrMatch;
    constructor(val : $$StrMatch){
        this.val = val;
    }
}
export type _ = $$StrMatch;
export class Parser {
    private pos : number = 0;
    readonly input : string;
    constructor(input : string) {
        this.input = input;
    }
    private mark() : number {
        return this.pos;
    }
    reset(pos : number) {
        this.pos = pos;
    }
    finished() : boolean {
        return this.pos == this.input.length;
    }
    private loop<T>(func : $$RuleType<T>, star : boolean = false) : Nullable<T[]> {
        const mrk = this.mark();
        let res : T[] = [];
        for(;;) {
            const t = func();
            if(!t)
                break;
            res.push(t);
        }
        if(star || res.length > 0)
            return res;
        this.reset(mrk);
        return null;
    }
    private runner<T>($$dpth : number, fn : $$RuleType<T>,
        cr? : ContextRecorder) : $$RuleType<T> {
        return () => {
            const mrk = this.mark();
            const res = cr ? (()=>{
                let extraInfo : string[] = [];
                const res = fn((msg : string) => extraInfo.push(msg));
                cr.record(mrk, $$dpth, res, extraInfo);
                return res;
            })() : fn();
            if(res)
                return res;
            this.reset(mrk);
            return null
        }
    }
    private choice<T>(fns : $$RuleType<T>[]) : Nullable<T> {
        for(let f of fns){
            const res = f();
            if(res)
                return res;
        }
        return null;
    }
    private regexAccept(match : string, dpth : number, cr? : ContextRecorder) : Nullable<$$StrMatch> {
        return this.runner<$$StrMatch>(dpth,
            (log) => {
                if(log){
                    log('$$StrMatch');
                    log(match);
                }
                var reg = new RegExp(match, 'y');
                reg.lastIndex = this.mark();
                const res = reg.exec(this.input);
                if(res){
                    this.pos = reg.lastIndex;
                    return new $$StrMatch(res[0]);
                }
                return null;
            }, cr)();
    }
    matchSUM($$dpth : number, cr? : ContextRecorder) : Nullable<SUM> {
        return this.runner<SUM>($$dpth,
            (log) => {
                if(log)
                    log('SUM');
                let head : Nullable<FAC>;
                let tail : Nullable<SUM_$0[]>;
                let res : Nullable<SUM> = null;
                if(true
                    && (head = this.matchFAC($$dpth + 1, cr))
                    && (tail = this.loop<SUM_$0>(()=> this.matchSUM_$0($$dpth + 1, cr), true))
                )
                    res = new SUM(head, tail);
                return res;
            }, cr)();
    }
    matchSUM_$0($$dpth : number, cr? : ContextRecorder) : Nullable<SUM_$0> {
        return this.runner<SUM_$0>($$dpth,
            (log) => {
                if(log)
                    log('SUM_$0');
                let op : Nullable<$$StrMatch>;
                let sm : Nullable<FAC>;
                let res : Nullable<SUM_$0> = null;
                if(true
                    && (op = this.regexAccept(String.raw`\+|-`, $$dpth+1, cr))
                    && (sm = this.matchFAC($$dpth + 1, cr))
                )
                    res = new SUM_$0(op, sm);
                return res;
            }, cr)();
    }
    matchFAC($$dpth : number, cr? : ContextRecorder) : Nullable<FAC> {
        return this.runner<FAC>($$dpth,
            (log) => {
                if(log)
                    log('FAC');
                let head : Nullable<ATOM>;
                let tail : Nullable<FAC_$0[]>;
                let res : Nullable<FAC> = null;
                if(true
                    && (head = this.matchATOM($$dpth + 1, cr))
                    && (tail = this.loop<FAC_$0>(()=> this.matchFAC_$0($$dpth + 1, cr), true))
                )
                    res = new FAC(head, tail);
                return res;
            }, cr)();
    }
    matchFAC_$0($$dpth : number, cr? : ContextRecorder) : Nullable<FAC_$0> {
        return this.runner<FAC_$0>($$dpth,
            (log) => {
                if(log)
                    log('FAC_$0');
                let op : Nullable<$$StrMatch>;
                let sm : Nullable<ATOM>;
                let res : Nullable<FAC_$0> = null;
                if(true
                    && (op = this.regexAccept(String.raw`\*|/`, $$dpth+1, cr))
                    && (sm = this.matchATOM($$dpth + 1, cr))
                )
                    res = new FAC_$0(op, sm);
                return res;
            }, cr)();
    }
    matchATOM($$dpth : number, cr? : ContextRecorder) : Nullable<ATOM> {
        return this.choice<ATOM>([
            () => { return this.matchATOM_1($$dpth + 1, cr) },
            () => { return this.matchATOM_2($$dpth + 1, cr) },
        ]);
    }
    matchATOM_1($$dpth : number, cr? : ContextRecorder) : Nullable<ATOM_1> {
        return this.runner<ATOM_1>($$dpth,
            (log) => {
                if(log)
                    log('ATOM_1');
                let val : Nullable<INT>;
                let res : Nullable<ATOM_1> = null;
                if(true
                    && this.match_($$dpth + 1, cr)
                    && (val = this.matchINT($$dpth + 1, cr))
                    && this.match_($$dpth + 1, cr)
                )
                    res = new ATOM_1(val);
                return res;
            }, cr)();
    }
    matchATOM_2($$dpth : number, cr? : ContextRecorder) : Nullable<ATOM_2> {
        return this.runner<ATOM_2>($$dpth,
            (log) => {
                if(log)
                    log('ATOM_2');
                let val : Nullable<SUM>;
                let res : Nullable<ATOM_2> = null;
                if(true
                    && this.match_($$dpth + 1, cr)
                    && this.regexAccept(String.raw`\(`, $$dpth+1, cr)
                    && (val = this.matchSUM($$dpth + 1, cr))
                    && this.regexAccept(String.raw`\)`, $$dpth+1, cr)
                    && this.match_($$dpth + 1, cr)
                )
                    res = new ATOM_2(val);
                return res;
            }, cr)();
    }
    matchINT($$dpth : number, cr? : ContextRecorder) : Nullable<INT> {
        return this.runner<INT>($$dpth,
            (log) => {
                if(log)
                    log('INT');
                let val : Nullable<$$StrMatch>;
                let res : Nullable<INT> = null;
                if(true
                    && (val = this.regexAccept(String.raw`[0-9]+`, $$dpth+1, cr))
                )
                    res = new INT(val);
                return res;
            }, cr)();
    }
    match_($$dpth : number, cr? : ContextRecorder) : Nullable<_> {
        return this.regexAccept(String.raw`\s*`, $$dpth+1, cr);
    }
    parse() : ParseResult {
        const mrk = this.mark();
        const res = this.matchSUM(0);
        if(res && this.finished())
            return new ParseResult(res, null);
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.matchSUM(0, rec);
        return new ParseResult(res, rec.getErr());
    }
}
export class ParseResult {
    ast : Nullable<SUM>;
    err : Nullable<SyntaxErr>;
    constructor(ast : Nullable<SUM>, err : Nullable<SyntaxErr>){
        this.ast = ast;
        this.err = err;
    }
}
export class SyntaxErr {
    pos : number;
    exprules : string[];
    expmatches : string[]
    constructor(pos : number, exprules : Set<string>, expmatches : Set<string>){
        this.pos = pos;
        this.exprules = [...exprules];
        this.expmatches = [...expmatches];
    }
    toString() : string {
        return `Syntax Error at position ${this.pos}. Tried to match rules ${this.exprules.join(', ')}. Expected one of ${this.expmatches.map(x => ` '${x}'`)}`;
    }
}
class ErrorTracker implements ContextRecorder {
    mxpos : number = -1;
    mnd : number = -1;
    prules : Set<string> = new Set();
    pmatches: Set<string> = new Set();
    record(pos : number, depth : number, result : any, extraInfo : string[]){
        if(result !== null)
            return;
        if(pos > this.mxpos){
            this.mxpos = pos;
            this.mnd = depth;
            this.pmatches.clear();
            this.prules.clear();
        } else if(pos === this.mxpos && depth < this.mnd){
            this.mnd = depth;
            this.prules.clear();
        }
        if(this.mxpos === pos && extraInfo.length >= 2 && extraInfo[0] === '$$StrMatch')
            this.pmatches.add(extraInfo[1]);
        if(this.mxpos === pos && this.mnd === depth)
            extraInfo.forEach(x => { if(x !== '$$StrMatch') this.prules.add(x)});
    }
    getErr() : SyntaxErr | null {
        if(this.mxpos !== -1)
            return new SyntaxErr(this.mxpos, this.prules, this.pmatches);
        return null;
    }
}