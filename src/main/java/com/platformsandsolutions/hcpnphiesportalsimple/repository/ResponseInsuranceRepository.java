package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.ResponseInsurance;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ResponseInsurance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResponseInsuranceRepository extends JpaRepository<ResponseInsurance, Long> {}
