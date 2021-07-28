/*
23/07/2021
Antonio Cortez @kacorius

Document methods and propiertys E.g.  getElementById, getElementsByClassName
https://developer.mozilla.org/es/docs/Web/API/Document

How to work with HTMLCollection
https://developer.mozilla.org/es/docs/Web/API/HTMLCollection

Explanation that Prototypes like scrn, btns variables
https://developer.mozilla.org/es/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

The crazy call function
https://www.w3schools.com/js/js_function_call.asp
https://www.w3schools.com/js/tryit.asp?filename=tryjs_function_call_arguments
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call

https://developer.mozilla.org/es/docs/Web/API/Element/matches
https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
https://developer.mozilla.org/es/docs/Web/API/Element/classList
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
https://www.w3schools.com/tags/ref_eventattributes.asp
https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event
https://codeburst.io/javascript-quickie-dot-notation-vs-bracket-notation-333641c0f781
https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/JSON
https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
*/

// The acounts for this app
var cuentas = [
	{ nombre: "Mali", saldo: 200.1, password: "qwer" },
	{ nombre: "Gera", saldo: 290.5, password: "asdf" },
	{ nombre: "Maui", saldo: 67.25, password: "zxcv" },
	{ nombre: "Alex", saldo: 500.8, password: "abc" },
	{ nombre: "Martha", saldo: 300.5, password: "abc" },
	{ nombre: "Carlos", saldo: 100.05, password: "abc" },
];

//Prototype to control the screen element
var scrn = {
	obj: document.getElementById("screen"),
	tmplt: [
		'<div class="col text-center"><p id="title" class="title">BIENVENIDO</p><p class="d-none" id="subtitle"></p><p id="amount" class="d-none"></p><input type="number" id="cash" onkeypress="wEnter(event);" class="pss d-none" min="0" ><p id="wmessage" class="Wmessage d-none"><p></div>',
		'<div class="col text-center"><p id="title" class="title">Seleccione una cuenta:</p><div id="carouselCards" class="carousel slide" data-bs-interval="false" data-bs-ride="carousel"><div class="carousel-inner"></div><button class="carousel-control-prev" type="button" data-bs-target="#carouselCards" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselCards" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div></div>',
		'<div class="col text-center"> <p id="title" class="title">Ingrese la contraseña:</p> <input id="pass" onkeyup="wEnter(event);" onkeypress="scrn.ctrlElement([{ elmn:\'wmessage\', view: false }]);" onclick="scrn.ctrlElement([{ elmn:\'wmessage\', view: false }]);" class="pss" type="password"> <p id="wmessage" class="Wmessage d-none">contraseña incorrecta</p> </div>',
	],
	printScr: function (op) {
		this.obj.innerHTML = this.tmplt[op];
	},
	showAcounts: function () {
		let htmelement = document.getElementsByClassName("carousel-inner")[0];
		let items = "";
		cuentas.forEach((act, index) => {
			items = items + '<div class="carousel-item ' + (index == 0 ? "active" : "") + // prettier-ignore
            '"><a href="#" onclick="initAcount();"><i class="fa fa-credit-card" aria-hidden="true"></i> <p>' + // prettier-ignore
            act.nombre + "</p> </a> </div>"; // prettier-ignore
		});
		htmelement.innerHTML = items;
	},
	ctrlElement: function (ops) {
		//E.g. [{ elmn: "idelement",view: true, txt: "Txt to show", fn/rmfn:{evn:"",fnc:function},  }]
		//console.log(ops);
		ops.forEach((ctrl) => {
			"txt" in ctrl ? (document.getElementById(ctrl.elmn).innerHTML = ctrl.txt) : ""; // prettier-ignore
			"view" in ctrl ? document.getElementById(ctrl.elmn).classList.toggle("d-none", !ctrl.view)	: ""; // prettier-ignore
			"fn" in ctrl ? document.getElementById(ctrl.elmn).addEventListener(ctrl.fn.evn, ctrl.fn.fnc )	: ""; // prettier-ignore
			"rmfn" in ctrl ? document.getElementById(ctrl.elmn).removeEventListener(ctrl.rmfn.evn, ctrl.rmfn.fnc ) : ""; // prettier-ignore
		});
	},
};

