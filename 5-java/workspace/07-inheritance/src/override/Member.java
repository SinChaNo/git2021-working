package override;

// ����� �߿����� ������� �ִ� �����(���� �����)
public class Member extends User {
	private int point;

	// �޼��� �������̵�(override) - �޼��带 �������Ѵ�.
	// �޼��� �ñ״�ó(signature): �޼���� + �Ű�����(Ÿ��, ����, ����)
	// �θ��� �޼���� �޼��� �ñ״�ó�� �����ؾ���
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
