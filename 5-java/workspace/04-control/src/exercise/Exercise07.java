package exercise;

import java.util.Scanner;

public class Exercise07 {
	
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		Scanner money = new Scanner(System.in);
		int result = 0;

		boolean run = true;
		
		while(run) {
			System.out.println("----------------------------");
			System.out.println("1.예금 | 2.출금 | 3잔고 | 4.종료 ");
			System.out.println("----------------------------");
			System.out.println("선택 ->");
			int con = scanner.nextInt();
			switch(con) {
				case 1: 
					System.out.println("입금할 금액을 입력하세요");
					int a = money.nextInt();
					result += a;
					System.out.println("잔액은");
					System.out.println(result);
					break;
				case 2:
					System.out.println("출금할 금액을 입력하세요");
					int b = money.nextInt();
					result -= b;
					break;
				case 3:
					System.out.println("잔액은");
					System.out.println(result);
					break;
				case 4:;
					run = false;
					break;
			}
		}
	}
}
