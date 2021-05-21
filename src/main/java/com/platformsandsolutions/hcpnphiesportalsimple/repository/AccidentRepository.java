package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Accident;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Accident entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccidentRepository extends JpaRepository<Accident, Long> {}
