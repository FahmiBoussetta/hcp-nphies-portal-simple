package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.SubDetailItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SubDetailItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubDetailItemRepository extends JpaRepository<SubDetailItem, Long> {}
