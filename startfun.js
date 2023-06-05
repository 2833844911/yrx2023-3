// author : cbb

const fs = require('fs');
const tee = require('@babel/types');
const generator = require("@babel/generator").default;

var srcJs = JSON.parse( fs.readFileSync('./data.json')+'');
function data(l, s, f){
    if (-2 == f) {
        r = 0;
        a = 0;
        while (l[s] > 127) {
          a += l[s++] - 128 << 7 * r++;
          cyd = 110;
        }  
        a += l[s++] << 7 * r;
        return {
          n: a,
          i: s
        };
        
      } else {
        a = (s = (m = data(l, s, -2)).i) + (r = m.n) - 1, s += r;
        return {
          n: a,
          i: s
        };
      }
}

let f = [];
var bodyall = {type: "program", body:f, supp:null};
var cans = ""

var num = 0;
var funInfo = []

function parseA(data){
    switch (data.type){
        case "VariableDeclarator":
            let f;
            if (data.init === undefined){
                f=undefined
            }else {
                f = parseAstToJs(data.init);
            }
            return tee.variableDeclaration("var",[tee.variableDeclarator(tee.identifier(cans+data.id.name), f)]);
        case "program":
            let db = []
             db = parseAstToJs(data.body, db);
            return tee.program(db);
        case "Identifier":
            if (data.name === 'window' || data.name === 'arguments' || data.name === 'e'){
                return tee.identifier(data.name);
            }
            return tee.identifier(cans+data.name);
        case "FunctionExpression":
            if (typeof data.body[0] === 'number'){
                return tee.functionExpression(undefined,data.params, tee.blockStatement([]));
            }else {
                let v = [];
                let hh = parseAstToJs(data.body,v);
                return tee.functionExpression(parseAstToJs(data.id),parseAstToJs(data.params,[],1), parseAstToJs(hh));
            }
        case "NullLiteral":
        case "nullLiteral":
            return tee.nullLiteral();
        case "StringLiteral":
        case "stringLiteral":
            return tee.stringLiteral(data.value);
        case "NumericLiteral":
        case "numericLiteral":
            return tee.numericLiteral(data.value);
        case "UnaryExpression":
            return tee.unaryExpression(data.operator,parseAstToJs(data.argument));
        case "AssignmentExpression":
            if (data.right === true){
                data.right = {"type":"booleanLiteral", value:data.right}
            }
            return tee.assignmentExpression(data.operator, parseAstToJs(data.left),parseAstToJs(data.right))
        case "CallExpression":
            // if (data.arguments[1]===undefined){
            //     data.arguments[1] ={type:"Identifier", name:"cbb_myyyyyyyy"};
            // }
            return tee.callExpression(parseAstToJs(data.callee), parseAstToJs(data.arguments,[], 1))
        case "MemberExpression":
            let sf = false
            if (data.property.type === 'StringLiteral' || data.property.type === 'stringLiteral' || data.property.type === 'numericLiteral' || data.property.type === 'NumericLiteral' || data.property.type === 'BinaryExpression' || data.property.type === 'MemberExpression'
            || data.property.type === 'ThisExpression' ||data.property.type === 'ConditionalExpression'|| data.property.type === 'UpdateExpression'
            ){
                sf = true
            }
            return tee.memberExpression(parseAstToJs(data.object), parseAstToJs(data.property), sf,false );
        case "BlockStatement":
            let bb = parseAstToJs(data.body,[]);
            return tee.blockStatement(bb);
        case "IfStatement":
            return tee.ifStatement(parseAstToJs(data.test), parseAstToJs(data.consequent), parseAstToJs(data.alternate));
        case "ConditionalExpression":
            return tee.conditionalExpression(parseAstToJs(data.test), parseAstToJs(data.consequent), parseAstToJs(data.alternate))
        case "ArrayExpression":
            return tee.arrayExpression(parseAstToJs(data.elements,[], 1));
        case "NewExpression":
            return tee.newExpression(parseAstToJs(data.callee), parseAstToJs(data.arguments, [], 1))
        case "booleanLiteral":
        case "BooleanLiteral":
            return tee.booleanLiteral(data.value);
        case "ObjectExpression":
            if (data.properties){
                return tee.objectExpression(parseAstToJs(data.properties,[],1))
            }
            return tee.objectExpression(parseAstToJs(data.property,[],1))
            
        case "BinaryExpression":
            return tee.binaryExpression(data.operator, parseAstToJs(data.left), parseAstToJs(data.right))
        case "SequenceExpression":
            return tee.sequenceExpression(parseAstToJs(data.body,[], 1));
        case "WhileStatement":
            return tee.whileStatement(parseAstToJs(data.test), parseAstToJs(data.body,[]))
        case "ExpressionStatement":
            return tee.expressionStatement( parseAstToJs(data.expression))
        case "UpdateExpression":
            return tee.updateExpression(data.operator, parseAstToJs(data.argument),data.prefix);
        case "TryStatement":
            return tee.tryStatement(parseAstToJs(data.block), parseAstToJs(data.bandler), parseAstToJs(data.finalizer));
        case "CatchClause":
            return tee.catchClause(parseAstToJs(data.param), parseAstToJs(data.body));
        case "ReturnStatement":
            return tee.returnStatement(parseAstToJs(data.argument));
        case "BreakStatement":
            return tee.breakStatement();
        case "ThisExpression":
            return tee.thisExpression();
        case "ThrowStatement":
            return tee.throwStatement(parseAstToJs(data.argument))
        case "LogicalExpression":
            return tee.logicalExpression(data.operator, parseAstToJs(data.left), parseAstToJs(data.right));
        case "DoWhileStatement":
            return tee.doWhileStatement(parseAstToJs(data.test),parseAstToJs(data.body));
        case "ForInStatement":
            return tee.forInStatement(parseAstToJs(data.left), parseAstToJs(data.right), parseAstToJs(data.body))
        default:
            console.log(data.type, "没有解析方法")

    }
}

