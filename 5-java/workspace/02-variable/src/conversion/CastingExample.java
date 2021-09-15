package conversion;

public class CastingExample {

	public static void main(String[] args) {
		int intValue = 44032;
		// (변환타입) 
		// 값 손실이 없는 상태,
		// 0 ~ 2^16 - 1
		char charValue = (char) intValue;
		System.out.println(charValue);
		
		double doubleValue = 3.14;
		//값 손실 발생
		intValue = (int) doubleValue;
		System.out.println(intValue);
	}

}
