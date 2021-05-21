package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Hospitalization;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Hospitalization entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HospitalizationRepository extends JpaRepository<Hospitalization, Long> {}
