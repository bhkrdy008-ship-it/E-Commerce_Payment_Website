package ecommerce_backend.project.Repository;

import ecommerce_backend.project.Entity.Product;
import ecommerce_backend.project.Entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;




@CrossOrigin
public interface productRepo extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(@Param("id")Long id, Pageable pageable);
    Page<Product> findByNameContaining(@Param("name")String name, Pageable pageable);

}
