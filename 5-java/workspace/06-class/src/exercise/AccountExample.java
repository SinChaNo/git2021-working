package exercise;

public class AccountExample {

	public static void main(String[] args) {

		// 테스트 케이스(test case) -> 코드로 짜면 -> 테스트 ㅋ
		// 단위 테스트에서 수행 -> 대상 코드의 매서드를 테스

		// given - 테스트 환경 준비(테스트용 데이터, 테스트용 객체)

		// when - 테스트 데이터로 실행
		Account account = new Account();

		// then - 예상결과(expected result)와 실제결과(actual result)를 비교
		// 예상결과 10000
		account.setBalance(10000);
		System.out.println("현재 잔고 : " + account.getBalance());

		account.setBalance(-100);
		System.out.println("현재 잔고 : " + account.getBalance());

		account.setBalance(2000000);
		System.out.println("현재 잔고 : " + account.getBalance());

		account.setBalance(300000);
		System.out.println("현재 잔고 : " + account.getBalance());

	}

}
