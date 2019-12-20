import pixi.core.graphics.Graphics;
import pixi.filters.blur.BlurFilter;
import js.Browser;
import zero.utilities.Color;
import pixi.core.display.Container;
import App;

class Game extends App {

	public static var i:Game;

	static function main() {
		App.assets = [
			// list assets here!
		];
		App.fonts = [
			// liste font family names here!
		];
		App.bg_color = Color.PICO_8_WHITE;
		App.main(() -> new Game());
	}

	public var friends:Container = new Container();
	public var shadows:Container = new Container();

	override function create() {
		i = this;
		var screen = new Graphics();
		screen.fill_rect(Color.PICO_8_WHITE, 0, 0, 1, 1);
		screen.scale.set(App.i.width, App.i.height);
		((?_) -> screen.scale.set(App.i.width, App.i.height)).listen('resize');
		screen.alpha = 0.75;
		world.add(shadows);
		world.add(screen);
		world.add(friends);
		new Friend();
		world.add(new DrawArea());
	}

	public function vibrate(?amt:Int, ?amts:Array<Int>) {
		if (amt == null && amts == null) return;
		if (Browser.window.navigator.vibrate == null) return;
		if (amt != null) Browser.window.navigator.vibrate(amt);
		if (amts != null) Browser.window.navigator.vibrate(amts);
	}
}