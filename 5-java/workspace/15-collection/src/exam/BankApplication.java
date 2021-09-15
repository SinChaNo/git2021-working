package exam;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {

	// Map 여러가지 형태의 Map 가능한 타입(Inteface)
	// = HashMap
	// = HashTable
	// = TreeMap
	//
	// 대입하는 자료구조에 따라서 같은 메서드를 호출하더라도
	// 내부적인 처리방식이 다름

	// 계좌목록 Map 객체
	// Map<키타입, 값타입> 변수명 = new HashMap<키타입, 값타입>();
	private static Map<String, Account> accounts = new HashMap<String, Account>();

	private static Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {

		boolean run = true;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.계좌생성 | 2.계좌목록 | 3.예금 | 4.출금 | 5.종료");
			System.out.println("----------------------------------------------------------");
			System.out.print("선택> ");

			int selectNo = scanner.nextInt();

			if (selectNo == 1) {
				createAccount();
			} else if (selectNo == 2) {
				accountList();
			} else if (selectNo == 3) {
				deposit();
			} else if (selectNo == 4) {
				withdraw();
			} else if (selectNo == 5) {
				run = false;
			}
		}
		System.out.println("프로그램 종료");
	}

	// 계좌생성하기(계좌추가하기)
	private static void createAccount() {
		System.out.println("----------");
		System.out.println("계좌생성");
		System.out.println("----------");
		System.out.print("계좌번호> ");
		String ano = scanner.next();
		System.out.print("계좌주> ");
		String owner = scanner.next();
		System.out.print("초기입금액> ");
		int balance = scanner.nextInt();

		Account item = new Account(ano, owner, balance);
		accounts.put(ano, item);
	}

	// 계좌목록보기
	private static void accountList() {
		System.out.println("-----계좌목록 조회-----");
		for (String item : accounts.keySet()) {
			String ano = accounts.get(item).getAno();
			String owner = accounts.get(item).getOwner();
			int balance = accounts.get(item).getBalance();
			System.out.println(ano + "\t  " + owner + "\t" + balance);
		}
	}

	// 예금하기(필드값수정)
	private static void deposit() {
		System.out.print("계좌번호> ");
		String ano = scanner.next();

		if (accounts.containsKey(ano) == true) {
			System.out.print("입금금액> ");
			int add = scanner.nextInt();
			Account addcount = accounts.get(ano);
			int balance = addcount.getBalance();
			addcount.setBalance(balance + add);
			System.out.print("입금에 성공하셨습니다.");
		} else {
			System.out.println("없는 계좌번호입니다.");
		}

	}

	// 출금하기(필드값수정)
	private static void withdraw() {
		System.out.print("계좌번호> ");
		String ano = scanner.next();

		if (accounts.containsKey(ano) == true) {
			System.out.print("출금금액> ");
			int take = scanner.nextInt();
			Account addcount = accounts.get(ano);
			int balance = addcount.getBalance();
			addcount.setBalance(balance - take);
			System.out.print("출금에 성공하셨습니다.");
		} else {
			System.out.println("없는 계좌번호입니다.");
		}
	}
}