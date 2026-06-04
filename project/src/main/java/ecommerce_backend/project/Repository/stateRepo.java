package ecommerce_backend.project.Repository;

import ecommerce_backend.project.Entity.Country;
import ecommerce_backend.project.Entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "states", path = "states")
@Repository
public interface stateRepo extends JpaRepository<State,Short> {

    List<State> findByCountryCode(@Param("code") String code);
}
