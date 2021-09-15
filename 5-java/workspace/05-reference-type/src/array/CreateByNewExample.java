package array;

public class CreateByNewExample {

	public static void main(String[] args) {
		int[] arrInt = new int[3];
		System.out.println(arrInt[0]);
		System.out.println(arrInt[1]);
		System.out.println(arrInt[2]);

		for (int i = 0; i < 3; i++) {
			System.out.println(arrInt[i]);
		}

		String[] arrStr = new String[3];
		System.out.println(arrStr[0]);
		System.out.println(arrStr[1]);
		System.out.println(arrStr[2]);

		// 향상된 for-문(enhanced(advanced) for loop)
		// for(요소타입 요소변수: 배열변수명){}
		for (String str : arrStr) {
			str = "test";
			System.out.println(str);
		}

		System.out.println(arrStr.length);
	}
}
