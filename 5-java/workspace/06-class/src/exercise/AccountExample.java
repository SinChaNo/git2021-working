package exercise;

public class AccountExample {

	public static void main(String[] args) {

		// �׽�Ʈ ���̽�(test case) -> �ڵ�� ¥�� -> �׽�Ʈ ��
		// ���� �׽�Ʈ���� ���� -> ��� �ڵ��� �ż��带 �׽�

		// given - �׽�Ʈ ȯ�� �غ�(�׽�Ʈ�� ������, �׽�Ʈ�� ��ü)

		// when - �׽�Ʈ �����ͷ� ����
		Account account = new Account();

		// then - ������(expected result)�� �������(actual result)�� ��
		// ������ 10000
		account.setBalance(10000);
		System.out.println("���� �ܰ� : " + account.getBalance());

		account.setBalance(-100);
		System.out.println("���� �ܰ� : " + account.getBalance());

		account.setBalance(2000000);
		System.out.println("���� �ܰ� : " + account.getBalance());

		account.setBalance(300000);
		System.out.println("���� �ܰ� : " + account.getBalance());

	}

}
