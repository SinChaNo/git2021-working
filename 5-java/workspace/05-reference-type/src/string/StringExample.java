package string;

public class StringExample {
	public static void main(String[] args) {
		String name1 = "SinChaNo";
		String name2 = "SinChaNo";
		System.out.println(name1 == name2);

		String name4 = new String("SinChaNo");
		String name5 = new String("SinChaNo");
		System.out.println(name4 == name5);
		System.out.println(name4.equals(name5));

		System.out.println();
	}
}
