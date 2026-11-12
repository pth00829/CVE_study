import java.util.Scanner;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class test {
    public static final Logger logger=LogManager.getLogger(test.class);
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        String str=sc.next();
        logger.error(str);
        sc.close();
    }
}
