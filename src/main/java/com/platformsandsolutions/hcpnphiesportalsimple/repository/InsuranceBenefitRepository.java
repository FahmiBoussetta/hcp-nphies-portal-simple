package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.InsuranceBenefit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the InsuranceBenefit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InsuranceBenefitRepository extends JpaRepository<InsuranceBenefit, Long> {}
