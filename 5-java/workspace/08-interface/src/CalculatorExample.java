
public class CalculatorExample {

	public static void main(String[] args) {
		// �������̽��� ��ü�� ������ �� ����.
//		Calculator c = new Calculator();
		Calculator c = new CalculatorMock();

		System.out.println(c.plus(5, 10));
		System.out.println(c.minus(5, 10));
		System.out.println(c.areaCircle(5));
	}
}
