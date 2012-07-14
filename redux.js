// redux.js
//
// © 2012 David J. Goehrig
//

Redux = function(In,Out) {
	var self = arguments.callee
	self.update(In,Out)
	for (self.step = 0; self.step < self.reductions; self.step++) 
		if (self.produce()) return self.out;
}

Redux.update = function(In,Out) {
	this.in = In
	this.out = Out	
	return true
}

Redux.produce = function() {
	var Match = this.matches()
	if (Match) return this.update.apply(this,this[this.step].product.apply(this, [ this.in, this.out ].concat(Match)))
	return false
}

Redux.matches = function() {
	return this.in.match(this[this.step].regex)
}

Redux.match = function(Regex,Product) {
	this[this.reductions++] = { regex: Regex, product: Product }
	return this
}

Redux.reductions =  0

// A sample reduction that creates new reductions based on pattern matching a /regex/ -> function body
Redux.match(/\/([^\/]+)\/ -> (.*)/, function(In,Out,M,R,F) { 
	R.gsub
	var reg = new RegExp(R)
	var fun = Function.constructor.apply(Function,[ 'In','Out','M','A','B','C','D','E', F ])
	console.log("Binding ", reg, " to ", fun)
	Redux.match( reg, fun ); 
	return [ '', 'ok' ] 
})
