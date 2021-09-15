package ch03;

public class Exercise04 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int pencils = 534;
		int students = 30;

		// 학생 한 명이 가지는 연필 수
		int pencilesPerStudent = pencils / students;
		System.out.println(pencilesPerStudent);

		// 남은 연필 수
		int pencilsLeft = pencils - (pencilesPerStudent * 30);
		System.out.println(pencilsLeft);
	}

}
