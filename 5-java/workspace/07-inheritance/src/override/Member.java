package override;

// 사용자 중에서도 멤버십이 있는 사용자(쿠팡 멤버십)
public class Member extends User {
	private int point;

	// 메서드 오버라이딩(override) - 메서드를 재정의한다.
	// 메서드 시그니처(signature): 메서드명 + 매개변수(타입, 순서, 개수)
	// 부모의 메서드와 메서드 시그니처는 동일해야함
	@Override
	public void printUserInfo() {
		System.out.println(this.getId() + ", " + this.getPhone() + " : " + this.point);
	}

	public int getPoint() {
		return point;
	}

	public void setPoint(int point) {
		this.point = point;
	}
}
