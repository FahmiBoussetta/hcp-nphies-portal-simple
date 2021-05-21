package com.platformsandsolutions.hcpnphiesportalsimple.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Givens.
 */
@Entity
@Table(name = "givens")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Givens implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "given")
    private String given;

    @ManyToOne
    @JsonIgnoreProperties(value = { "givens", "prefixes", "suffixes", "texts", "patient", "practitioner" }, allowSetters = true)
    private HumanName human;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Givens id(Long id) {
        this.id = id;
        return this;
    }

    public String getGiven() {
        return this.given;
    }

    public Givens given(String given) {
        this.given = given;
        return this;
    }

    public void setGiven(String given) {
        this.given = given;
    }

    public HumanName getHuman() {
        return this.human;
    }

    public Givens human(HumanName humanName) {
        this.setHuman(humanName);
        return this;
    }

    public void setHuman(HumanName humanName) {
        this.human = humanName;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Givens)) {
            return false;
        }
        return id != null && id.equals(((Givens) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Givens{" +
            "id=" + getId() +
            ", given='" + getGiven() + "'" +
            "}";
    }
}
