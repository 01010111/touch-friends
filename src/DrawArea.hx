import pixi.core.math.shapes.Rectangle;
import pixi.interaction.InteractionEvent;
import js.html.MouseEvent;
import pixi.core.graphics.Graphics;

class DrawArea extends Graphics {
	var drawing:Bool = false;
	public function new() {
		super();
		interactive = true;
		on('mousedown', (e) -> drawing = true);
		on('mouseup', (e) -> stop_draw(e));
		//on('mouseout', (e) -> stop_draw(e));
		on('mousemove', (e) -> draw(e));
		on('touchstart', (e) -> draw(e, true));
		on('touchmove', (e) -> draw(e, true));
		on('touchend', (e) -> stop_draw(e));
		hitArea = new Rectangle(0, 0, App.i.width, App.i.height);
		((?_) -> hitArea = new Rectangle(0, 0, App.i.width, App.i.height)).listen('resize');
	}
	function draw(e:InteractionEvent, force:Bool = false) {
		if (drawing || force) Friend.i.draw(e);
	}
	function stop_draw(e:InteractionEvent) {
		drawing = false;
		Friend.i.finish(e);
	}
}