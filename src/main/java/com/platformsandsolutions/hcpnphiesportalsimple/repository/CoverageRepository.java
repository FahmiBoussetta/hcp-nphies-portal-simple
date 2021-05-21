package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Coverage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Coverage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoverageRepository extends JpaRepository<Coverage, Long> {}
