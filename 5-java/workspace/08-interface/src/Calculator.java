
// 인터페이스는 클래스의 특수형태
// 구현체는 없고 껍데기만 있음, 구조만 있음
public interface Calculator {
	// 추상 메서드
	// 메서드 본체(정의부분)없음
	int plus(int a, int b);

	int minus(int a, int b);

	double areaCircle(int r);
}
