package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationSubDetailItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AdjudicationSubDetailItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdjudicationSubDetailItemRepository extends JpaRepository<AdjudicationSubDetailItem, Long> {}
