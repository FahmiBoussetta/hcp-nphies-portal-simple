package com.platformsandsolutions.hcpnphiesportalsimple.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Texts.
 */
@Entity
@Table(name = "texts")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Texts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text_name")
    private String textName;

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

    public Texts id(Long id) {
        this.id = id;
        return this;
    }

    public String getTextName() {
        return this.textName;
    }

    public Texts textName(String textName) {
        this.textName = textName;
        return this;
    }

    public void setTextName(String textName) {
        this.textName = textName;
    }

    public HumanName getHuman() {
        return this.human;
    }

    public Texts human(HumanName humanName) {
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
        if (!(o instanceof Texts)) {
            return false;
        }
        return id != null && id.equals(((Texts) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Texts{" +
            "id=" + getId() +
            ", textName='" + getTextName() + "'" +
            "}";
    }
}
