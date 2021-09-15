package ch04;

import java.util.Scanner;

public class Exercise07 {
	public static void main(String[] args) {
		boolean run = true;

		int balance = 0;

		Scanner scanner = new Scanner(System.in);

		while (run) {
			System.out.println("------------------------------");
			System.out.println(" 1.예금 | 2.출금 | 3.잔고 | 4.종료 ");
			System.out.println("------------------------------");
			System.out.println("선택 > ");

			switch (scanner.nextInt()) {
			case 1:
				// 예금
				System.out.println("예금액>");
				int add = scanner.nextInt();
				balance += add;
				break;
			case 2:
				// 출금
				System.out.println("출금액>");
				int take = scanner.nextInt();
				balance -= take;
				break;
			case 3:
				// 잔고
				System.out.println("잔고>" + balance);
				break;
			case 4:
				run = false;
				break;
			}
		}
	}
}
