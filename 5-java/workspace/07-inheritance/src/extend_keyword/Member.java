package extend_keyword;

// 사용자 중에서도 멤버십이 있는 사용자
public class Member extends User {
	private int point;

	public int getPoint() {
		return point;
	}

	public void setPoint(int point) {
		this.point = point;
	}
}
