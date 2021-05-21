package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Encounter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Encounter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EncounterRepository extends JpaRepository<Encounter, Long> {}