//Prototype to control the buttons elements
var btns = {
	items: [...document.getElementsByTagName("button")],
	Labls: [...document.getElementsByClassName("opkr")],
	cleanLbls: function () {
		this.Labls.forEach((item) => {
			item.innerHTML = "";
		});
	},
	setLbls: function (lbls) {
		//E.g.[{ ind: 8, txt: "the text" }]
		lbls.forEach((lbl) => {
			this.Labls[lbl.ind].innerHTML = lbl.txt;
		});
	},
	cleanfns: function (param) {
		if (!param) {
			this.items.forEach((item) => {
				item.onclick = "";
			});
		} else if (typeof param == "number") {
			this.items[param].onclick = "";
		}
	},
	setfns: function (elms) {
		//E.g.[{ ind: 8, fnct: "initAcount(1);" }]
		elms.forEach((elmn) => {
			this.items[elmn.ind].setAttribute("onclick", elmn.fnct);
		});
	},
	setLblFn: function (lbfn) {
		//E.g. [{ ind:0, txt:"-- Consultar", fn:"function"},]
		lbfn.forEach((itm) => {
			//this.items[elmn.ind].onclick = elmn.fnct;
			"txt" in itm ? (this.Labls[itm.ind].innerHTML = itm.txt) : "";
			"fn" in itm ? this.items[itm.ind].setAttribute("onclick", itm.fn) : "";
			//console.log(this.items[elmn.ind]);
		});
	},
};

//Prototype to control the acount operations
var acountOps = {
	active: null,
	Max: 990,
	min: 10,
	status: 0,
	val: "",
	init: function () {
		let cards = document.getElementsByClassName("carousel-item");

		this.active = Array.prototype.findIndex.call(cards, (card) => {
			//console.log("index: " + p.className);
			//return p.className == "carousel-item active";
			return card.matches(".active");
		});

		// let pp = [...document.getElementsByClassName("carousel-item")];
		// let inx = pp.findIndex((p, index) => {
		// 	return p.className === "carousel-item active";
		// });
	},
	end: function () {
		//this.active = null;
		this.status = 0;
		this.val = "";
	},
	validation: function (pass) {
		return cuentas[this.active].password == pass;
	},
	getData: function (prop) {
		return cuentas[this.active][prop];
	},
    setData: function (prop,val){
        cuentas[this.active][prop]=val;
    },
	limits: function (val) {
		console.log("limit + " + typeof(val));
		let result = {};
		let eval = this.val=="min" ? (this.getData("saldo") - val) : (this.getData("saldo") + val);
		result["inLimit"] = (eval>=this.min && eval<=this.Max);
		result.inLimit ? (this.status = 1) : (this.status = 0);
		if( !result.inLimit){
			let comp = this.val=="min" ? 0 : this.Max;
			eval>=comp? (result["msgtyp"] = 0) : (result["msgtyp"] = 1);
		}
		//{inLimit:true/false,msgtyp:0/1}
		return result;
	},
    go: function (val) {
        console.log("goooo");
        if(this.status){
            this.val=="min" 
            ? this.setData("saldo" , this.getData("saldo") - val ) 
            : this.setData("saldo" ,this.getData("saldo") + val);
            this.end();
        }
        
    }
};

//Buttons event handlers
function wEnter(event) {
	console.log("wenter");
	if (event.keyCode == 13) OK.click();
}

function selectAcount() {
	console.log("selectAcount");
	btns.cleanLbls();
	btns.cleanfns();
	scrn.printScr(1);
	btns.setLblFn([{ ind: 7, fn: "location.reload();" }]);
	scrn.showAcounts();
}

function initAcount(op) {
	console.log("initAcount");
	switch (op) {
		case 1:
			console.log("validar");
			if (!acountOps.validation(pass.value)) {
				scrn.ctrlElement([{ elmn: "wmessage", view: true }]);
				pass.value = "";
				pass.focus();
			} else {
				operations();
			}
			break;

		case 2:
			console.log("cancelar");
			location.reload();
			break;
            
		default:
			acountOps.init();
			console.log(acountOps.active);
			scrn.printScr(2);
			btns.setLblFn([
				{ ind: 6, fn: "initAcount(1);" },
				{ ind: 7, fn: "initAcount(2);" },
			]);
			pass.focus();
			break;
	}
}

