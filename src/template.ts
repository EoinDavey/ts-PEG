import { Block } from "./util";

export interface TemplateOpts {
    inputStr: string,
    header: Block,
    memos: Block,
    memoClearFn: Block,
    kinds: Block,
    regexFlags: string,
    ruleClasses: Block,
    ruleParseFns: Block,
    parseResult: Block,
    usesEOF?: boolean,
}

export function expandTemplate(opts: TemplateOpts): Block {
        return [
    "/* AutoGenerated Code, changes may be overwritten",
    "* INPUT GRAMMAR:",
    ...opts.inputStr.split(/\r?\n/).filter((x) => x !== "").map((x) => "* " + x),
    "*/",
    ...opts.header,
    "type Nullable<T> = T | null;",
    "type $$RuleType<T> = () => Nullable<T>;",
    "interface ASTNodeIntf {",
    [
        "kind: ASTKinds;",
    ],
    "}",
    ...opts.kinds,
    ...opts.ruleClasses,
    "export class Parser {",
    [
        "private readonly input: string;",
        "private pos: PosInfo;",
        "private negating: boolean = false;",
        "private memoSafe: boolean = true;",
        "constructor(input: string) {",
        [
            "this.pos = {overallPos: 0, line: 1, offset: 0};",
            "this.input = input;",
        ],
        "}",
        "public reset(pos: PosInfo) {",
        [
            "this.pos = pos;",
        ],
        "}",
        "public finished(): boolean {",
        [
            "return this.pos.overallPos === this.input.length;",
        ],
        "}",
        ...opts.memoClearFn,
        ...opts.memos,
        ...opts.ruleParseFns,
        "public mark(): PosInfo {",
        [
            "return this.pos;",
        ],
        "}",
        "private loop<T>(func: $$RuleType<T>, star: boolean = false): Nullable<T[]> {",
        [
            "const mrk = this.mark();",
            "const res: T[] = [];",
            "for (;;) {",
            [
                "const t = func();",
                "if (t === null) {",
                [
                    "break;",
                ],
                "}",
                "res.push(t);",
            ],
            "}",
            "if (star || res.length > 0) {",
            [
                "return res;",
            ],
            "}",
            "this.reset(mrk);",
            "return null;",
        ],
        "}",
        "private run<T>($$dpth: number, fn: $$RuleType<T>): Nullable<T> {",
        [
            "const mrk = this.mark();",
            "const res = fn()",
            "if (res !== null)",
            [
                "return res;",
            ],
            "this.reset(mrk);",
            "return null;",
        ],
        "}",

        "private choice<T>(fns: Array<$$RuleType<T>>): Nullable<T> {",
        [
            "for (const f of fns) {",
            [
                "const res = f();",
                "if (res !== null) {",
                [
                    "return res;",
                ],
                "}",
            ],
            "}",
            "return null;",
        ],
        "}",
        "private regexAccept(match: string, dpth: number, cr?: ErrorTracker): Nullable<string> {",
        [
            "return this.run<string>(dpth,",
            [
                "() => {",
                [
                    `const reg = new RegExp(match, "y${opts.regexFlags}");`,
                    "const mrk = this.mark();",
                    "reg.lastIndex = mrk.overallPos;",
                    "const res = this.tryConsume(reg);",
                    "if(cr) {",
                    [
                        "cr.record(mrk, res, {",
                        [
                            "kind: \"RegexMatch\",",
                            "// We substring from 3 to len - 1 to strip off the",
                            "// non-capture group syntax added as a WebKit workaround",
                            "literal: match.substring(3, match.length - 1),",
                            "negated: this.negating,",
                        ],
                        "});",
                    ],
                    "}",
                    "return res;",
                ],
                "});",
            ],
        ],
        "}",
        "private tryConsume(reg: RegExp): Nullable<string> {",
        [
            "const res = reg.exec(this.input);",
            "if (res) {",
            [
                "let lineJmp = 0;",
                "let lind = -1;",
                "for (let i = 0; i < res[0].length; ++i) {",
                [
                    "if (res[0][i] === \"\\n\") {",
                    [
                        "++lineJmp;",
                        "lind = i;",
                    ],
                    "}",
                ],
                "}",
                "this.pos = {",
                [
                    "overallPos: reg.lastIndex,",
                    "line: this.pos.line + lineJmp,",
                    "offset: lind === -1 ? this.pos.offset + res[0].length : (res[0].length - lind - 1)",
                ],
                "};",
                "return res[0];",
            ],
            "}",
            "return null;",
        ],
        "}",
        "private noConsume<T>(fn: $$RuleType<T>): Nullable<T> {",
        [
            "const mrk = this.mark();",
            "const res = fn();",
            "this.reset(mrk);",
            "return res;",
        ],
        "}",
        "private negate<T>(fn: $$RuleType<T>): Nullable<boolean> {",
        [
            "const mrk = this.mark();",
            "const oneg = this.negating;",
            "this.negating = !oneg;",
            "const res = fn();",
            "this.negating = oneg;",
            "this.reset(mrk);",
            "return res === null ? true : null;",
        ],
        "}",
        "private memoise<K>(rule: $$RuleType<K>, memo: Map<number, [Nullable<K>, PosInfo]>): Nullable<K> {",
        [
            "const $scope$pos = this.mark();",
            "const $scope$memoRes = memo.get($scope$pos.overallPos);",
            "if(this.memoSafe && $scope$memoRes !== undefined) {",
                "this.reset($scope$memoRes[1]);",
                "return $scope$memoRes[0];",
            "}",
            "const $scope$result = rule();",
            "if(this.memoSafe)",
                "memo.set($scope$pos.overallPos, [$scope$result, this.mark()]);",
            "return $scope$result;",
        ],
        "}",
        ...(opts.usesEOF
            ? ["private match$EOF(et?: ErrorTracker): Nullable<{kind: ASTKinds.$EOF}> {",
            [
                "const res: {kind: ASTKinds.$EOF} | null = this.finished() ? { kind: ASTKinds.$EOF } : null;",
                "if(et)",
                [
                    "et.record(this.mark(), res, { kind: \"EOF\", negated: this.negating });",
                ],
                "return res;",
            ],
            "}",
            ]
            : []),
    ],
    "}",

    "export function parse(s: string): ParseResult {",
    [
        "const p = new Parser(s);",
        "return p.parse();",
    ],
    "}",

    ...opts.parseResult,

    "export interface PosInfo {",
    [
        "readonly overallPos: number;",
        "readonly line: number;",
        "readonly offset: number;",
    ],
    "}",
    "export interface RegexMatch {",
    [
        "readonly kind: \"RegexMatch\";",
        "readonly negated: boolean;",
        "readonly literal: string;",
    ],
    "}",
    "export type EOFMatch = { kind: \"EOF\"; negated: boolean };",
    "export type MatchAttempt = RegexMatch | EOFMatch;",
    "export class SyntaxErr {",
    [
        "public pos: PosInfo;",
        "public expmatches: MatchAttempt[];",
        "constructor(pos: PosInfo, expmatches: MatchAttempt[]) {",
        [
            "this.pos = pos;",
            "this.expmatches = [...expmatches];",
        ],
        "}",
        "public toString(): string {",
        [
            // eslint-disable-next-line no-template-curly-in-string
            "return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Expected one of ${this.expmatches.map(x => x.kind === \"EOF\" ? \" EOF\" : ` ${x.negated ? 'not ': ''}'${x.literal}'`)}`;",
        ],
        "}",
    ],
    "}",
    "class ErrorTracker {",
    [
        "private mxpos: PosInfo = {overallPos: -1, line: -1, offset: -1};",
        "private regexset: Set<string> = new Set();",
        "private pmatches: MatchAttempt[] = [];",
        "public record(pos: PosInfo, result: any, att: MatchAttempt) {",
        [
            "if ((result === null) === att.negated)",
            [
                "return;",
            ],
            "if (pos.overallPos > this.mxpos.overallPos) {",
            [
                "this.mxpos = pos;",
                "this.pmatches = [];",
                "this.regexset.clear()",
            ],
            "}",
            "if (this.mxpos.overallPos === pos.overallPos) {",
            [
                "if(att.kind === \"RegexMatch\") {",
                [
                    "if(!this.regexset.has(att.literal))",
                    [
                        "this.pmatches.push(att);",
                    ],
                    "this.regexset.add(att.literal);",
                ],
                "} else {",
                [
                    "this.pmatches.push(att);",
                ],
                "}",
            ],
            "}",
        ],
        "}",
        "public getErr(): SyntaxErr | null {",
        [
            "if (this.mxpos.overallPos !== -1)",
            [
                "return new SyntaxErr(this.mxpos, this.pmatches);",
            ],
            "return null;",
        ],
        "}",
    ],
    "}",
];
}
