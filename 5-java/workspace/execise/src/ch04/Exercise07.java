package ch04;

import java.util.Scanner;

public class Exercise07 {
	public static void main(String[] args) {
		boolean run = true;

		int balance = 0;

		Scanner scanner = new Scanner(System.in);

		while (run) {
			System.out.println("------------------------------");
			System.out.println(" 1.���� | 2.��� | 3.�ܰ� | 4.���� ");
			System.out.println("------------------------------");
			System.out.println("���� > ");

			switch (scanner.nextInt()) {
			case 1:
				// ����
				System.out.println("���ݾ�>");
				int add = scanner.nextInt();
				balance += add;
				break;
			case 2:
				// ���
				System.out.println("��ݾ�>");
				int take = scanner.nextInt();
				balance -= take;
				break;
			case 3:
				// �ܰ�
				System.out.println("�ܰ�>" + balance);
				break;
			case 4:
				run = false;
				break;
			}
		}
	}
}
