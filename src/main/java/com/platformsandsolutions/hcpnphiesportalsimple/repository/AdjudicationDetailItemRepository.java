package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.AdjudicationDetailItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AdjudicationDetailItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdjudicationDetailItemRepository extends JpaRepository<AdjudicationDetailItem, Long> {}
