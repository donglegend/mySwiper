;(function (global, name, factory){
	'use strict';
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory();
    } else {
        global[name] = factory();
    }
})(typeof window !== 'undefined' ? window : this, 'Swiper', function (){

var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var touchstart = mobile ? "touchstart" : "mousedown";
var touchend = mobile ? "touchend" : "mouseup";
var touchmove = mobile ? "touchmove" : "mousemove";

document.addEventListener(touchmove, function (e){
	e.preventDefault;
})

// // // // // // // // // // // // // // // // // // // // // // 
function Swiper(opts){
	this._defaults = {
		stage: ".stage",
		page: ".page",
		direction: "vertical",
		activeClass: "active",
		threshold: 50,
		duration: 300,
		loop: true,
		elastic: 3
	}

	this.options = extend(this._defaults, opts);

	this._elastic = this.options.elastic;
	this.$stage = document.querySelector(this.options.stage);
	this.$page = this.$stage.querySelectorAll(this.options.page)
	this.count = this.$page.length;
	this._width = this.$stage.offsetWidth;
	this._height = this.$stage.offsetHeight;
	this.direction = this.options.direction;

	this._start = {},
	this._move = {},
	this._end = {},
	this._offset = 0,

	this.prev = 0,
	this.current = 0,
	this.next = 0,

	this._observer = {},

	this.isMouseDown = false,

	this._init();
	this._bind();
}

Swiper.prototype = {
	_init: function (){
		var self = this;
		console.log(this.direction)
		this._setStyle();
	},
	_bind: function (){
		var self = this;
		this.$stage.addEventListener(touchstart, function (e){
			self.isMouseDown = true;
			self.$stage.style["-webkit-transition"] = "none";
			self.$stage.style.transition = "none";

	  		var touch = self.getPos(e);
	        self._start.x = touch.x;
	        self._start.y = touch.y;

		})
		
		this.$stage.addEventListener(touchmove, function (e){
			if(!self.isMouseDown){
				return;
			}
	  		var touch = self.getPos(e);
	        self._move.x = touch.x;
	        self._move.y = touch.y;

	        var distance = Math.floor((self._move.y - self._start.y)/self._elastic);
	        var transform = "translate3d(0, " + (distance-self._offset) + "px, 0)";
	        
	        if(self.direction == "horizontal"){
	        	distance = Math.floor((self._move.x - self._start.x)/self._elastic);
	        	transform = "translate3d(" + (distance-self._offset) + "px, 0, 0)";
	        }
	        
	        self.$stage.style['-webkit-transform'] = transform;
            self.$stage.style.transform = transform;

		})

		this.$stage.addEventListener(touchend, function (e){
			self.isMouseDown = false;
			var touch = self.getPos(e);
	        self._end.x = touch.x;
	        self._end.y = touch.y;
	        var distance = Math.floor((self._end.y - self._start.y)/self._elastic);
	        if(self.direction == "horizontal"){
	        	distance = Math.floor((self._end.x - self._start.x)/self._elastic);
	        }
	        if(distance > self.options.threshold){
	        	// down
	        	self.prev = self.current;
	        	if(self.current > 0){
	        		self.current--;
	        	}else{
	        		self.current = 0;
	        	}
	        }else if(distance < -self.options.threshold){
	        	// up
	        	self.prev = self.current;
	        	if(self.current < self.count-1){
	        		self.current++;
	        	}else{
	        		self.current = self.count-1;
	        	}
	        }
	        self.move(self.current);
		})

		this.$stage.addEventListener("webkitTransitionEnd", function (e){
			if (e.target !== self.$stage) {
                return false;
            }

            var cb = self._observer.moveend || noop;
            cb.apply(self, [self.prev, self.current]);
            e.preventDefault;
		})

	},
	move: function (index){
		var self = this;

		var duration = this.options.duration + "ms";

		var d = index * this._height;
		this._offset = d;
		var transform = "translate3d(0, -" + d + "px, 0)";
		if(this.direction == "horizontal"){
			d = index * this._width;
			this._offset = d;
			transform = "translate3d(-" + d + "px, 0, 0)";
		}

		this.$stage.style['-webkit-transition'] = duration;
        this.$stage.style.transition = duration;
		this.$stage.style['-webkit-transform'] = transform;
        this.$stage.style.transform = transform;
		

	},
	getPos: function (e){
		var touch = {};
        touch.target = e.changedTouches ? e.changedTouches[0].target : e.target;
        touch.x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
        touch.y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
        return touch;
	},
	_setStyle: function (){
		var self = this;

		var w = this._width;
		var h = this._height * this.count;
		if(this.direction == "horizontal"){
			w = this._width * this.count;
			h = this._height;
		}
		this.$stage.style.width = w + "px";
		this.$stage.style.height = h + "px";

		loopArray(this.$page, function (el, index){
			el.style.width = self._width + "px";
			el.style.height = self._height + "px";
			if(self.direction == "horizontal"){
				el.style.float = "left";
			}
		})
	},
	on: function (event, cb){
		var self = this;
		if(this._observer[event]){
			throw new Error("event " + event + " is already register");
		}
		if(typeof cb !== "function"){
			throw new Error("cb must be a function!");
		}
		this._observer[event] = cb;
		return this;
	}
}

function extend(obj1, obj2){
	for(var p in obj2){
		obj1[p] = obj2[p];
	}
	return obj1;
}
function loopArray(arr, cb){
	if(!arr || arr.length == 0){
		return;
	}
	for(var i = 0,len=arr.length; i<len; i++){
		var temp = arr[i];
		cb(temp, i, arr);
	}
}

function noop(){}

return Swiper;
// // // // // // // // // // // // // // // // // // // // // // 




})