package extend_keyword;

public class UserExample {

	public static void main(String[] args) {

		User user = new User();
		user.setId("hong");
		user.setName("È«±æµ¿");
		user.setPhone("01012345678");

		User admin = new User();
		admin.setId("john");
		admin.setName("John Smith");
		admin.setPhone("0212345678");
//		admin.setDeptNo("10001");

		Member member = new Member();
		member.setId("Kim");
		member.setName("±èÄíÆÎ");
		member.printUserInfo();
		member.setPoint(0);

	}

}
