package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AdjudicationItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdjudicationItemRepository extends JpaRepository<AdjudicationItem, Long> {}
