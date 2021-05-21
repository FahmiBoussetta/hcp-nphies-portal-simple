package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.DetailItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DetailItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetailItemRepository extends JpaRepository<DetailItem, Long> {}
