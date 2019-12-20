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

	override function update(?dt:Float) {
		
	}
}