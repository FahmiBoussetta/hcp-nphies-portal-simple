package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Practitioner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Practitioner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PractitionerRepository extends JpaRepository<Practitioner, Long> {}
