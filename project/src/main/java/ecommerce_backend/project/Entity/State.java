package ecommerce_backend.project.Entity;

import jakarta.persistence.*;
import lombok.Data;


@Table(name="state")
@Entity
@Data
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Short id;

    @Column(name="name")
    private String name;


    @ManyToOne
    @JoinColumn(name="country_id")
    private Country country;
}
