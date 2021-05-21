package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.CoverageEligibilityRequest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CoverageEligibilityRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoverageEligibilityRequestRepository extends JpaRepository<CoverageEligibilityRequest, Long> {}
