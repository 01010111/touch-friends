// Generated by Haxe 4.0.0+ef18b627e
(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var zero_utilities__$Vec4_Vec4_$Impl_$ = {};
zero_utilities__$Vec4_Vec4_$Impl_$.from_array_float = function(input) {
	return zero_utilities__$Vec4_Vec4_$Impl_$._new(input[0],input[1],input[2],input[3]);
};
zero_utilities__$Vec4_Vec4_$Impl_$._new = function(x,y,z,w) {
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var this1 = [x,y,z,w];
	return this1;
};
zero_utilities__$Vec4_Vec4_$Impl_$.get_x = function(this1) {
	return this1[0];
};
zero_utilities__$Vec4_Vec4_$Impl_$.get_y = function(this1) {
	return this1[1];
};
zero_utilities__$Vec4_Vec4_$Impl_$.get_z = function(this1) {
	return this1[2];
};
zero_utilities__$Vec4_Vec4_$Impl_$.get_w = function(this1) {
	return this1[3];
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.prototype = {
	get: function(key) {
		if(__map_reserved[key] != null) {
			return this.getReserved(key);
		}
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	,existsReserved: function(key) {
		if(this.rh == null) {
			return false;
		}
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		return HxOverrides.iter(this.arrayKeys());
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) {
			out.push(key);
		}
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) {
				out.push(key.substr(1));
			}
			}
		}
		return out;
	}
};
var zero_utilities__$Color_Color_$Impl_$ = {};
zero_utilities__$Color_Color_$Impl_$.from_array_float = function(input) {
	return zero_utilities__$Color_Color_$Impl_$._new(input[0],input[1],input[2],input[3]);
};
zero_utilities__$Color_Color_$Impl_$.from_array_int = function(input) {
	return zero_utilities__$Color_Color_$Impl_$._new(input[0],input[1],input[2],input[3]);
};
zero_utilities__$Color_Color_$Impl_$.get_red = function(this1) {
	return zero_utilities__$Vec4_Vec4_$Impl_$.get_x(this1);
};
zero_utilities__$Color_Color_$Impl_$.get_green = function(this1) {
	return zero_utilities__$Vec4_Vec4_$Impl_$.get_y(this1);
};
zero_utilities__$Color_Color_$Impl_$.get_blue = function(this1) {
	return zero_utilities__$Vec4_Vec4_$Impl_$.get_z(this1);
};
zero_utilities__$Color_Color_$Impl_$.get_alpha = function(this1) {
	return zero_utilities__$Vec4_Vec4_$Impl_$.get_w(this1);
};
zero_utilities__$Color_Color_$Impl_$._new = function(x,y,z,w) {
	if(w == null) {
		w = 0;
	}
	if(z == null) {
		z = 0;
	}
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var this1 = zero_utilities__$Vec4_Vec4_$Impl_$.from_array_float([x,y,z,w]);
	return this1;
};
var App = function() {
	var _gthis = this;
	var this1 = App.bg_color;
	PIXI.Application.call(this,{ width : window.document.documentElement.clientWidth, height : window.document.documentElement.clientHeight, backgroundColor : (Math.round(zero_utilities__$Color_Color_$Impl_$.get_red(this1) * 255) & 255) << 16 | (Math.round(zero_utilities__$Color_Color_$Impl_$.get_green(this1) * 255) & 255) << 8 | Math.round(zero_utilities__$Color_Color_$Impl_$.get_blue(this1) * 255) & 255, antialias : true, roundPixels : true, clearBeforeRender : true, forceFXAA : true, powerPreference : "high-performance", autoResize : true, legacy : false, transparent : false});
	App.i = this;
	this.width = window.document.documentElement.clientWidth;
	this.height = window.document.documentElement.clientHeight;
	zero_utilities_EventBus.listen(function(_) {
		zero_utilities_ECS.tick(_);
		return;
	},"update");
	zero_utilities_EventBus.listen(function(_1) {
		zero_utilities_SyncedSin.update(_1);
		return;
	},"update");
	zero_utilities_EventBus.listen(function(_2) {
		zero_utilities_Timer.update(_2);
		return;
	},"update");
	zero_utilities_EventBus.listen($bind(this,this.update),"update");
	window.requestAnimationFrame(UpdateManager.update);
	zero_utilities_EventBus.listen(function(_3) {
		_gthis.renderer.resize(_3.width,_3.height);
		return;
	},"resize");
	window.addEventListener("resize",function() {
		zero_utilities_EventBus.dispatch("resize",{ width : _gthis.width = window.document.documentElement.clientWidth, height : _gthis.height = window.document.documentElement.clientHeight});
		return;
	});
	window.document.body.appendChild(this.view);
	this.world = new PIXI.Container();
	this.stage.addChild(this.world);
	this.create();
};
App.main = function(start) {
	var load_assets = function() {
		var loader = new PIXI.loaders.Loader();
		loader.add(zero_extensions_ArrayExt.remove_duplicates(App.assets));
		loader.on("complete",function() {
			return start();
		});
		return loader.load();
	};
	if(App.fonts.length == 0) {
		load_assets();
	} else {
		WebFont.load({ custom : { families : App.fonts, urls : ["include/fonts.css"]}, active : load_assets});
	}
};
App.__super__ = PIXI.Application;
App.prototype = $extend(PIXI.Application.prototype,{
	create: function() {
	}
	,update: function(dt) {
	}
});
var ContainerTools = function() { };
ContainerTools.add = function(object,child) {
	object.addChild(child);
};
var DrawArea = function() {
	this.drawing = false;
	var _gthis = this;
	PIXI.Graphics.call(this);
	this.interactive = true;
	this.on("mousedown",function(e) {
		return _gthis.drawing = true;
	});
	this.on("mouseup",function(e1) {
		_gthis.stop_draw(e1);
		return;
	});
	this.on("mousemove",function(e2) {
		_gthis.draw(e2);
		return;
	});
	this.on("touchstart",function(e3) {
		_gthis.draw(e3,true);
		return;
	});
	this.on("touchmove",function(e4) {
		_gthis.draw(e4,true);
		return;
	});
	this.on("touchend",function(e5) {
		_gthis.stop_draw(e5);
		return;
	});
	this.hitArea = new PIXI.Rectangle(0,0,App.i.width,App.i.height);
	zero_utilities_EventBus.listen(function(_) {
		return _gthis.hitArea = new PIXI.Rectangle(0,0,App.i.width,App.i.height);
	},"resize");
};
DrawArea.__super__ = PIXI.Graphics;
DrawArea.prototype = $extend(PIXI.Graphics.prototype,{
	draw: function(e,force) {
		if(force == null) {
			force = false;
		}
		if(this.drawing || force) {
			Friend.i.draw(e);
		}
	}
	,stop_draw: function(e) {
		this.drawing = false;
		Friend.i.finish(e);
	}
});
var zero_utilities__$Vec2_Vec2_$Impl_$ = {};
zero_utilities__$Vec2_Vec2_$Impl_$.zero = function(n) {
	if(Math.abs(n) <= zero_utilities__$Vec2_Vec2_$Impl_$.epsilon) {
		return 0;
	} else {
		return n;
	}
};
zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float = function(input) {
	return zero_utilities__$Vec2_Vec2_$Impl_$._new(input[0],input[1]);
};
zero_utilities__$Vec2_Vec2_$Impl_$.from_array_int = function(input) {
	return zero_utilities__$Vec2_Vec2_$Impl_$._new(input[0],input[1]);
};
zero_utilities__$Vec2_Vec2_$Impl_$.get = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	if(zero_utilities__$Vec2_Vec2_$Impl_$.pool.length > 0) {
		var this1 = zero_utilities__$Vec2_Vec2_$Impl_$.pool.shift();
		var x1 = x;
		var y1 = y;
		if(y1 == null) {
			y1 = 0;
		}
		if(x1 == null) {
			x1 = 0;
		}
		this1[0] = zero_utilities__$Vec2_Vec2_$Impl_$.zero(x1);
		this1[1] = zero_utilities__$Vec2_Vec2_$Impl_$.zero(y1);
		return zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float(this1);
	} else {
		return zero_utilities__$Vec2_Vec2_$Impl_$._new(x,y);
	}
};
zero_utilities__$Vec2_Vec2_$Impl_$._new = function(x,y) {
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	var this1 = [x,y];
	return this1;
};
zero_utilities__$Vec2_Vec2_$Impl_$.get_x = function(this1) {
	return this1[0];
};
zero_utilities__$Vec2_Vec2_$Impl_$.set_x = function(this1,v) {
	return this1[0] = v;
};
zero_utilities__$Vec2_Vec2_$Impl_$.get_y = function(this1) {
	return this1[1];
};
zero_utilities__$Vec2_Vec2_$Impl_$.set_y = function(this1,v) {
	return this1[1] = v;
};
zero_utilities__$Vec2_Vec2_$Impl_$.set_radians = function(this1,v) {
	var x = Math.sqrt(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this1) * zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this1) + zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this1) * zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this1)) * Math.cos(v);
	var y = Math.sqrt(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this1) * zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this1) + zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this1) * zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this1)) * Math.sin(v);
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
	this1[0] = zero_utilities__$Vec2_Vec2_$Impl_$.zero(x);
	this1[1] = zero_utilities__$Vec2_Vec2_$Impl_$.zero(y);
	zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float(this1);
	return v;
};
zero_utilities__$Vec2_Vec2_$Impl_$.add = function(v1,v2) {
	return zero_utilities__$Vec2_Vec2_$Impl_$.get(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v1) + zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v2),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v1) + zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v2));
};
zero_utilities__$Vec2_Vec2_$Impl_$.divide_f = function(v,n) {
	return zero_utilities__$Vec2_Vec2_$Impl_$.get(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v) / n,zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v) / n);
};
var Friend = function() {
	this.particles = new Particles();
	this.released = false;
	this.max_velocity = 20;
	this.velocity = zero_utilities__$Vec2_Vec2_$Impl_$.from_array_int([0,0]);
	this.size = zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float([]);
	this.body = new PIXI.Container();
	this.shadow = new PIXI.Graphics();
	this.lines = new PIXI.Graphics();
	this.bg = new PIXI.Graphics();
	this.vectors = [];
	PIXI.Container.call(this);
	Friend.i = this;
	Friend.colors.push(Friend.colors.shift());
	var a = Friend.colors;
	this.color = a[a.length - 1];
	this.shadow.scale.set(0);
	ContainerTools.add(Game.i.shadows,this.shadow);
	ContainerTools.add(this,this.particles);
	ContainerTools.add(this,this.body);
	ContainerTools.add(this.body,this.bg);
	ContainerTools.add(this.body,this.lines);
	ContainerTools.add(Game.i.friends,this);
	zero_utilities_EventBus.listen($bind(this,this.update),"update");
};
Friend.__super__ = PIXI.Container;
Friend.prototype = $extend(PIXI.Container.prototype,{
	update: function(dt) {
		this.update_positions(dt);
		this.update_velocity(dt);
		this.update_shadow(dt);
		this.bounds(dt);
	}
	,update_positions: function(dt) {
		this.body.x += zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this.velocity) * dt;
		this.body.y += zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this.velocity) * dt;
	}
	,update_velocity: function(dt) {
		if(this.released) {
			var _g = this.velocity;
			var v = Math.sqrt(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(_g) * zero_utilities__$Vec2_Vec2_$Impl_$.get_x(_g) + zero_utilities__$Vec2_Vec2_$Impl_$.get_y(_g) * zero_utilities__$Vec2_Vec2_$Impl_$.get_y(_g));
			var this1 = this.velocity;
			var v1 = v + (this.max_velocity - Math.sqrt(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this1) * zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this1) + zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this1) * zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this1))) * 0.01;
			var x = zero_utilities__$Vec2_Vec2_$Impl_$.get_x(_g) / Math.sqrt(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(_g) * zero_utilities__$Vec2_Vec2_$Impl_$.get_x(_g) + zero_utilities__$Vec2_Vec2_$Impl_$.get_y(_g) * zero_utilities__$Vec2_Vec2_$Impl_$.get_y(_g));
			var y = zero_utilities__$Vec2_Vec2_$Impl_$.get_y(_g) / Math.sqrt(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(_g) * zero_utilities__$Vec2_Vec2_$Impl_$.get_x(_g) + zero_utilities__$Vec2_Vec2_$Impl_$.get_y(_g) * zero_utilities__$Vec2_Vec2_$Impl_$.get_y(_g));
			if(y == null) {
				y = 0;
			}
			if(x == null) {
				x = 0;
			}
			_g[0] = zero_utilities__$Vec2_Vec2_$Impl_$.zero(x);
			_g[1] = zero_utilities__$Vec2_Vec2_$Impl_$.zero(y);
			zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float(_g);
			var x1 = zero_utilities__$Vec2_Vec2_$Impl_$.get_x(_g) * v1;
			var y1 = zero_utilities__$Vec2_Vec2_$Impl_$.get_y(_g) * v1;
			if(y1 == null) {
				y1 = 0;
			}
			if(x1 == null) {
				x1 = 0;
			}
			_g[0] = zero_utilities__$Vec2_Vec2_$Impl_$.zero(x1);
			_g[1] = zero_utilities__$Vec2_Vec2_$Impl_$.zero(y1);
			zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float(_g);
		}
	}
	,update_shadow: function(dt) {
		this.shadow.position.set(this.body.x + zero_utilities__$Vec2_Vec2_$Impl_$.get_x(Friend.shadow_offset),this.body.y + zero_utilities__$Vec2_Vec2_$Impl_$.get_y(Friend.shadow_offset));
		this.shadow.rotation = this.body.rotation;
		if(!this.released) {
			return;
		}
		this.shadow.scale.x += (this.body.scale.x - this.shadow.scale.x) * 0.1;
		this.shadow.scale.y += (this.body.scale.y - this.shadow.scale.y) * 0.1;
	}
	,bounds: function(dt) {
		var this1 = this.velocity;
		var v = zero_utilities__$Vec2_Vec2_$Impl_$.get(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this1),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this1));
		if(this.body.x < 0) {
			zero_utilities__$Vec2_Vec2_$Impl_$.set_x(this.velocity,Math.abs(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this.velocity)));
		}
		if(this.body.x > App.i.width) {
			zero_utilities__$Vec2_Vec2_$Impl_$.set_x(this.velocity,-Math.abs(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this.velocity)));
		}
		if(this.body.y < 0) {
			zero_utilities__$Vec2_Vec2_$Impl_$.set_y(this.velocity,Math.abs(zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this.velocity)));
		}
		if(this.body.y > App.i.height) {
			zero_utilities__$Vec2_Vec2_$Impl_$.set_y(this.velocity,-Math.abs(zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this.velocity)));
		}
		var v1 = this.velocity;
		if(!(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v) == zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v1) && zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v) == zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v1))) {
			Game.i.vibrate(5);
			this.body.scale.set(0.95);
			TweenMax.to(this.body.scale,0.5,{ x : 1, y : 1, ease : Elastic.easeOut});
		}
		zero_utilities__$Vec2_Vec2_$Impl_$.pool.push(zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float(v));
		v = null;
	}
	,draw: function(e) {
		Game.i.vibrate(1);
		var v1 = zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float([e.data.global.x,e.data.global.y]);
		var a = this.vectors;
		var v2 = a[a.length - 1];
		if(v2 != null) {
			this.draw_line(v1,v2);
		} else {
			this.draw_circle(v1);
		}
		this.vectors.push(v1);
	}
	,finish: function(e) {
		this.released = true;
		this.vectors.push(zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float([e.data.global.x,e.data.global.y]));
		var a = this.vectors;
		this.draw_line(a[a.length - 1],this.vectors[0]);
		this.draw_bg();
		this.set_center();
		this.set_size();
		this.clear_vectors();
		this.add_face();
		this.animate();
		new Friend();
	}
	,draw_circle: function(v) {
		GraphicsTools.fill_circle(this.lines,this.color,zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v),Friend.radius);
		GraphicsTools.fill_circle(this.shadow,zero_utilities__$Color_Color_$Impl_$.BLACK,zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v),Friend.radius);
	}
	,draw_line: function(v1,v2) {
		GraphicsTools.line(GraphicsTools.fill_circle(GraphicsTools.fill_circle(this.lines,this.color,zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v1),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v1),Friend.radius),this.color,zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v2),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v2),Friend.radius),this.color,zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v1),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v1),zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v2),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v2),Friend.radius * 2);
		GraphicsTools.line(GraphicsTools.fill_circle(GraphicsTools.fill_circle(this.shadow,zero_utilities__$Color_Color_$Impl_$.BLACK,zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v1),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v1),Friend.radius),zero_utilities__$Color_Color_$Impl_$.BLACK,zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v2),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v2),Friend.radius),zero_utilities__$Color_Color_$Impl_$.BLACK,zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v1),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v1),zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v2),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v2),Friend.radius * 2);
	}
	,draw_bg: function() {
		GraphicsTools.fill_poly(this.bg,zero_utilities__$Color_Color_$Impl_$.WHITE,this.vectors);
		GraphicsTools.fill_poly(this.shadow,zero_utilities__$Color_Color_$Impl_$.BLACK,this.vectors);
	}
	,set_center: function() {
		var mid = zero_utilities__$Vec2_Vec2_$Impl_$.from_array_int([0,0]);
		var _g = 0;
		var _g1 = this.vectors;
		while(_g < _g1.length) {
			var vector = _g1[_g];
			++_g;
			mid = zero_utilities__$Vec2_Vec2_$Impl_$.add(mid,vector);
		}
		mid = zero_utilities__$Vec2_Vec2_$Impl_$.divide_f(mid,this.vectors.length);
		this.body.position.set(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(mid),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(mid));
		this.body.pivot.set(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(mid),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(mid));
		this.shadow.pivot.set(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(mid),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(mid));
	}
	,set_size: function() {
		var top = -9999999;
		var bottom = -9999999;
		var left = -9999999;
		var right = -9999999;
		var _g = 0;
		var _g1 = this.vectors;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			if(top == -9999999 || top > zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v)) {
				top = zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v);
			}
			if(bottom == -9999999 || bottom < zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v)) {
				bottom = zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v);
			}
			if(left == -9999999 || left > zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v)) {
				left = zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v);
			}
			if(right == -9999999 || right < zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v)) {
				right = zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v);
			}
		}
		this.size = zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float([right - left,bottom - top]);
	}
	,clear_vectors: function() {
		var _g = 0;
		var _g1 = this.vectors;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			zero_utilities__$Vec2_Vec2_$Impl_$.pool.push(zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float(v));
			v = null;
		}
		this.vectors = [];
	}
	,add_face: function() {
		var eye1 = this.make_eye(zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float([this.body.x - zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this.size) / 6,this.body.y]));
		var eye2 = this.make_eye(zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float([this.body.x + zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this.size) / 6,this.body.y]));
		var min = 4;
		var max = null;
		if(min == null) {
			min = 0;
		}
		zero_utilities_Timer.get(min + Math.random() * ((max == null ? 8 : max) - min),function() {
			TweenMax.to(eye1.scale,0.05,{ y : 0, onComplete : function() {
				return TweenMax.to(eye1.scale,0.05,{ y : 1});
			}});
			return TweenMax.to(eye2.scale,0.05,{ y : 0, onComplete : function() {
				return TweenMax.to(eye2.scale,0.05,{ y : 1});
			}});
		},-1);
	}
	,make_eye: function(pos) {
		var eye = new PIXI.Graphics();
		var size = Math.max(Math.min(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(this.size),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(this.size)),56);
		GraphicsTools.circle(GraphicsTools.fill_circle(GraphicsTools.fill_circle(eye,zero_utilities__$Color_Color_$Impl_$.WHITE,0,0,size / 6),zero_utilities__$Color_Color_$Impl_$.BLACK,0,0,size / 12),zero_utilities__$Color_Color_$Impl_$.BLACK,0,0,size / 6,size / 16);
		eye.position.set(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(pos),zero_utilities__$Vec2_Vec2_$Impl_$.get_y(pos));
		eye.scale.set(0);
		var min = 0.25;
		var max = null;
		if(min == null) {
			min = 0;
		}
		var t = min + Math.random() * ((max == null ? 0.5 : max) - min);
		var min1 = 0.3;
		var max1 = null;
		if(min1 == null) {
			min1 = 0;
		}
		TweenMax.to(eye.scale,min1 + Math.random() * ((max1 == null ? 0.5 : max1) - min1),{ x : 1, y : 1, ease : Elastic.easeOut, delay : t});
		zero_utilities_Timer.get(t,function() {
			Game.i.vibrate(10);
			return;
		});
		ContainerTools.add(this.body,eye);
		zero_utilities__$Vec2_Vec2_$Impl_$.pool.push(zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float(pos));
		pos = null;
		return eye;
	}
	,animate: function() {
		var _gthis = this;
		Game.i.vibrate(10);
		var min = 50;
		var max = null;
		if(min == null) {
			min = 0;
		}
		this.velocity = zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float([min + Math.random() * ((max == null ? 100 : max) - min),0]);
		var def_max = Util.PI2;
		var max1 = null;
		zero_utilities__$Vec2_Vec2_$Impl_$.set_radians(this.velocity,Math.random() * (max1 == null ? def_max : max1));
		TweenMax.to(this.body.scale,0.05,{ x : 1.2, y : 1.2, ease : Quad.easeOut, onComplete : function() {
			return TweenMax.to(_gthis.body.scale,0.5,{ x : 1, y : 1, ease : Elastic.easeOut});
		}});
		var max2 = null;
		zero_utilities_Timer.get(Math.random() * (max2 == null ? 2 : max2),function() {
			var def_max1 = Util.PI2;
			var max3 = null;
			var tmp = Math.random();
			_gthis.squid_to(tmp * (max3 == null ? def_max1 : max3));
			return;
		});
	}
	,squid_to: function(angle) {
		var _gthis = this;
		angle %= Util.PI2;
		var diff = angle - this.body.rotation;
		if(Math.abs(diff) > Math.PI) {
			this.body.rotation += Util.PI2 * (diff > 0 ? 1 : diff < 0 ? -1 : 0);
		}
		TweenMax.to(this.body,1,{ rotation : angle, ease : Sine.easeInOut});
		TweenMax.to(this.body.scale,0.2,{ x : 1.25, y : 0.75, delay : 1, ease : Sine.easeOut});
		zero_utilities_Timer.get(1.2,function() {
			TweenMax.to(_gthis.body.scale,1,{ x : 1, y : 1, ease : Elastic.easeOut});
			var min = 200;
			var max = null;
			if(min == null) {
				min = 0;
			}
			var v = zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float([min + Math.random() * ((max == null ? 400 : max) - min),0]);
			zero_utilities__$Vec2_Vec2_$Impl_$.set_radians(v,_gthis.body.rotation - Math.PI / 2);
			var this1 = _gthis.velocity;
			var x = zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v);
			var y = zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v);
			if(y == null) {
				y = 0;
			}
			if(x == null) {
				x = 0;
			}
			this1[0] = zero_utilities__$Vec2_Vec2_$Impl_$.zero(x);
			this1[1] = zero_utilities__$Vec2_Vec2_$Impl_$.zero(y);
			zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float(this1);
			zero_utilities__$Vec2_Vec2_$Impl_$.pool.push(zero_utilities__$Vec2_Vec2_$Impl_$.from_array_float(v));
			v = null;
			_gthis.particles.spawn(_gthis.body.x,_gthis.body.y,_gthis.velocity,zero_utilities__$Vec2_Vec2_$Impl_$.get_x(_gthis.size) / 2);
			var min1 = 2;
			var max1 = null;
			if(min1 == null) {
				min1 = 0;
			}
			return zero_utilities_Timer.get(min1 + Math.random() * ((max1 == null ? 8 : max1) - min1),function() {
				var def_max = Util.PI2;
				var max2 = null;
				var tmp = Math.random();
				_gthis.squid_to(tmp * (max2 == null ? def_max : max2));
				return;
			});
		});
	}
});
var Game = function() {
	this.shadows = new PIXI.Container();
	this.friends = new PIXI.Container();
	App.call(this);
};
Game.main = function() {
	App.assets = [];
	App.fonts = [];
	App.bg_color = zero_utilities__$Color_Color_$Impl_$.PICO_8_WHITE;
	App.main(function() {
		return new Game();
	});
};
Game.__super__ = App;
Game.prototype = $extend(App.prototype,{
	create: function() {
		Game.i = this;
		var screen = new PIXI.Graphics();
		GraphicsTools.fill_rect(screen,zero_utilities__$Color_Color_$Impl_$.PICO_8_WHITE,0,0,1,1);
		screen.scale.set(App.i.width,App.i.height);
		zero_utilities_EventBus.listen(function(_) {
			screen.scale.set(App.i.width,App.i.height);
			return;
		},"resize");
		screen.alpha = 0.75;
		ContainerTools.add(this.world,this.shadows);
		ContainerTools.add(this.world,screen);
		ContainerTools.add(this.world,this.friends);
		new Friend();
		ContainerTools.add(this.world,new DrawArea());
	}
	,vibrate: function(amt,amts) {
		if(amt == null && amts == null) {
			return;
		}
		if(window.navigator.vibrate == null) {
			return;
		}
		if(amt != null) {
			window.navigator.vibrate(amt);
		}
		if(amts != null) {
			window.navigator.vibrate(amts);
		}
	}
});
var GraphicsTools = function() { };
GraphicsTools.fill_circle = function(graphic,color,x,y,radius) {
	graphic.beginFill((Math.round(zero_utilities__$Color_Color_$Impl_$.get_red(color) * 255) & 255) << 16 | (Math.round(zero_utilities__$Color_Color_$Impl_$.get_green(color) * 255) & 255) << 8 | Math.round(zero_utilities__$Color_Color_$Impl_$.get_blue(color) * 255) & 255,zero_utilities__$Color_Color_$Impl_$.get_alpha(color));
	graphic.drawCircle(x,y,radius);
	graphic.endFill();
	return graphic;
};
GraphicsTools.fill_rect = function(graphic,color,x,y,width,height,radius) {
	if(radius == null) {
		radius = 0;
	}
	graphic.beginFill((Math.round(zero_utilities__$Color_Color_$Impl_$.get_red(color) * 255) & 255) << 16 | (Math.round(zero_utilities__$Color_Color_$Impl_$.get_green(color) * 255) & 255) << 8 | Math.round(zero_utilities__$Color_Color_$Impl_$.get_blue(color) * 255) & 255,zero_utilities__$Color_Color_$Impl_$.get_alpha(color));
	graphic.drawRoundedRect(x,y,width,height,radius);
	graphic.endFill();
	return graphic;
};
GraphicsTools.fill_poly = function(graphic,color,path) {
	graphic.beginFill((Math.round(zero_utilities__$Color_Color_$Impl_$.get_red(color) * 255) & 255) << 16 | (Math.round(zero_utilities__$Color_Color_$Impl_$.get_green(color) * 255) & 255) << 8 | Math.round(zero_utilities__$Color_Color_$Impl_$.get_blue(color) * 255) & 255,zero_utilities__$Color_Color_$Impl_$.get_alpha(color));
	var _path = [];
	var _g = 0;
	while(_g < path.length) {
		var v = path[_g];
		++_g;
		_path.push(zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v));
		_path.push(zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v));
	}
	graphic.drawPolygon(_path);
	graphic.endFill();
	return graphic;
};
GraphicsTools.circle = function(graphic,color,x,y,radius,line_width,alignment) {
	if(alignment == null) {
		alignment = 0.5;
	}
	if(line_width == null) {
		line_width = 1;
	}
	graphic.lineStyle(line_width,(Math.round(zero_utilities__$Color_Color_$Impl_$.get_red(color) * 255) & 255) << 16 | (Math.round(zero_utilities__$Color_Color_$Impl_$.get_green(color) * 255) & 255) << 8 | Math.round(zero_utilities__$Color_Color_$Impl_$.get_blue(color) * 255) & 255,zero_utilities__$Color_Color_$Impl_$.get_alpha(color),alignment);
	graphic.drawCircle(x,y,radius);
	graphic.lineStyle();
	return graphic;
};
GraphicsTools.line = function(graphic,color,p0x,p0y,p1x,p1y,thickness,alignment) {
	if(alignment == null) {
		alignment = 0.5;
	}
	if(thickness == null) {
		thickness = 1;
	}
	graphic.lineStyle(thickness,(Math.round(zero_utilities__$Color_Color_$Impl_$.get_red(color) * 255) & 255) << 16 | (Math.round(zero_utilities__$Color_Color_$Impl_$.get_green(color) * 255) & 255) << 8 | Math.round(zero_utilities__$Color_Color_$Impl_$.get_blue(color) * 255) & 255,zero_utilities__$Color_Color_$Impl_$.get_alpha(color),alignment);
	graphic.moveTo(p0x,p0y);
	graphic.lineTo(p1x,p1y);
	graphic.lineStyle();
	return graphic;
};
var HxOverrides = function() { };
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Particles = function() {
	this.particles = [];
	PIXI.Container.call(this);
};
Particles.__super__ = PIXI.Container;
Particles.prototype = $extend(PIXI.Container.prototype,{
	spawn: function(x,y,v,s) {
		this.get_available().spawn(x,y,v,s / 100);
	}
	,get_available: function() {
		var _g = 0;
		var _g1 = this.particles;
		while(_g < _g1.length) {
			var particle = _g1[_g];
			++_g;
			if(particle.alpha < 0.001) {
				return particle;
			}
		}
		return this.make_particle();
	}
	,make_particle: function() {
		var particle = new Particle();
		this.particles.push(particle);
		ContainerTools.add(this,particle);
		return particle;
	}
});
var Particle = function() {
	PIXI.Graphics.call(this);
	GraphicsTools.fill_circle(this,zero_utilities__$Color_Color_$Impl_$.WHITE,0,0,50);
	this.alpha = 0;
};
Particle.__super__ = PIXI.Graphics;
Particle.prototype = $extend(PIXI.Graphics.prototype,{
	spawn: function(x,y,v,s) {
		this.scale.set(Math.min(s,1));
		var tmp = x - zero_utilities__$Vec2_Vec2_$Impl_$.get_x(v) * this.scale.x;
		var tmp1 = y - zero_utilities__$Vec2_Vec2_$Impl_$.get_y(v) * this.scale.x;
		TweenMax.fromTo(this,1,{ x : x, y : y, alpha : 2},{ x : tmp, y : tmp1, alpha : 0, ease : Expo.easeOut});
	}
});
var UpdateManager = function() { };
UpdateManager.update = function(time) {
	var dt = UpdateManager.get_dt(time);
	zero_utilities_EventBus.dispatch("update",dt);
	window.requestAnimationFrame(UpdateManager.update);
};
UpdateManager.get_dt = function(time) {
	var out = (time - UpdateManager.last) / 1000;
	UpdateManager.last = time;
	return out;
};
var Util = function() { };
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.prototype = {
	get: function(key) {
		return this.h[key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) this.h.hasOwnProperty(key) ? a.push(key | 0) : null;
		return HxOverrides.iter(a);
	}
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
haxe_ds_ObjectMap.prototype = {
	get: function(key) {
		return this.h[key.__id__];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return HxOverrides.iter(a);
	}
};
var haxe_iterators_MapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys();
};
haxe_iterators_MapKeyValueIterator.prototype = {
	hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		return { value : this.map.get(key), key : key};
	}
};
var zero_extensions_ArrayExt = function() { };
zero_extensions_ArrayExt.remove_duplicates = function(arr) {
	var unique = [];
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(unique.indexOf(item) < 0) {
			unique.push(item);
		}
	}
	arr = unique;
	return arr;
};
var zero_utilities_ECS = function() { };
zero_utilities_ECS.tick = function(dt) {
	if(dt == null) {
		dt = 0;
	}
	var _g = [];
	var s = zero_utilities_ECS.SYSTEMS.keys();
	while(s.hasNext()) {
		var s1 = s.next();
		_g.push(s1);
	}
	var systems = _g;
	systems.sort(function(s11,s2) {
		if(s11.priority > s2.priority) {
			return -1;
		} else {
			return 1;
		}
	});
	var _g1 = 0;
	while(_g1 < systems.length) {
		var system = systems[_g1];
		++_g1;
		system.update(dt,zero_utilities_ECS.get_matching_entities(zero_utilities_ECS.SYSTEMS.h[system.__id__]));
	}
};
zero_utilities_ECS.get_matching_entities = function(components) {
	var out = [];
	var _g = new haxe_iterators_MapKeyValueIterator(zero_utilities_ECS.ENTITIES);
	while(_g.hasNext()) {
		var _g1 = _g.next();
		var name = _g1.key;
		var id = _g1.value;
		var add = true;
		var _g2 = 0;
		while(_g2 < components.length) {
			var component = components[_g2];
			++_g2;
			var tmp;
			var _this = zero_utilities_ECS.COMPONENTS;
			if(!(!(__map_reserved[component] != null ? _this.existsReserved(component) : _this.h.hasOwnProperty(component)))) {
				var _this1 = zero_utilities_ECS.COMPONENTS;
				tmp = !(__map_reserved[component] != null ? _this1.getReserved(component) : _this1.h[component]).h.hasOwnProperty(id);
			} else {
				tmp = true;
			}
			if(tmp) {
				add = false;
			}
		}
		if(add) {
			out.push(name);
		}
	}
	return out;
};
var zero_utilities_System = function(priority) {
	if(priority == null) {
		priority = 0;
	}
	this.priority = priority;
};
zero_utilities_System.prototype = {
	update: function(dt,entities) {
	}
};
var zero_utilities_EventBus = function() { };
zero_utilities_EventBus.dispatch = function(name,data) {
	var _this = zero_utilities_EventBus.listeners;
	if(!(__map_reserved[name] != null ? _this.existsReserved(name) : _this.h.hasOwnProperty(name))) {
		return;
	}
	var _g = 0;
	var _this1 = zero_utilities_EventBus.listeners;
	var _g1 = __map_reserved[name] != null ? _this1.getReserved(name) : _this1.h[name];
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		if(listener != null) {
			listener(data);
		}
	}
};
zero_utilities_EventBus.listen = function(listener,name) {
	var _this = zero_utilities_EventBus.listeners;
	if(!(__map_reserved[name] != null ? _this.existsReserved(name) : _this.h.hasOwnProperty(name))) {
		var _this1 = zero_utilities_EventBus.listeners;
		var value = [];
		if(__map_reserved[name] != null) {
			_this1.setReserved(name,value);
		} else {
			_this1.h[name] = value;
		}
	}
	var _this2 = zero_utilities_EventBus.listeners;
	(__map_reserved[name] != null ? _this2.getReserved(name) : _this2.h[name]).push(listener);
};
var zero_utilities_SyncedSin = function() { };
zero_utilities_SyncedSin.update = function(dt) {
	zero_utilities_SyncedSin.counter = (zero_utilities_SyncedSin.counter + dt) % 1;
};
var zero_utilities_Timer = function() {
};
zero_utilities_Timer.get = function(time,fn,repeat) {
	if(repeat == null) {
		repeat = 1;
	}
	var timer = zero_utilities_Timer.pool.length > 0 ? zero_utilities_Timer.pool.shift() : new zero_utilities_Timer();
	timer.time = time;
	timer.fn = fn;
	timer.repeat = repeat;
	timer.paused = false;
	timer.elapsed = 0;
	zero_utilities_Timer.timers.push(timer);
	return timer;
};
zero_utilities_Timer.update = function(dt) {
	var _g = 0;
	var _g1 = zero_utilities_Timer.timers;
	while(_g < _g1.length) {
		var timer = _g1[_g];
		++_g;
		timer.run(dt);
	}
};
zero_utilities_Timer.prototype = {
	cancel: function() {
		if(HxOverrides.remove(zero_utilities_Timer.timers,this)) {
			zero_utilities_Timer.pool.push(this);
		}
	}
	,run: function(dt) {
		if(this.paused) {
			return;
		}
		this.elapsed += dt;
		if(this.time - this.elapsed > zero_utilities_Timer.epsilon) {
			return;
		}
		this.fn();
		this.elapsed = 0;
		this.repeat--;
		if(this.repeat != 0) {
			return;
		}
		this.cancel();
	}
};
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
var __map_reserved = {};
haxe_ds_ObjectMap.count = 0;
zero_utilities__$Color_Color_$Impl_$.WHITE = zero_utilities__$Color_Color_$Impl_$.from_array_int([1,1,1,1]);
zero_utilities__$Color_Color_$Impl_$.BLACK = zero_utilities__$Color_Color_$Impl_$.from_array_int([0,0,0,1]);
zero_utilities__$Color_Color_$Impl_$.PICO_8_WHITE = zero_utilities__$Color_Color_$Impl_$.from_array_float([1,0.945098039215686248,0.909803921568627438,1]);
zero_utilities__$Color_Color_$Impl_$.PICO_8_RED = zero_utilities__$Color_Color_$Impl_$.from_array_float([1,0,0.301960784313725472,1]);
zero_utilities__$Color_Color_$Impl_$.PICO_8_ORANGE = zero_utilities__$Color_Color_$Impl_$.from_array_float([1,0.639215686274509753,0,1]);
zero_utilities__$Color_Color_$Impl_$.PICO_8_GREEN = zero_utilities__$Color_Color_$Impl_$.from_array_float([0,0.894117647058823573,0.211764705882352938,1]);
zero_utilities__$Color_Color_$Impl_$.PICO_8_BLUE = zero_utilities__$Color_Color_$Impl_$.from_array_float([0.160784313725490208,0.67843137254901964,1,1]);
App.fonts = [];
App.assets = [];
App.bg_color = zero_utilities__$Color_Color_$Impl_$.BLACK;
zero_utilities__$Vec2_Vec2_$Impl_$.epsilon = 1e-8;
zero_utilities__$Vec2_Vec2_$Impl_$.pool = [];
Friend.radius = 16;
Friend.shadow_offset = zero_utilities__$Vec2_Vec2_$Impl_$.from_array_int([24,40]);
Friend.colors = [zero_utilities__$Color_Color_$Impl_$.PICO_8_RED,zero_utilities__$Color_Color_$Impl_$.PICO_8_BLUE,zero_utilities__$Color_Color_$Impl_$.PICO_8_ORANGE,zero_utilities__$Color_Color_$Impl_$.PICO_8_GREEN];
UpdateManager.last = 0.0;
Util.PI2 = Math.PI * 2;
zero_utilities_ECS.ENTITIES = new haxe_ds_StringMap();
zero_utilities_ECS.COMPONENTS = new haxe_ds_StringMap();
zero_utilities_ECS.SYSTEMS = new haxe_ds_ObjectMap();
zero_utilities_EventBus.listeners = new haxe_ds_StringMap();
zero_utilities_SyncedSin.counter = 0.0;
zero_utilities_Timer.timers = [];
zero_utilities_Timer.pool = [];
zero_utilities_Timer.epsilon = 1e-8;
Game.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
