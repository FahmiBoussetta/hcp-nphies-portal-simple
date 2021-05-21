package com.platformsandsolutions.hcpnphiesportalsimple.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Prefixes.
 */
@Entity
@Table(name = "prefixes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Prefixes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "prefix")
    private String prefix;

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

    public Prefixes id(Long id) {
        this.id = id;
        return this;
    }

    public String getPrefix() {
        return this.prefix;
    }

    public Prefixes prefix(String prefix) {
        this.prefix = prefix;
        return this;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public HumanName getHuman() {
        return this.human;
    }

    public Prefixes human(HumanName humanName) {
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
        if (!(o instanceof Prefixes)) {
            return false;
        }
        return id != null && id.equals(((Prefixes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Prefixes{" +
            "id=" + getId() +
            ", prefix='" + getPrefix() + "'" +
            "}";
    }
}