function trickly() {
	/*
    for asing dynamically functions to element scrn.ctrlElement like:
    { elmn: "cash", view: true, rmfn:{ evn:"keyup", fnc: function(){operations(3);} } },
    dont work fine, for each time to call the above instruction added a new handler event to element
    so for work correctly we need provide a static function 
    https://stackoverflow.com/questions/30255311/avoid-adding-event-multiple-times
    */
	cash.value ? operations(3) : "";
}

function ops(op){
    console.log(op=="min"?"Retirar":"Depositar");
    btns.cleanLbls();
    btns.cleanfns();
    btns.setLblFn([{ ind: 7, fn: "operations();" }]);
    acountOps.val = op;
    scrn.ctrlElement([
        { elmn: "title", view: true, txt: acountOps.getData("nombre")}, // prettier-ignore
        { elmn: "subtitle", view: true,  txt: op=="min"?"Monto a Retirar?":"Monto a depositar?" }, // prettier-ignore
        { elmn: "amount", view: false,  txt: "" }, // prettier-ignore
        { elmn: "wmessage", view: false }, // prettier-ignore
        { elmn: "cash", view: true, rmfn:{ evn:"keyup", fnc: trickly } }, // prettier-ignore
        { elmn: "cash", view: true, fn:{ evn:"keyup", fnc: trickly } }, // prettier-ignore
    ]);
    cash.focus();
}

function operations(op) {
	console.log("Operations");

	switch (op) {
		case 0:
			console.log("Consultar");
			cash.value = "";
			scrn.ctrlElement([
				{ elmn: "title", txt: acountOps.getData("nombre") }, // prettier-ignore
				{ elmn: "subtitle", view: true,  txt: "Saldo" }, // prettier-ignore
				{ elmn: "cash", view: false }, // prettier-ignore
				{ elmn: "wmessage", view: false }, // prettier-ignore
				{ elmn: "amount", view: true,  txt: "$ "+ acountOps.getData("saldo").toFixed(2) }, // prettier-ignore
			]);
			break;

		case 1:
			console.log("Retirar");
			ops("min");
			break;

		case 2:
			console.log("Depositar");
            ops("MAX");
			break;

		case 3:
			console.log("V >" + parseFloat(cash.value) + "<");
			let result = acountOps.limits(parseFloat(cash.value)); //{inLimit:true/false,msgtyp:0/1}
			if (!result.inLimit) {
				btns.cleanfns(6);
                let ms= acountOps.val=="min"? "La cuenta debe quedar con al menos $10.00" : "La cuenta no puede manejar más de $990.00"; 
				scrn.ctrlElement([
					{
						elmn: "wmessage",
						view: true,
						txt:
							result.msgtyp > 0
								? "El monto excede por mucho su saldo."
								: ms,
					},
				]);
			} else {
				btns.setLblFn([{ ind: 6, fn: "operations(4);" }]);
				scrn.ctrlElement([{ elmn: "wmessage", view: false, txt: "" }]);
			}
			break;

		case 4:
			console.log("Transaction");
			cash.disabled = true;
			btns.cleanfns(6);
			acountOps.go(parseFloat(cash.value));
			scrn.ctrlElement([
				{
					elmn: "wmessage",
					view: true,
					txt: "Tu nuevo saldo es: $" + acountOps.getData("saldo"),
				},
			]);
            btns.setLblFn([
                { ind: 6, fn: "operations();" },
                { ind: 7, fn: "location.reload();" },
            ]);
			break;

		default:
			console.log("Default");
			btns.cleanfns();
			scrn.printScr(0);
			scrn.ctrlElement([{ elmn: "subtitle", view: true, txt: acountOps.getData("nombre")}]); // prettier-ignore
			btns.setLblFn([
				{ ind: 0, txt: "-- Consultar", fn: "operations(0);" },
				{ ind: 1, txt: "-- Retirar", fn: "operations(1);" },
				{ ind: 2, txt: "-- Depositar", fn: "operations(2);" },
				{ ind: 7, fn: "location.reload();" },
			]);
			break;
	}
}
