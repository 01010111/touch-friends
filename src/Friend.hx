import pixi.core.display.Container;
import js.Browser;
import zero.utilities.Timer;
import zero.utilities.Vec2;
import zero.utilities.Color;
import pixi.interaction.InteractionEvent;
import pixi.core.graphics.Graphics;

class Friend extends Graphics {
	static var PI2 = Math.PI * 2;
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
	var shadow:Graphics = new Graphics();
	var body:Container = new Container();
	var size:Vec2 = [];
	var velocity:Vec2 = [0, 0];
	var max_velocity:Float = 20;
	public function new() {
		super();
		i = this;
		colors.push(colors.shift());
		this.color = colors.last();
		this.add(body);
		body.add(bg);
		body.add(lines);
		Game.i.friends.add(this);
		update.listen('update');
	}
	function update(?dt:Float) {
		x += velocity.x * dt;
		y += velocity.y * dt;
		if (velocity.length > 0) velocity.length += (max_velocity - velocity.length) * 0.01;
		bounds();
	}
	function bounds() {
		var v = velocity.copy();
		if (x < 0) velocity.x = velocity.x.abs();
		if (x > App.i.width) velocity.x = -velocity.x.abs();
		if (y < 0) velocity.y = velocity.y.abs();
		if (y > App.i.height) velocity.y = -velocity.y.abs();
		if (!v.equals(velocity)) {
			Game.i.vibrate(5);
			scale.set(0.95);
			scale.to(0.5, { x: 1, y: 1, ease: Elastic.easeOut });
		}
		v.put();
	}
	public function draw(e:InteractionEvent) {
		Game.i.vibrate(1);
		var v1:Vec2 = [e.data.global.x, e.data.global.y];
		var v2:Vec2 = vectors.last();
		v2 != null ? draw_line(v1, v2) : draw_circle(v1);
		vectors.push(v1);
	}
	public function finish(e:InteractionEvent) {
		vectors.push([e.data.global.x, e.data.global.y]);
		draw_line(vectors.last(), vectors[0]);
		draw_shadow();
		draw_bg();
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
	function draw_shadow() {		
		shadow.fill_poly(Color.get(0, 0, 0, 0.25), vectors);
	}
	function draw_bg() {
		bg.fill_poly(Color.WHITE, vectors);
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
		var t = 0.5.get_random(0.25);
		eye.scale.to(0.5.get_random(0.3), { x: 1, y: 1, ease: Elastic.easeOut, delay: t });
		Timer.get(t, () -> Game.i.vibrate(10));
		this.add(eye);
		pos.put();
		return eye;
	}
	function animate() {
		Game.i.vibrate(10);
		velocity = [100.get_random(50), 0];
		velocity.radians = PI2.get_random();
		scale.to(0.05, { x: 1.2, y: 1.2, ease: Quad.easeOut, onComplete: () -> {
			scale.to(0.5, { x: 1, y: 1, ease: Elastic.easeOut });
		}});
		Timer.get(2.get_random(), () -> squid_to(PI2.get_random()));
	}
	function squid_to(angle:Float) {
		angle = angle % PI2;
		var diff = angle - rotation;
		if (diff.abs() > Math.PI) rotation += PI2 * diff.sign_of();
		this.to(1, { rotation: angle, ease: Sine.easeInOut });
		scale.to(0.2, { x: 1.25, y: 0.75, delay: 1, ease: Sine.easeOut });
		Timer.get(1.2, () -> {
			scale.to(1, { x: 1, y: 1, ease: Elastic.easeOut });
			var v:Vec2 = [400.get_random(200), 0];
			v.radians = rotation - Math.PI/2;
			velocity.copy_from(v);
			v.put();
			Timer.get(8.get_random(2), () -> squid_to(PI2.get_random()));
		});
	}
}