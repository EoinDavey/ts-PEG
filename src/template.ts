import { Block } from './util';
export function expandTemplate(input: string, kinds : Block, ruleClasses : Block, ruleParseFns : Block,
    parseResult : Block) : Block{ 
        return [
    '/* AutoGenerated Code, changes may be overwritten',
    '* INPUT GRAMMAR:',
    ...input.split(/\r?\n/).filter(x => x!='').map(x => '* ' + x),
    '*/',
    'type Nullable<T> = T | null;',
    'type $$RuleType<T> = (log? : (msg : string) => void) => Nullable<T>;',
    'export interface ContextRecorder {',
    [
        'record(pos: number, depth : number, result: any, extraInfo : string[]) : void;'
    ],
    '}',
    'interface ASTNodeIntf {',
    [
        'kind: ASTKinds;',
    ],
    '}',
    'export class $$StrMatch implements ASTNodeIntf {',
    [
        'kind: ASTKinds.$$StrMatch = ASTKinds.$$StrMatch;',
        'match : string;',
        'constructor(val : string){',
        [
            'this.match = val;',
        ],
        '}',
    ],
    '}',
    ...kinds,
    ...ruleClasses,
    'export class Parser {',
    [
        'private pos : number = 0;',
        'readonly input : string;',
        'constructor(input : string) {',
        [
            'this.input = input;'
        ],
        '}',
        'private mark() : number {',
        [
            'return this.pos;'
        ],
        '}',
        'reset(pos : number) {',
        [
            'this.pos = pos;',
        ],
        '}',
        'finished() : boolean {',
        [
            'return this.pos == this.input.length;'
        ],
        '}',
        'private loop<T>(func : $$RuleType<T>, star : boolean = false) : Nullable<T[]> {',
        [
            'const mrk = this.mark();',
            'let res : T[] = [];',
            'for(;;) {',
            [
                'const t = func();',
                'if(!t)',
                [
                    'break;'
                ],
                'res.push(t);',
            ],
            '}',
            'if(star || res.length > 0)',
            [
                'return res;'
            ],
            'this.reset(mrk);',
            'return null;'
        ],
        '}',
        'private runner<T>($$dpth : number, fn : $$RuleType<T>,',
        [
            'cr? : ContextRecorder) : $$RuleType<T> {',
            'return () => {',
            [
                'const mrk = this.mark();',
                'const res = cr ? (()=>{',
                [
                    'let extraInfo : string[] = [];',
                    'const res = fn((msg : string) => extraInfo.push(msg));',
                    'cr.record(mrk, $$dpth, res, extraInfo);',
                    'return res;'
                ],
                '})() : fn();',
                'if(res)',
                [
                    'return res;'
                ],
                'this.reset(mrk);',
                'return null',
            ],
            '}'
        ],
        '}',

        'private choice<T>(fns : $$RuleType<T>[]) : Nullable<T> {',
        [
            'for(let f of fns){',
            [
                'const res = f();',
                'if(res)',
                [
                    'return res;'
                ],
            ],
            '}',
            'return null;'
        ],
        '}',
        'private regexAccept(match : string, dpth : number, cr? : ContextRecorder) : Nullable<$$StrMatch> {',
        [
            'return this.runner<$$StrMatch>(dpth,',
            [
                '(log) => {',
                [
                    'if(log){',
                    [
                        'log(\'$$StrMatch\');',
                        'log(match);'
                    ],
                    '}',
                    'var reg = new RegExp(match, \'y\');',
                    'reg.lastIndex = this.mark();',
                    'const res = reg.exec(this.input);',
                    'if(res){',
                    [
                        'this.pos = reg.lastIndex;',
                        'return new $$StrMatch(res[0]);'
                    ],
                    '}',
                    'return null;'
                ],
                '}, cr)();'
            ]
        ],
        '}',
        ...ruleParseFns,
    ],
    '}',

    ...parseResult,

    'export class SyntaxErr {',
    [
        'pos : number;',
        'exprules : string[];',
        'expmatches : string[]',
        'constructor(pos : number, exprules : Set<string>, expmatches : Set<string>){',
        [
            'this.pos = pos;',
            'this.exprules = [...exprules];',
            'this.expmatches = [...expmatches];',
        ],
        '}',
        'toString() : string {',
        [
            'return `Syntax Error at position ${this.pos}. Tried to match rules ${this.exprules.join(\', \')}. Expected one of ${this.expmatches.map(x => ` \'${x}\'`)}`;',
        ],
        '}',
    ],
    '}',
    'class ErrorTracker implements ContextRecorder {',
    [
        'mxpos : number = -1;',
        'mnd : number = -1;',
        'prules : Set<string> = new Set();',
        'pmatches: Set<string> = new Set();',
        'record(pos : number, depth : number, result : any, extraInfo : string[]){',
        [
            'if(result !== null)',
            [
                'return;',
            ],
            'if(pos > this.mxpos){',
            [
                'this.mxpos = pos;',
                'this.mnd = depth;',
                'this.pmatches.clear();',
                'this.prules.clear();',
            ],
            '} else if(pos === this.mxpos && depth < this.mnd){',
            [
                'this.mnd = depth;',
                'this.prules.clear();',
            ],
            '}',
            'if(this.mxpos === pos && extraInfo.length >= 2 && extraInfo[0] === \'$$StrMatch\')',
            [
                'this.pmatches.add(extraInfo[1]);',
            ],
            'if(this.mxpos === pos && this.mnd === depth)',
            [
                'extraInfo.forEach(x => { if(x !== \'$$StrMatch\') this.prules.add(x)});',
            ],
        ],
        '}',
        'getErr() : SyntaxErr | null {',
        [
            'if(this.mxpos !== -1)',
            [
                'return new SyntaxErr(this.mxpos, this.prules, this.pmatches);',
            ],
            'return null;',
        ],
        '}',
    ],
    '}',
];
}
