package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.HumanName;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the HumanName entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HumanNameRepository extends JpaRepository<HumanName, Long> {}
