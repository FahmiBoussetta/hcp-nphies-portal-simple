package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.ExemptionComponent;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ExemptionComponent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExemptionComponentRepository extends JpaRepository<ExemptionComponent, Long> {}
