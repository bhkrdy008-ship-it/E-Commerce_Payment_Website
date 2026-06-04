package ecommerce_backend.project.Repository;

import ecommerce_backend.project.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin
public interface CustomerRepository extends JpaRepository<Customer,Long> {

    Customer findByEmail(String theEmail);
}
