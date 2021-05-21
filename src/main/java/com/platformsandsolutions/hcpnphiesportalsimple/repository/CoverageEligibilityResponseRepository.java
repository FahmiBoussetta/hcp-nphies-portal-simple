package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.CoverageEligibilityResponse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CoverageEligibilityResponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoverageEligibilityResponseRepository extends JpaRepository<CoverageEligibilityResponse, Long> {}
