
public class CalculatorExample {

	public static void main(String[] args) {
		// 인터페이스는 객체를 생성할 수 없다.
//		Calculator c = new Calculator();
		Calculator c = new CalculatorMock();

		System.out.println(c.plus(5, 10));
		System.out.println(c.minus(5, 10));
		System.out.println(c.areaCircle(5));
	}
}
