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

	override function create() {
		i = this;
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