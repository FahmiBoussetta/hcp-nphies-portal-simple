package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.ListEligibilityPurposeEnum;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ListEligibilityPurposeEnum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListEligibilityPurposeEnumRepository extends JpaRepository<ListEligibilityPurposeEnum, Long> {}
