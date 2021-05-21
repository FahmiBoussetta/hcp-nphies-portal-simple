package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.OperationOutcome;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the OperationOutcome entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperationOutcomeRepository extends JpaRepository<OperationOutcome, Long> {}
