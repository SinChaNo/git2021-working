package exercise;

import java.util.Scanner;

public class Exercise09 {
	public static void main(String[] args) {
		boolean run = true;

		int studentNum = 0;
		int[] scores = null;

		Scanner scanner = new Scanner(System.in);

		while (run) {
			System.out.println("--------------------------------------------------------------");
			System.out.println("1.�л��� | 2.�����Է� | 3.��������Ʈ | 4.�м� | 5.����");
			System.out.println("--------------------------------------------------------------");
			System.out.print("����> ");

			int selectNo = scanner.nextInt();

			switch (selectNo) {
			case 1:
				System.out.println("�л��� ���� �Է��ϼ���");
				scores = new int[scanner.nextInt()];
				break;
			case 2:
				for (int i = 0; i < scores.length; i++) {
					System.out.println("scores<[" + i + "]>");
					scores[i] = scanner.nextInt();
				}
				break;
			case 3:
				for (int i = 0; i < scores.length; i++) {
					System.out.println("scores<[" + i + "]>" + scores[i]);
				}

				break;
			case 4:
				int max = 0;
				int height = 0;
				for (int i = 0; i < scores.length; i++) {
					max += scores[i];
					if (height < scores[i]) {
						height = scores[i];
					}
				}
				int aver = max / scores.length;
				System.out.println("----�� ����----");
				System.out.println(max);
				System.out.println("----��������----");
				System.out.println(height);
				break;
			case 5:
				run = false;
				break;
			}
		}

		System.out.println("���α׷� ����");
	}
}
