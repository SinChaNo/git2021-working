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
			System.out.println("1.���� | 2.��� | 3�ܰ� | 4.���� ");
			System.out.println("----------------------------");
			System.out.println("���� ->");
			int con = scanner.nextInt();
			switch(con) {
				case 1: 
					System.out.println("�Ա��� �ݾ��� �Է��ϼ���");
					int a = money.nextInt();
					result += a;
					System.out.println("�ܾ���");
					System.out.println(result);
					break;
				case 2:
					System.out.println("����� �ݾ��� �Է��ϼ���");
					int b = money.nextInt();
					result -= b;
					break;
				case 3:
					System.out.println("�ܾ���");
					System.out.println(result);
					break;
				case 4:;
					run = false;
					break;
			}
		}
	}
}
