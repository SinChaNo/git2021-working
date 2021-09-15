package ch04;

public class Exercise04 {
	public static void main(String[] args) {
		boolean run = true;

		while (run) {
			double random1 = Math.random();
			double random2 = Math.random();
			int dice1 = (int) (random1 * 10);
			int dice2 = (int) (random2 * 10);
			System.out.println(dice1 + ", " + dice2);
			if ((dice1 + dice2) == 5) {
				run = false;
			}
		}
	}
}