function parseAstToJs(data, inbody, no){
    if (data instanceof Array){
        for (let i of data){
            if (i.type !== "ForInStatement" && i.type !== "DoWhileStatement" && i.type !== "VariableDeclarator" && i.type !== "IfStatement" && no !== 1 && i.type !== "WhileStatement" && i.type !== 'TryStatement'&& i.type !== 'ReturnStatement' && i.type !== "BreakStatement" && i.type !== "ExpressionStatement"  && i.type !== "ThrowStatement"){
                   inbody.push(tee.expressionStatement( parseA(i)))
            }else{
                inbody.push( parseA(i))
            }
        }
        return inbody
    }
    else if (data instanceof Object){
        return parseA(data)
    }

}

var funname = 0

var lerijq = null


function i(l, s, f, n, t, r, a, u, body, ljq){

    var p, v, g, m, d, y, w, F, b, C, j, x, E, R, S, k, q, z, A, B, D, G, H, I, J, K, L, M, N, O, P, Q, T, U, V, W, X, Y, Z, $, _, ee, ie, le, se, fe, ne, te, re, ae, ue, oe, ce, he, pe, ve, ge, me, de, ye, we, Fe, be, Ce, je, xe, Ee, Re, Se;

    n || ((n = [{type:'ThisExpression'}]).n = n[0], n.t = [], (v = {}).s = !1, v.v = !1, n.t.push(v), i.r = i.g = i), g = n[n.length - 1]

    if (t === i){
        y = {};
        y.__proto__ = i.prototype;
        w = [].slice.call(u);
        F = 0;
        cyd = 39;
        while (F < r.length) {
            y[r[F].value] = w[F];
            F++;
            cyd = 39;
        } 
        y.arguments = u;
        b = [].concat(n).concat(y);
        b.n = a;
        b.t = []


        return i(l, s, f, b, null, null, null,null, body);
    }
    C = s || 0;
    p = f || l.length;
    j = l[C++];
    m = data(l, C, -2);
    C = m.i;
    x = 0;
    13 == j || 48 == j ? x = 1 : 49 == j ? x = 2 : 23 == j && (x = 3);
    if (13 == j || 48 == j || 49 == j || 23 == j) {
        v = n.t && n.t[n.t.length - 1];
        E = [];
        while (C < p){
            R = C++;
            m = data(l, C, -3);
            C = m.i;
            S = m.n
            E.push(i(l, R, S, n, null, null, null,null, body));
            if (3 != x && n.a){
                return E[E.length - 1];
            }else if (2 == x && v && (v.v || v.s)){
                return E[E.length - 1];
            }
        }
        if (2 != x) {
            return E;
        }
    }
    let cbbiyhh;
    // console.log(j);

    if (j === 112 || j === 106 || j === 73){
        cbbh = 1;
        (v = {}).s = !1;
        v.v = !1;
        n.t.push(v);
        v = n.t && n.t[n.t.length - 1];
      }

    switch (j){
        case 106:
            (P = C++, m = data(l, C, -3), C = m.i, Q = m.n, T = C++, m = data(l, C, -3), C = m.i, U = m.n, V = C++, m = data(l, C, -3), C = m.i, W = m.n, X = C++, m = data(l, C, -3), C = m.i, Y = m.n);
            let needcone23 = {type:"Identifier", name: "yhh_"+ C};
            let vvvggg32 = i(l, P, Q, n, null, null, null,null, body);
            let vvvggg23 = i(l, T, U, n, null, null, null,null, body); 
            K = X || 0;
            L = Y || l.length;
            K++;
            while (l[K] > 127){
                K++;
            }
            K++;
            let mybd2 = [];
            let my1122 = {type:"BlockStatement", body:mybd2}
            while (K<L){
                R = K++;
                M = 0;
                N = 0;
                while (l[K] > 127){
                    N += l[K++] - 128 << 7 * M++;
                }
                
                d = N + (l[K++] << 7 * M), S = K + d - 1, K += d;
                E = i(l, R, S, n, null, null, null,null, mybd2);
                if (v.v || v.s) {
                break
                }
            }
            let vhvhv = i(l, V, W, n, null, null, null,null, mybd2, needcone23);
            if (vhvhv && vhvhv.length != 0){
                mybd2.push(vhvhv)
            }
            let gx2 = "WhileStatement";

            let baoc2 = {'type':gx2, test:vvvggg23, body:my1122 }
            body.push(baoc2);

            break
        case 73:
        case 112:

            (P = 0, Q = -1, T = C++, m = data(l, C, -3), C = m.i, U = m.n, V = 0, W = -1, X = C++, m = data(l, C, -3), C = m.i, Y = m.n);
            let needcone2 = {type:"Identifier", name: "yhh_"+ C};
            let vvvggg = i(l, P, Q, n, null, null, null,null, body);
            let vvvggg2 = i(l, T, U, n, null, null, null,null, body); 
            K = X || 0;
            L = Y || l.length;
            K++;
            while (l[K] > 127){
                K++;
            }
            K++;
            let mybd = [];
            let my112 = {type:"BlockStatement", body:mybd}
            while (K<L){
                R = K++;
                M = 0;
                N = 0;
                while (l[K] > 127){
                    N += l[K++] - 128 << 7 * M++;
                }
                
                d = N + (l[K++] << 7 * M), S = K + d - 1, K += d;
                E = i(l, R, S, n, null, null, null,null, mybd);
                if (v.v || v.s) {
                break
                }
            }
            let vhvhv2 = i(l, V, W, n, null, null, null,null, mybd, needcone2);
            if (vhvhv2 && vhvhv2.length != 0){
                mybd.push(vhvhv2)
            }
            let gx = "DoWhileStatement";
            if (j === 73){
                gx= 'WhileStatement'
            }
            let baoc = {'type':gx, test:vvvggg2, body:my112 }
            body.push(baoc);
  
            


            break;
        case 1:
            ce = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body);
            n.m = !i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body);
            he = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body);
            n.m = !1;
            pe = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body);

            cbbiyhh = [ce, he, pe];
            break;
        case 6:
            let cbbhhu6 = C++;
            m = data(l, C, -3), C = m.i;
            let cbbhhu7 = m.n
            let cbbhhu8 = C++;
            m = data(l, C, -3), C = m.i;
            let cbbhhu9 = m.n;
            let cbbhhu10 = i(l, cbbhhu8, cbbhhu9, n, null, null, null,null, body);
            
            let cbhhu11 = C++;
            m = data(l, C, -3), C = m.i;
            let cbbhhu12 =  m.n;
            let cbbhhh13 = i(l, cbhhu11, cbbhhu12, n, null, null, null,null, body);


            cbbiyhh = i(l, cbbhhu6, cbbhhu7, n, 0, cbbhhu10, cbbhhh13, null, body);
            break;
        case 29:
            var ke;
            var qe = [];
            var c = 0;
            var h = 0;
            (v = {}).s = !1;
             v.v = !1;
            n.t.push(v);
            v = n.t && n.t[n.t.length - 1];
            let cbb_u29 = C++;
            m = data(l, C, -3), C = m.i;
            let cbb_u291 =  m.n;
            D = i(l, cbb_u29, cbb_u291, n)
  
            let bbbbb;
            1 == D.value && (n.e = !0, bbbbb = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body), G = bbbbb[0], n.e = !1);
            0 == D.value && (G = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, !0, null, null, null, body));
            H = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n);
            I = C++, m = data(l, C, -3);
            C = m.i, J = m.n
            // H是准备循环的


            let dhfasjkdhask = []
            let chzkjadhaskj = {type:"BlockStatement", body:dhfasjkdhask}

            K = I || 0;
            L = J || l.length;
            K++;
            while (l[K] > 127){
                K++;
            }
            K++;
            while (K < L){
                R = K++;
                M = 0;
                N = 0;
                while (l[K] > 127){
                    N += l[K++] - 128 << 7 * M++;
                }
                d = N + (l[K++] << 7 * M), S = K + d - 1, K += d, E = i(l, R, S, n, null, null, null,null, dhfasjkdhask);
                if (v.v || v.s) {
                    break
                }

            }


            let myf = {type:"ForInStatement", left:{type:"Identifier", name:G[1].value}, right:H, body:chzkjadhaskj};

            body.push(myf)
            break
        
        case 77:
            let hu77 = (ue = i(l, r, a, n, !0, null, null,null, body))[0];
            if (!ue[0].type){
                ue[0] = {'type':"ThisExpression"}
            }
            cbbiyhh = {"type":"UnaryExpression", operator:"delete", argument: {type:"MemberExpression", object: ue[0], property:ue[1]}}
            // cbbiyhh = delete ue[0][ue[1]];
            break;
        case 3:
            n.m = !0;
            Re = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body);
            n.m = !1;
            let cbbpp_3 = C++;
            m = data(l, C, -3), C = m.i;
            let cbbpp_4 = m.n;
            Se = i(l, cbbpp_3, cbbpp_4, n, null, null, null,null, body);
            g[Re.value] = Se
            let cbb_3 = {type:"Identifier", name:Re.value};
            if (Array.isArray(Se)){

            }else{
                body.push({type:"AssignmentExpression", left: cbb_3, right:Se, operator:"="})
            }
            
            cbbiyhh = n.e ? [g, Re] : {type:"UnaryExpression",operator:"void", argument:{type:"numericLiteral", value:0} };
            break;
        case 55:
        case 31:
            n.m = !0;
            k = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body);
            // console.log(k);
            q = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body)
            n.m = !1
            z = C++
            m = data(l, C, -3)
            C = m.i, A = m.n
            // 遍历方法生成
            // return k && (g[k] = B), B;
            let bhh31 = [];
            if (!q){
                q = []
            }
            for (let ikkk31 of q){
                bhh31.push({type:"Identifier", name:ikkk31.value})
            }
            let mybody31 = [];
            // console.log("函数解析开始");
            i(l, z, A, n, i, q, {type:'ThisExpression'}, {type:"Identifier", name:"arguments"}, mybody31);
            // console.log("函数解析结束");
            if (!k){
                k = {type:"stringLiteral", value:''}
            }
            let bbbb =  {type:"FunctionExpression", body:{type:"BlockStatement",body: mybody31}, id:{type:"Identifier", name:k.value}, params:bhh31};
            B = {type:"Identifier", name:"yhh_"+ C};
            body.push({type:"AssignmentExpression", left: B, right:bbbb, operator:"="})
            funname+=1;
            
            // console.log( generator(parseAstToJs({type: "program", body:body, supp:null})).code);
            return k.value && (g[k.value] = B), B;
        case 93:
            let cbb93 = {type:"BinaryExpression", operator:"instanceof", left:r, right:a};
            let cbb932 = {type:"Identifier", name:"yhh_"+ C};
            if (Array.isArray(a)){
                debugger
            }
            body.push({type:"AssignmentExpression", left: cbb932, right:cbb93, operator:"="})
            cbbiyhh = cbb932;
            break;
        case 96:
            let cbb_96 = C++;
            m = data(l, C, -3), C = m.i;
            let cbb_962 =  m.n
            let cbb_963 = C++;
            m = data(l, C, -3), C = m.i;
            let cbb_964 = m.n;
            let cbb_965 = i(l, cbb_963, cbb_964, n, null, null, null,null, body);
            let cbb_967 = C++;
            m = data(l, C, -3), C = m.i;
            let cbb_968 = m.n;
            let cbb_969 = i(l, cbb_967, cbb_968, n, !0, null, null, null, body)


            cbbiyhh = i(l, cbb_96, cbb_962, n, 0, cbb_965, cbb_969,null, body);
            break;
        case 119:
            if (!a[0].type){
                a[0] = {'type':"ThisExpression"}
            }
            let test_119;
            if (r.value){
                test_119 = {type:"UpdateExpression",operator:"++", prefix:true,argument:{type:"Identifier", name:a[1].value}}
            }else{
                test_119 = {type:"UpdateExpression", operator:"++", prefix:false,argument:{type:"Identifier", name:a[1].value}}

            }
            
            cbbiyhh  = test_119;
            // cbbiyhh = r ? ++a[0][a[1]] : a[0][a[1]]++;
            break;
        case 75:
            if (!a[0].type){
                a[0] = {'type':"ThisExpression"}
            }
            let test_75;
            if (r.value){
                test_75 = {type:"UpdateExpression",operator:"--", prefix:true,argument:{type:"Identifier", name:a[1].value}}
            }else{
                test_75 = {type:"UpdateExpression", operator:"--", prefix:false,argument:{type:"Identifier", name:a[1].value}}

            }
            
            cbbiyhh  = test_75;
            // cbbiyhh = r ? ++a[0][a[1]] : a[0][a[1]]++;
            break;
        case 74:
            let cbbhu_74 = C++;
            m = data(l, C, -3), C = m.i;
            let cbbhu_7442 = m.n;
            let bh_7443 = i(l, cbbhu_74,cbbhu_7442, n, null, null, null,null, body);
            let cbbhu_7444 = C++;
            m = data(l, C, -3), C = m.i;
            let bjjj_74 = m.n;
            let bjjj_742 = i(l, cbbhu_7444, bjjj_74, n, null, null, null,null, body)
            cbbiyhh = {type:"NewExpression", callee:{type:"Identifier", name:"RegExp"}, 
                arguments:[bh_7443, bjjj_742]
            }
            // cbbiyhh = new RegExp(bh_7443, bjjj_742);
            break;
        case 104:
            cbbiyhh = (n.t && n.t[n.t.length - 1]).v = !0;
            break;
        case 81:
            cbbiyhh = (n.t && n.t[n.t.length - 1]).s = !0;
            break;
        case 84:
            let cbb841 = C++;
            m = data(l, C, -3), C = m.i;
            let cbb842 = m.n;
            Z = i(l, cbb841, cbb842, n, null, null, null,null, body);
            let cbb843 = C++;
            m = data(l, C, -3), C = m.i;
            let cbb844 =  m.n;
            w = i(l, cbb843, cbb844, n, null, null, null,null, body)



            if (i.bind) {
                let cgbb84 = {type:"NewExpression", callee:Z, arguments: w}
                let cgbb842 = {type:"Identifier", name:"yhh_"+ C};
                if (Array.isArray(cgbb84)){
                    debugger
                }
                body.push({type:"AssignmentExpression", left: cgbb842, right:cgbb84, operator:"="});
                if (ljq){
                    body.push({type:"AssignmentExpression", left: ljq, right:cgbb842, operator:"="})
                }
                return cgbb842;
                
                // return new (i.bind.apply(Z, [null].concat(w)))();
            } else {
                console.log("84 指令else执行");
            }
        case 30:
            let bhhhhhh30 = {type:"BinaryExpression", operator:"&", left: r, right:a};
            cbbiyhh = bhhhhhh30;
            break;
        case 58:
            let bhhhhhh58 = {type:"BinaryExpression", operator:"+", left: r, right:a};
            cbbiyhh = bhhhhhh58;
            break;
        case 32:
            
            return i(l, r, a, n, null, null, null,null, body);;
        case 87:
            cbbiyhh = {type:"Identifier", name:"undefined"};
            break;
        case 16:
            let bhhhhhh16 = {type:"BinaryExpression", operator:"==", left: r, right:a};
            cbbiyhh = bhhhhhh16;
            break;
        case 2:
            let bhhhhhh2 = {type:"BinaryExpression", operator:"<=", left: r, right:a};
            cbbiyhh = bhhhhhh2;
            break;
        case 26:
            if (!r){
                debugger
            }
            let bhhhhhh26 = {type:"BinaryExpression", operator:"===", left: r, right:a};
            cbbiyhh = bhhhhhh26;
            break;
        case 52:
            let bhhhhhh52 = {type:"BinaryExpression", operator:"!==", left: r, right:a};
            cbbiyhh = bhhhhhh52;
            break;
        case 36:
            let bhhhhhh36 = {type:"BinaryExpression", operator:"<", left: r, right:a};
            cbbiyhh = bhhhhhh36;
            break;
        case 68:
            let bhhhhhh68 = {type:"BinaryExpression", operator:"/", left: r, right:a};
            cbbiyhh = bhhhhhh68;
            break;
        case 101:
            let bhhhhhh101 = {type:"BinaryExpression", operator:">=", left: r, right:a};
            cbbiyhh = bhhhhhh101;
            break;
        case 110:
            let bhhhhhh110 = {type:"BinaryExpression", operator:"%", left: r, right:a};
            cbbiyhh = bhhhhhh110;
            break;
        case 43:
            let bhhhhhh43 = {type:"BinaryExpression", operator:">", left: r, right:a};
            cbbiyhh = bhhhhhh43;
            break;
        case 62:
            let bhhhhhh62 = {type:"BinaryExpression", operator:">>", left: r, right:a};
            cbbiyhh = bhhhhhh62;
            break;
        case 64:
            let bhhhhhh64 = {type:"BinaryExpression", operator:">>>", left: r, right:a};
            cbbiyhh = bhhhhhh64;
            break;
        case 37:
            let bhhhhhh37 = {type:"BinaryExpression", operator:"|", left: r, right:a};
            cbbiyhh = bhhhhhh37;
            break;
        case 113:
            let bhhhhhh113 = {type:"BinaryExpression", operator:"-", left: r, right:a};
            cbbiyhh = bhhhhhh113;
            break;
        case 45:
            cbbiyhh = {type:"booleanLiteral", value: !!l[C++]};
            break;
        case 63:
            let bhhhhhh63 = {type:"BinaryExpression", operator:"*", left: r, right:a};
            cbbiyhh = bhhhhhh63;
            break;
        case 15:
            let bhhhhhh15 = {type:"BinaryExpression", operator:"^", left: r, right:a};
            cbbiyhh = bhhhhhh15;
            break;
        case 118:
            let bhhhhhh118 = {type:"BinaryExpression", operator:"<<", left: r, right:a};
            cbbiyhh = bhhhhhh118;
            break;
        case 92:
            let cb = i(l, a, u, n, null, null, null,null, body);
            if (Array.isArray(cb)){
                cb = {type:"Identifier", name:"cbb_myyyyyyyy"+C}
            }
            let bhhhhhh92 = {type:"LogicalExpression", operator:"&&", left: r, right:cb};
            let bhhhhhh92B = {type:"Identifier", name:"yhh_"+ C};
            
            body.push({type:"AssignmentExpression", left: bhhhhhh92B, right:bhhhhhh92, operator:"="})
            cbbiyhh = bhhhhhh92B;
            break;
        case 97:
            if (!r[0].type){
                r[0] = {'type':"ThisExpression"}
            }
            
            let cbbop_97 = {type:"AssignmentExpression", operator:">>>=", left:
            {"type":"MemberExpression", object:r[0], property:r[1]},
            right: a
            }
            body.push(cbbop_97)
            
            cbbiyhh ={"type":"MemberExpression", object:r[0], property:r[1]};
            break;

        case 121:
            if (!r[0].type){
                r[0] = {'type':"ThisExpression"}
            }
            
            let cbbop_121 = {type:"AssignmentExpression", operator:"|=", left:
            {"type":"MemberExpression", object:r[0], property:r[1]},
            right: a
            }
            body.push(cbbop_121)
            
            cbbiyhh ={"type":"MemberExpression", object:r[0], property:r[1]};
            break;
        case 38:
            let cb2 = i(l, a, u, n, null, null, null,null, body);
            if (Array.isArray(cb2)){
                cb2 = {type:"Identifier", name:"cbbbzzzzzz"}
            }
            let bhhhhhh38 = {type:"LogicalExpression", operator:"||", left: r, right:cb2};
            let bhhhhhh38B = {type:"Identifier", name:"yhh_"+ C};

            if (Array.isArray(cb2)){
                debugger
            }
            body.push({type:"AssignmentExpression", left: bhhhhhh38B, right:bhhhhhh38, operator:"="})
            cbbiyhh = bhhhhhh38B;
            break;
        case 78:
            n.m = !0;
            je = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body);
        
            n.m = !1;
            g[je] = n.u;
            body.push({type:"AssignmentExpression", left: {type:"Identifier", name:je}, right:{type:"Identifier", name:"cbberr"}, operator:"="})

    
            cbbiyhh = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body);
            break;
        case 109:
            _ = C++, m = data(l, C, -3), C = m.i, ee = m.n, ie = C++, m = data(l, C, -3), C = m.i, le = m.n, se = C++, m = data(l, C, -3), C = m.i, fe = m.n;
            let cbb_1092 = []
            let cbb_1093 = []
            let cbb_1094 = []
            ne = i(l, _, ee, n, null, null, null,null, cbb_1092);
            te = i(l, ie, le, n, null, null, null,null, cbb_1093)
            ae = i(l, se, fe, n, null, null, null,null, cbb_1094)
            let cbb_109100 = {type:"TryStatement", block:{type:"BlockStatement",body:cbb_1092},
                handler:{type:"CatchClause", param:{type:"Identifier", name:"cbberr"}, body:{type:"BlockStatement",body:cbb_1093}},
                finalizer:{type:"BlockStatement",body:cbb_1094}
            }
            body.push(cbb_109100);
            return;
        case 35:
            ue = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null,null, body);
            let cbb_35 = [];
            E = {type:"ObjectExpression", property:cbb_35};
            F = 0;
            while (F < ue.length) {
                oe = ue[F];
                ce = oe[0];
                he = oe[1];
                pe = oe[2];
                
                if (42 == ce) { 
                    // console.log([E,he,pe]);
                    let hbbbbbbbbbbbb = {type:"Property", key:he, value:pe}
                    cbb_35.push(hbbbbbbbbbbbb)
                    // E[he] = pe
                };
                F++;
            }
            return E;
        case 102:
            let cbb_102 = i(l, r, a, n,null, null, null, null, body);
            let cbb_103 = {type:"UnaryExpression", operator:'-', argument:cbb_102}
            cbbiyhh = cbb_103;
            break;
        case 80:
            let cbb_80 = i(l, r, a, n,null, null, null, null, body);
            let cbb_803 = {type:"UnaryExpression", operator:'~', argument:cbb_80}
            cbbiyhh = cbb_803;
            break;
        case 24:
            let cbb_24 = i(l, r, a, n,null, null, null, null, body);
            let cbb_243 = {type:"UnaryExpression", operator:'+', argument:cbb_24}
            cbbiyhh = cbb_243;
            break;
        case 111:
            let bhhhhhh111 = {type:"BinaryExpression", operator:"in", left: r, right:a};
            cbbiyhh = bhhhhhh111;
            break;
        case 57:
            cbbiyhh = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n,null, null, null, null, body);
            cbbiyhh = cbbiyhh.pop();
            break;
        case 8:
            if (!r[0].type){
                r[0] = {'type':"ThisExpression"}
            }
            
            let cbbop_8 = {type:"AssignmentExpression", operator:"+=", left:
            {"type":"MemberExpression", object:r[0], property:r[1]},
            right: a
            }
            body.push(cbbop_8)
            
            cbbiyhh ={"type":"MemberExpression", object:r[0], property:r[1]};
            break;
        case 69:
            if (!r[0].type){
                r[0] = {'type':"ThisExpression"}
            }
            
            let cbbop_69 = {type:"AssignmentExpression", operator:"/=", left:
            {"type":"MemberExpression", object:r[0], property:r[1]},
            right: a
            }
            body.push(cbbop_69)
            
            cbbiyhh ={"type":"MemberExpression", object:r[0], property:r[1]};
            break;
        case 10:
            if (!r[0].type){
                r[0] = {'type':"ThisExpression"}
            }
            let cbbop_10 = {type:"AssignmentExpression", operator:"%=", left:
            {"type":"MemberExpression", object:r[0], property:r[1]},
            right: a
            }
            cbbiyhh =cbbop_10;
            

            body.push(cbbop_10)
            
            cbbiyhh ={"type":"MemberExpression", object:r[0], property:r[1]};
            break;
        case 19:
            if (!r[0].type){
                r[0] = {'type':"ThisExpression"}
            }
            let cbbop_19 = {type:"AssignmentExpression", operator:"-=", left:
            {"type":"MemberExpression", object:r[0], property:r[1]},
            right: a
            }
            
            body.push(cbbop_19)
            
            cbbiyhh ={"type":"MemberExpression", object:r[0], property:r[1]};
            break;
        case 21:
            let c211 = C++;
            m = data(l, C, -3), C = m.i;
            let c212 = m.n;
            let c213 = C++;
            m = data(l, C, -3), C = m.i;
            let c214 = m.n;
            let c215 = i(l, c213, c214, n, !0, null, null, null, body);
            let c216 = C++;
            m = data(l, C, -3), C = m.i;
            let c217 = m.n
            let c218 = i(l, c216, c217, n, null, null, null,null, body);
            cbbiyhh = i(l, c211, c212, n, 0, c215, c218,null, body);
            break;
        case 4:
        case 65:
            ve = l[C++];
            m = data(l, C, -2);
            C = m.i;
            ge = m.n;
            me = [];
            F = 0;
            while(F < ge) {
                m = data(l, C, -2), C = m.i, de = m.n, me.push(de);
                F++;
            };
            ye = String.fromCharCode.apply(null, me);
            ye = {type:"stringLiteral", value:ye }
            if ( 65 == j || n.m){
                
                return ye;
            }else if (t){
                let need = n[ve];
                if (ve === 1||ve === 2||ve === 3){
                    need = {'type':"ThisExpression"}
                }
                return [need ,ye];
            }else{
                let bbbbbbbbbbbbu;
                if (ve != 0){
                    bbbbbbbbbbbbu = {type:"Identifier", name:ye.value}
                }else{
                    if (!n[ve].type){
                        debugger
                    }
                    bbbbbbbbbbbbu = {type:"Identifier", name:ye.value};
                }
                
                if (ljq){
                    body.push({type:"AssignmentExpression", left: ljq, right:bbbbbbbbbbbbu, operator:"="})
                }
                
                return bbbbbbbbbbbbu
            }
        case 60:
            let bh60 = C++;
            m = data(l, C, -3)
            C = m.i
            let bh602 =  m.n;
            let bh603 = C++;
            m = data(l, C, -3)
            C = m.i
            let bh604 = m.n;
            let bh605 = i(l, bh603, bh604, n, null, null, null,null, body);
            let bh606 = C++;
            m = data(l, C, -3);
            C = m.i
            cbbiyhh = i(l, bh60, bh602, n, 0, bh605, bh606,  m.n, body);
            break;
        case 59:
            let ch = C++;
            m = data(l, C, -3);
            C = m.i
            let ch2 = m.n;
            we = i(l, ch, ch2, n, !0, null, null, null, body);
            // log(we,"函数")
            let ch3 = C++;
            m = data(l, C, -3)
            C = m.i
            let ch4 = m.n
            Fe = i(l,ch3, ch4, n, null, null, null, null, body)

            let vgg = [];
            for (let iok =0; iok < Fe.length; iok++){
                if (Fe[iok] ){
                    if (Array.isArray(Fe[iok])){
                        for (let i = 0; i< Fe[iok].length; i++){
                            vgg.push(Fe[iok][i])
                        }
                    }else{
                        vgg.push(Fe[iok])
                    }
                    
                }
                
            }
            // log(Fe, "参数")
            // console.log(Fe);
            if (!Array.isArray(we)){
                let vhCall = {type:"CallExpression", callee: we, arguments: vgg};
                B = {type:"Identifier", name:"yhh_"+ C};
                body.push({type:"AssignmentExpression", left: B, right:vhCall, operator:"="})
                if (ljq){
                    body.push({type:"AssignmentExpression", left: ljq, right:B, operator:"="})
                }

                cbbiyhh = B;
            }else{

                if (!we[0].type){
                    be = {type:"Identifier", name:we[1].value}
                }else{
                    be = {type:"MemberExpression", object: we[0], property:we[1]}
                }
            

            if ( we[0] instanceof i.g){
                let vhCall = {type:"CallExpression", callee: be, arguments: vgg};
                B = {type:"Identifier", name:"yhh_"+ C};
                body.push({type:"AssignmentExpression", left: B, right:vhCall, operator:"="})
                if (ljq){
                    body.push({type:"AssignmentExpression", left: ljq, right:B, operator:"="})
                }
                cbbiyhh = B;

                // cbbiyhh = i.apply.call(be, n.n, Fe)
            }else{
                let vhCall = {type:"CallExpression", callee: be, arguments: vgg};
                B = {type:"Identifier", name:"yhh_"+ C};
                body.push({type:"AssignmentExpression", left: B, right:vhCall, operator:"="})
                if (ljq){
                    body.push({type:"AssignmentExpression", left: ljq, right:B, operator:"="})
                }
                cbbiyhh = B;
                // cbbiyhh = i.apply.call(be, we[0], Fe)
            }
            }
            return cbbiyhh
        case 56:
        case 76:
            let cbb76 = C++;
            m = data(l, C, -3), C = m.i;
            let cbb762 = m.n;
            let cbb763 = i(l, cbb76, cbb762, n, null, null, null, null, body);
            let vggg76 = C;
            // if (cbb763){
            let cbb764 = C++;
            m = data(l, C, -3), C = m.i;
            let cbb765 = m.n;
            let bhh762 = []
            let cbb765103 = {type:"BlockStatement", body:bhh762}


            let needcone = {type:"Identifier", name: "yhh_"+ C};

            let v76 = i(l, cbb764, cbb765, n, null, null, null, null, bhh762, needcone);
            if (v76){
                if (Array.isArray(v76)){
                    if (v76.length>0){
                        bhh762.push(
                            {type:"AssignmentExpression", left: needcone, right:v76[0], operator:"="}
                        )
                    }
                    
                }else{
                    bhh762.push(
                        {type:"AssignmentExpression", left: needcone, right:v76, operator:"="}
                    )
                }
            }
            // }else{
            m = data(l, ++vggg76, -3), vggg76 = m.i;
            let gggggg;
            let cbb766 = vggg76++;
            m = data(l, vggg76, -3),vggg76 =m.i;
            gggggg = m.n;
            let bhh76666 = []
            let cbb765104 = {type:"BlockStatement", body:bhh76666}
            v76 = i(l, cbb766, gggggg, n, null, null, null, null, bhh76666, needcone);
            if (v76){
                if (Array.isArray(v76)){
                    if (v76.length>0){
                        bhh76666.push(
                            {type:"AssignmentExpression", left: needcone, right:v76[0], operator:"="}
                        )
                    }
                    
                }else{
                    bhh76666.push(
                        {type:"AssignmentExpression", left: needcone, right:v76, operator:"="}
                    )
                }
                
            }
            
            let cbb76102 = {type:"IfStatement", test:cbb763, consequent:cbb765103, alternate:cbb765104}
            body.push(cbb76102);
            return needcone;
            // }
        case 120:
            // n.a = !0;
            let bhh = C++;
            m = data(l, C, -3)
            C = m.i
            cbbiyhh =  i(l, bhh, m.n, n, null, null, null, null, body);
            break;
        case 103:
            cbbiyhh = {type: "nullLiteral"};
            if (ljq){
                body.push({type:"AssignmentExpression", left: ljq, right:cbbiyhh, operator:"="})
            }
            break;
        case 105:
            let cbb_105 = C++
            m = data(l, C, -3), C = m.i;
            let cbb_1051 = m.n;
            let cbb_1052 = i(l, cbb_105, cbb_1051, n, null, null, null, null, body);
            body.push({type:"ThrowStatement", argument: cbb_1052});
            break

        case 72:
            xe = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null, null, body);
            G = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null, null, body)
            n.m = !xe;
            Ee = i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n, null, null, null, null, body);
            n.m = !1

            cbbiyhh = t ? [G, Ee] : {type:"MemberExpression", object: G, property:Ee};
            break;
        case 94:
            let cbbb94 = {type:"BinaryExpression", operator: "!=", left:r, right:a}
            let cbb9488 = {type:"Identifier", name:"yhh_"+ C};
            let cbbb942 = {type:"AssignmentExpression", operator:"=", left: cbb9488, right:cbbb94}
            body.push(cbbb942)
            cbbiyhh =  cbb9488
            // cbbiyhh = r != a;
            break;
        case 95:
            cbbiyhh = n.n;
            if (ljq){
                body.push({type:"AssignmentExpression", left: ljq, right:cbbiyhh, operator:"="})
            }
            break;
        case 116:
            let vvvg = C++;
            m = data(l, C, -3)
            C = m.i

            cbbiyhh = i(l, vvvg,  m.n, n, null, null, null, null, body);
            break;
        case 125:
            let cbb1251 = i(l, r, a, n, null, null, null, null, body);
            let cbb125 = {type:"UnaryExpression", operator:"typeof", argument:cbb1251}
            let cbb1259 = {type:"Identifier", name:"yhh_"+ C};
            let cbb1252 = {type:"AssignmentExpression", operator:"=", left: cbb1259, right:cbb125}
            body.push(cbb1252)
            cbbiyhh =  cbb1259
            break;
        case 126:
            let bh43 = C++;
            m = data(l, C, -3)
                C = m.i
            cbbiyhh = i(l, bh43, m.n, n, null, null, null, null, body);
            break;
        case 91:
            let vg = C++;
            m = data(l, C, -3), C = m.i;
            let vg2 = m.n;
            let vg3 = C++;
            m = data(l, C, -3), C = m.i;
            cbbiyhh = i(l, vg, vg2, n, 0, vg3,  m.n, null, body);
            break;
        case 46:
            let gh46 = (61 == (ce = l[C++]) && (Ce = l[C++]), 53 == ce && (m = data(l, C, -2), C = m.i, Ce = m.n), 70 == ce && (Ce = parseFloat(i(l, C++, (m = data(l, C, -3), C = m.i, m.n), n,null, null, null, null, body).value)), Ce);
            cbbiyhh = {type:"numericLiteral", value:gh46};
            break;
            
        case 85:
            let c851 = i(l, r, a, n, null, null, null, null, body)
            let c85 = {type:"UnaryExpression", operator:"!", argument:c851}
            cbbiyhh = c85;
            break
        case 86:
            let cbb_86;
            if (Array.isArray(a)){
                cbb_86 = {type:"ArrayExpression", elements:[]}
            }else{
                cbb_86 =a
            }
            if (!r[0].type){
            body.push({type:"AssignmentExpression", operator:"=", left: {type:"Identifier", name:r[1].value}, right:cbb_86})
                
            }else{
            body.push({type:"AssignmentExpression", operator:"=", left: {type:"MemberExpression", object: r[0], property:r[1]}, right:cbb_86})

            }
            cbbiyhh = a;
            break
        default:
            if (j != 49){
                console.log("没有指令:",j);
            }
            
        
            

    }
    return cbbiyhh;


}

i(srcJs, 0, srcJs.length, null, null, null,null,null, f)
let v = generator(parseAstToJs(bodyall)).code;
// console.log(v);
fs.writeFileSync('./yuanr2022-3.js', v);
debugger


