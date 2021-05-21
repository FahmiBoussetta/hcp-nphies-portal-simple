package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.ListSpecialtyEnum;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ListSpecialtyEnum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListSpecialtyEnumRepository extends JpaRepository<ListSpecialtyEnum, Long> {}
