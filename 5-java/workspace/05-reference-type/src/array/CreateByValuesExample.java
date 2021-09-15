package array;

public class CreateByValuesExample {

	public static void main(String[] args) {
		int[] scores = { 83, 90, 87 };
		System.out.println(scores[0]);
		System.out.println(scores[1]);
		System.out.println(scores[2]);

		System.out.println("--------°ª º¯°æ--------");
		scores[0] = 100;
		System.out.println(scores[0]);
		System.out.println(scores[1]);
		System.out.println(scores[2]);
	}

}
