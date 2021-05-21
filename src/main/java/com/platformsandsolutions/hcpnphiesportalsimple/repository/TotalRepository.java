package com.platformsandsolutions.hcpnphiesportalsimple.repository;

import com.platformsandsolutions.hcpnphiesportalsimple.domain.Total;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Total entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TotalRepository extends JpaRepository<Total, Long> {}
