package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Adjudication;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Adjudication entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdjudicationRepository extends JpaRepository<Adjudication, Long> {}
