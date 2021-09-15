package exam;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class BankApplication {

	// Map �������� ������ Map ������ Ÿ��(Inteface)
	// = HashMap
	// = HashTable
	// = TreeMap
	//
	// �����ϴ� �ڷᱸ���� ���� ���� �޼��带 ȣ���ϴ���
	// �������� ó������� �ٸ�

	// ���¸�� Map ��ü
	// Map<ŰŸ��, ��Ÿ��> ������ = new HashMap<ŰŸ��, ��Ÿ��>();
	private static Map<String, Account> accounts = new HashMap<String, Account>();

	private static Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {

		boolean run = true;
		while (run) {
			System.out.println("----------------------------------------------------------");
			System.out.println("1.���»��� | 2.���¸�� | 3.���� | 4.��� | 5.����");
			System.out.println("----------------------------------------------------------");
			System.out.print("����> ");

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
		System.out.println("���α׷� ����");
	}

	// ���»����ϱ�(�����߰��ϱ�)
	private static void createAccount() {
		System.out.println("----------");
		System.out.println("���»���");
		System.out.println("----------");
		System.out.print("���¹�ȣ> ");
		String ano = scanner.next();
		System.out.print("������> ");
		String owner = scanner.next();
		System.out.print("�ʱ��Աݾ�> ");
		int balance = scanner.nextInt();

		Account item = new Account(ano, owner, balance);
		accounts.put(ano, item);
	}

	// ���¸�Ϻ���
	private static void accountList() {
		System.out.println("-----���¸�� ��ȸ-----");
		for (String item : accounts.keySet()) {
			String ano = accounts.get(item).getAno();
			String owner = accounts.get(item).getOwner();
			int balance = accounts.get(item).getBalance();
			System.out.println(ano + "\t  " + owner + "\t" + balance);
		}
	}

	// �����ϱ�(�ʵ尪����)
	private static void deposit() {
		System.out.print("���¹�ȣ> ");
		String ano = scanner.next();

		if (accounts.containsKey(ano) == true) {
			System.out.print("�Աݱݾ�> ");
			int add = scanner.nextInt();
			Account addcount = accounts.get(ano);
			int balance = addcount.getBalance();
			addcount.setBalance(balance + add);
			System.out.print("�Աݿ� �����ϼ̽��ϴ�.");
		} else {
			System.out.println("���� ���¹�ȣ�Դϴ�.");
		}

	}

	// ����ϱ�(�ʵ尪����)
	private static void withdraw() {
		System.out.print("���¹�ȣ> ");
		String ano = scanner.next();

		if (accounts.containsKey(ano) == true) {
			System.out.print("��ݱݾ�> ");
			int take = scanner.nextInt();
			Account addcount = accounts.get(ano);
			int balance = addcount.getBalance();
			addcount.setBalance(balance - take);
			System.out.print("��ݿ� �����ϼ̽��ϴ�.");
		} else {
			System.out.println("���� ���¹�ȣ�Դϴ�.");
		}
	}
}