package ch03;

public class Exercise04 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int pencils = 534;
		int students = 30;

		// �л� �� ���� ������ ���� ��
		int pencilesPerStudent = pencils / students;
		System.out.println(pencilesPerStudent);

		// ���� ���� ��
		int pencilsLeft = pencils - (pencilesPerStudent * 30);
		System.out.println(pencilsLeft);
	}

}
