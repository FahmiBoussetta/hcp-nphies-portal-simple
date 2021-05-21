package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Related;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Related entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RelatedRepository extends JpaRepository<Related, Long> {}
