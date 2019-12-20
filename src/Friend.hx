import zero.utilities.Timer;
import zero.utilities.Vec2;
import zero.utilities.Color;
import pixi.interaction.InteractionEvent;
import pixi.core.graphics.Graphics;

class Friend extends Graphics {
	public static var i:Friend;
	public static var radius:Float = 16;
	public static var colors = [
		Color.PICO_8_RED,
		Color.PICO_8_BLUE,
		Color.PICO_8_ORANGE,
		Color.PICO_8_GREEN,
	];
	var color:Color;
	var vectors:Array<Vec2> = [];
	var bg:Graphics = new Graphics();
	var lines:Graphics = new Graphics();
	var size:Vec2 = [];
	var velocity:Vec2 = [0, 0];
	public function new() {
		super();
		i = this;
		colors.push(colors.shift());
		this.color = colors.last();
		this.add(bg);
		this.add(lines);
		Game.i.friends.add(this);
		update.listen('update');
	}
	function update(?dt:Float) {
		x += velocity.x * dt;
		y += velocity.y * dt;
		if (x < 0) velocity.x = velocity.x.abs();
		if (x > App.i.width) velocity.x = -velocity.x.abs();
		if (y < 0) velocity.y = velocity.y.abs();
		if (y > App.i.height) velocity.y = -velocity.y.abs();
	}
	public function draw(e:InteractionEvent) {
		var v1:Vec2 = [e.data.global.x, e.data.global.y];
		var v2:Vec2 = vectors.last();
		v2 != null ? draw_line(v1, v2) : draw_circle(v1);
		vectors.push(v1);
	}
	public function finish(e:InteractionEvent) {
		vectors.push([e.data.global.x, e.data.global.y]);
		draw_line(vectors.last(), vectors[0]);
		var shadow_vectors = [for (v in vectors) v.copy() + [16, 32]];
		bg.fill_poly(Color.get(0, 0, 0, 0.25), shadow_vectors);
		for (v in shadow_vectors) v.put();
		bg.fill_poly(Color.WHITE, vectors);
		set_center();
		set_size();
		clear_vectors();
		add_eyes();
		animate();
		new Friend();
	}
	function draw_circle(v:Vec2) {
		lines.fill_circle(color, v.x, v.y, radius);
	}
	function draw_line(v1:Vec2, v2:Vec2) {
		lines
			.fill_circle(color, v1.x, v1.y, radius)
			.fill_circle(color, v2.x, v2.y, radius)
			.line(color, v1.x, v1.y, v2.x, v2.y, radius * 2);
	}
	function set_center() {
		var mid:Vec2 = [0, 0];
		for (vector in vectors) mid += vector;
		mid /= vectors.length;
		position.set(mid.x, mid.y);
		pivot.set(mid.x, mid.y);
	}
	function set_size() {
		var top:Float = -9999999;
		var bottom:Float = -9999999;
		var left:Float = -9999999;
		var right:Float = -9999999;
		for (v in vectors) {
			if (top == -9999999 || top > v.y) top = v.y;
			if (bottom == -9999999 || bottom < v.y) bottom = v.y;
			if (left == -9999999 || left > v.x) left = v.x;
			if (right == -9999999 || right < v.x) right = v.x;
		}
		size = [right - left, bottom - top];
	}
	function clear_vectors() {
		for (v in vectors) v.put();
		vectors = [];
	}
	function add_eyes() {
		var eye1 = make_eye([x - size.x/6, y]);
		var eye2 = make_eye([x + size.x/6, y]);
		Timer.get(8.get_random(4), () -> {
			eye1.scale.to(0.05, { y: 0, onComplete: () -> eye1.scale.to(0.05, { y: 1 }) });
			eye2.scale.to(0.05, { y: 0, onComplete: () -> eye2.scale.to(0.05, { y: 1 }) });
		}, -1);
	}
	function make_eye(pos:Vec2):Graphics {
		var eye = new Graphics();
		var size = this.size.x.min(this.size.y).max(56);
		eye
			.fill_circle(Color.WHITE, 0, 0, size/6)
			.fill_circle(Color.BLACK, 0, 0, size/12)
			.circle(Color.BLACK, 0, 0, size/6, size/16);
		eye.position.set(pos.x, pos.y);
		eye.scale.set(0);
		eye.scale.to(0.5.get_random(0.3), { x: 1, y: 1, ease: Elastic.easeOut, delay: 0.5.get_random(0.25) });
		this.add(eye);
		pos.put();
		return eye;
	}
	function animate() {
		velocity = [0, 100.get_random(20)];
		velocity.angle = 360.get_random();
		scale.to(0.05, { x: 1.2, y: 1.2, ease: Quad.easeOut, onComplete: () -> {
			scale.to(0.5, { x: 1, y: 1, ease: Elastic.easeOut });
		}});
		this.to(0.2, { rotation: 0.2.get_random(-0.2), onComplete: () -> {
			this.to(4.get_random(1), { rotation: -rotation, ease: Sine.easeInOut, yoyo: true }).repeat(-1);
		}});
	}
}