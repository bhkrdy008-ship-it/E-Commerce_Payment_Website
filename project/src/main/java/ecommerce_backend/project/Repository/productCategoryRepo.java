package ecommerce_backend.project.Repository;

import ecommerce_backend.project.Entity.Product;
import ecommerce_backend.project.Entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface productCategoryRepo extends JpaRepository<ProductCategory, Long> {
}
