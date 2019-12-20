import zero.utilities.Vec2;
import zero.utilities.Color;
import pixi.core.graphics.Graphics;
import pixi.core.display.Container;

class Particles extends Container {
	var particles:Array<Particle> = [];
	public function new() {
		super();
	}
	public function spawn(x:Float, y:Float, v:Vec2, s:Float) {
		get_available().spawn(x, y, v, s / 100);
	}
	function get_available():Particle {
		for (particle in particles) if (particle.alpha < 0.001) return particle;
		return make_particle();
	}
	function make_particle():Particle {
		var particle = new Particle();
		particles.push(particle);
		this.add(particle);
		return particle;
	}
}

class Particle extends Graphics {
	public function new() {
		super();
		this.fill_circle(Color.WHITE, 0, 0, 50);
		//this.circle(Color.PICO_8_BLUE, 0, 0, 50, 10);
		alpha = 0;
	}
	public function spawn(x:Float, y:Float, v:Vec2, s:Float) {
		scale.set(s.min(1));
		this.fromTo(1, { x: x, y: y, alpha: 2 }, { x: x - v.x * scale.x, y: y - v.y * scale.x, alpha: 0, ease: Expo.easeOut });
	}
}