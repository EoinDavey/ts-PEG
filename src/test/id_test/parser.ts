/* AutoGenerated Code, changes may be overwritten
* INPUT GRAMMAR:
* // Test for allowable id names
* lowercase := 'a'
* UPPERCASE := 'b'
* _start_hypen_ := 'c'
* numbers1ab234 := 'd'
* // Check for namespace collision
* rule := rule=rule .a = number { return 0; }
* rule2 := res='a'
* rule3 := cr='b'
*/
type Nullable<T> = T | null;
type $$RuleType<T> = (log?: (msg: string) => void) => Nullable<T>;
export interface ContextRecorder {
    record(pos: PosInfo, depth: number, result: any, negating: boolean, extraInfo: string[]): void;
}
interface ASTNodeIntf {
    kind: ASTKinds;
}
export enum ASTKinds {
    lowercase = "lowercase",
    UPPERCASE = "UPPERCASE",
    _start_hypen_ = "_start_hypen_",
    numbers1ab234 = "numbers1ab234",
    rule = "rule",
    rule2 = "rule2",
    rule3 = "rule3",
}
export type lowercase = string;
export type UPPERCASE = string;
export type _start_hypen_ = string;
export type numbers1ab234 = string;
export class rule {
    public kind: ASTKinds.rule = ASTKinds.rule;
    public rule: rule;
    public a: number;
    constructor(rule: rule){
        this.rule = rule;
        this.a = (() => {
        return 0;
        })();
    }
}
export interface rule2 {
    kind: ASTKinds.rule2;
    res: string;
}
export interface rule3 {
    kind: ASTKinds.rule3;
    cr: string;
}
export class Parser {
    private readonly input: string;
    private pos: PosInfo;
    private negating: boolean = false;
    constructor(input: string) {
        this.pos = {overallPos: 0, line: 1, offset: 0};
        this.input = input;
    }
    public reset(pos: PosInfo) {
        this.pos = pos;
    }
    public finished(): boolean {
        return this.pos.overallPos === this.input.length;
    }
    public matchlowercase($$dpth: number, $$cr?: ContextRecorder): Nullable<lowercase> {
        return this.regexAccept(String.raw`(?:a)`, $$dpth + 1, $$cr);
    }
    public matchUPPERCASE($$dpth: number, $$cr?: ContextRecorder): Nullable<UPPERCASE> {
        return this.regexAccept(String.raw`(?:b)`, $$dpth + 1, $$cr);
    }
    public match_start_hypen_($$dpth: number, $$cr?: ContextRecorder): Nullable<_start_hypen_> {
        return this.regexAccept(String.raw`(?:c)`, $$dpth + 1, $$cr);
    }
    public matchnumbers1ab234($$dpth: number, $$cr?: ContextRecorder): Nullable<numbers1ab234> {
        return this.regexAccept(String.raw`(?:d)`, $$dpth + 1, $$cr);
    }
    public matchrule($$dpth: number, $$cr?: ContextRecorder): Nullable<rule> {
        return this.runner<rule>($$dpth,
            (log) => {
                if (log) {
                    log("rule");
                }
                let $scope$rule: Nullable<rule>;
                let $$res: Nullable<rule> = null;
                if (true
                    && ($scope$rule = this.matchrule($$dpth + 1, $$cr)) !== null
                ) {
                    $$res = new rule($scope$rule);
                }
                return $$res;
            }, $$cr)();
    }
    public matchrule2($$dpth: number, $$cr?: ContextRecorder): Nullable<rule2> {
        return this.runner<rule2>($$dpth,
            (log) => {
                if (log) {
                    log("rule2");
                }
                let $scope$res: Nullable<string>;
                let $$res: Nullable<rule2> = null;
                if (true
                    && ($scope$res = this.regexAccept(String.raw`(?:a)`, $$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.rule2, res: $scope$res};
                }
                return $$res;
            }, $$cr)();
    }
    public matchrule3($$dpth: number, $$cr?: ContextRecorder): Nullable<rule3> {
        return this.runner<rule3>($$dpth,
            (log) => {
                if (log) {
                    log("rule3");
                }
                let $scope$cr: Nullable<string>;
                let $$res: Nullable<rule3> = null;
                if (true
                    && ($scope$cr = this.regexAccept(String.raw`(?:b)`, $$dpth + 1, $$cr)) !== null
                ) {
                    $$res = {kind: ASTKinds.rule3, cr: $scope$cr};
                }
                return $$res;
            }, $$cr)();
    }
    public test(): boolean {
        const mrk = this.mark();
        const res = this.matchlowercase(0);
        const ans = res !== null && this.finished();
        this.reset(mrk);
        return ans;
    }
    public parse(): ParseResult {
        const mrk = this.mark();
        const res = this.matchlowercase(0);
        if (res && this.finished()) {
            return new ParseResult(res, null);
        }
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.matchlowercase(0, rec);
        return new ParseResult(res,
            rec.getErr() ?? new SyntaxErr(this.mark(), new Set(["$EOF"]), new Set([])));
    }
    public mark(): PosInfo {
        return this.pos;
    }
    private loop<T>(func: $$RuleType<T>, star: boolean = false): Nullable<T[]> {
        const mrk = this.mark();
        const res: T[] = [];
        for (;;) {
            const t = func();
            if (t === null) {
                break;
            }
            res.push(t);
        }
        if (star || res.length > 0) {
            return res;
        }
        this.reset(mrk);
        return null;
    }
    private runner<T>($$dpth: number, fn: $$RuleType<T>, cr?: ContextRecorder): $$RuleType<T> {
        return () => {
            const mrk = this.mark();
            const res = cr ? (() => {
                const extraInfo: string[] = [];
                const result = fn((msg: string) => extraInfo.push(msg));
                cr.record(mrk, $$dpth, result, this.negating, extraInfo);
                return result;
            })() : fn();
            if (res !== null) {
                return res;
            }
            this.reset(mrk);
            return null;
        };
    }
    private choice<T>(fns: Array<$$RuleType<T>>): Nullable<T> {
        for (const f of fns) {
            const res = f();
            if (res !== null) {
                return res;
            }
        }
        return null;
    }
    private regexAccept(match: string, dpth: number, cr?: ContextRecorder): Nullable<string> {
        return this.runner<string>(dpth,
            (log) => {
                if (log) {
                    if (this.negating) {
                        log("$$!StrMatch");
                    } else {
                        log("$$StrMatch");
                    }
                    // We substring from 3 to len - 1 to strip off the
                    // non-capture group syntax added as a WebKit workaround
                    log(match.substring(3, match.length - 1));
                }
                const reg = new RegExp(match, "y");
                reg.lastIndex = this.mark().overallPos;
                const res = reg.exec(this.input);
                if (res) {
                    let lineJmp = 0;
                    let lind = -1;
                    for (let i = 0; i < res[0].length; ++i) {
                        if (res[0][i] === "\n") {
                            ++lineJmp;
                            lind = i;
                        }
                    }
                    this.pos = {
                        overallPos: reg.lastIndex,
                        line: this.pos.line + lineJmp,
                        offset: lind === -1 ? this.pos.offset + res[0].length : (res[0].length - lind - 1)
                    };
                    return res[0];
                }
                return null;
            }, cr)();
    }
    private noConsume<T>(fn: $$RuleType<T>): Nullable<T> {
        const mrk = this.mark();
        const res = fn();
        this.reset(mrk);
        return res;
    }
    private negate<T>(fn: $$RuleType<T>): Nullable<boolean> {
        const mrk = this.mark();
        const oneg = this.negating;
        this.negating = !oneg;
        const res = fn();
        this.negating = oneg;
        this.reset(mrk);
        return res === null ? true : null;
    }
}
export function parse(s: string): ParseResult {
    const p = new Parser(s);
    return p.parse();
}
export class ParseResult {
    public ast: Nullable<lowercase>;
    public err: Nullable<SyntaxErr>;
    constructor(ast: Nullable<lowercase>, err: Nullable<SyntaxErr>) {
        this.ast = ast;
        this.err = err;
    }
}
export interface PosInfo {
    readonly overallPos: number;
    readonly line: number;
    readonly offset: number;
}
export class SyntaxErr {
    public pos: PosInfo;
    public exprules: string[];
    public expmatches: string[];
    constructor(pos: PosInfo, exprules: Set<string>, expmatches: Set<string>) {
        this.pos = pos;
        this.exprules = [...exprules];
        this.expmatches = [...expmatches];
    }
    public toString(): string {
        return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Tried to match rules ${this.exprules.join(", ")}. Expected one of ${this.expmatches.map((x) => ` '${x}'`)}`;
    }
}
class ErrorTracker implements ContextRecorder {
    private mxpos: PosInfo = {overallPos: -1, line: -1, offset: -1};
    private mnd: number = -1;
    private prules: Set<string> = new Set();
    private pmatches: Set<string> = new Set();
    public record(pos: PosInfo, depth: number, result: any, negating: boolean, extraInfo: string[]) {
        if ((result === null) === negating) {
            return;
        }
        if (pos.overallPos > this.mxpos.overallPos) {
            this.mxpos = pos;
            this.mnd = depth;
            this.pmatches.clear();
            this.prules.clear();
        } else if (pos.overallPos === this.mxpos.overallPos && depth < this.mnd) {
            this.mnd = depth;
            this.prules.clear();
        }
        if (this.mxpos.overallPos === pos.overallPos && extraInfo.length >= 2) {
            if (extraInfo[0] === "$$StrMatch") {
                this.pmatches.add(extraInfo[1]);
            }
            if (extraInfo[0] === "$$!StrMatch") {
                this.pmatches.add(`not ${extraInfo[1]}`);
            }
        }
        if (this.mxpos.overallPos === pos.overallPos && this.mnd === depth) {
            extraInfo.forEach((x) => { if (x !== "$$StrMatch" && x !== "$$!StrMatch") { this.prules.add(x); } });
        }
    }
    public getErr(): SyntaxErr | null {
        if (this.mxpos.overallPos !== -1) {
            return new SyntaxErr(this.mxpos, this.prules, this.pmatches);
        }
        return null;
    }
}