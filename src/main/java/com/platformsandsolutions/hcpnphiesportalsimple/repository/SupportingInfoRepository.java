package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.SupportingInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SupportingInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupportingInfoRepository extends JpaRepository<SupportingInfo, Long> {}
